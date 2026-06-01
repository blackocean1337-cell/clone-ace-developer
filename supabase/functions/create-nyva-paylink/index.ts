import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NYVA_BASE = "https://nyvapay.com";

interface CartItem {
  name: string;
  color?: string;
  size?: string;
  quantity: number;
  unitPrice: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY");
    const merchantEmail = Deno.env.get("NYVA_MERCHANT_ID");
    if (!apiKey) throw new Error("NYVA_PARTNER_API_KEY not set");
    if (!merchantEmail) throw new Error("NYVA_MERCHANT_ID (email) not set");

    const projectId = Deno.env.get("SUPABASE_URL")?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

    const body = await req.json().catch(() => ({}));
    const items = (body?.items ?? []) as CartItem[];
    const promoCode = body?.promo_code ?? null;
    const discount = Number(body?.discount ?? 0);

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Carrinho vazio" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Recalcular total server-side
    let amount = 0;
    const noteParts: string[] = [];
    for (const it of items) {
      const qty = Number(it.quantity) || 0;
      const unit = Number(it.unitPrice) || 0;
      if (qty <= 0 || unit < 0) continue;
      amount += qty * unit;
      const label = `${qty}x ${it.name}${it.color ? ` ${it.color}` : ""}${it.size ? ` (${it.size})` : ""}`;
      noteParts.push(label);
    }
    amount = Number(amount.toFixed(2));
    if (amount <= 0) {
      return new Response(JSON.stringify({ error: "Total inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const productName =
      items.length === 1
        ? `${items[0].name}${items[0].color ? ` ${items[0].color}` : ""}${items[0].size ? ` (${items[0].size})` : ""}`.slice(0, 200)
        : `MRTUGA — ${items.reduce((s, i) => s + (Number(i.quantity) || 0), 0)} artigos`;

    const orderRef = `MRTUGA-${Date.now()}`;
    const note = noteParts.join(" | ").slice(0, 500);

    const webhookUrl = projectId
      ? `https://${projectId}.functions.supabase.co/nyva-webhook`
      : undefined;

    const payload: Record<string, unknown> = {
      amount,
      currency: "EUR",
      product_name: productName,
      order: orderRef,
      note,
      success_redirect_url: "https://mrtuga.co/obrigado",
      metadata: {
        line_items: JSON.stringify(
          items.map((i) => ({
            name: `${i.name}${i.color ? ` ${i.color}` : ""}${i.size ? ` (${i.size})` : ""}`,
            qty: Number(i.quantity) || 0,
            total: Number(((Number(i.quantity) || 0) * (Number(i.unitPrice) || 0)).toFixed(2)),
          }))
        ),
        promo_code: promoCode ?? "",
        discount: String(discount),
      },
    };
    if (webhookUrl) payload.webhook_url = webhookUrl;

    const res = await fetch(`${NYVA_BASE}/api/merchant/payment-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "X-Merchant-Email": merchantEmail,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any = null;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok) {
      console.error("NYVA paylink error:", res.status, text);
      return new Response(
        JSON.stringify({ error: data?.error || `NYVA ${res.status}`, details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = data?.pay_url || data?.checkout_url || data?.url;
    if (!url) {
      console.error("NYVA paylink no url:", data);
      return new Response(JSON.stringify({ error: "NYVA não devolveu pay_url", details: data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url, order_ref: orderRef }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("create-nyva-paylink error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

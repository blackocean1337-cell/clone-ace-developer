import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { getPackTitle, packPayUnits, type Market } from "../_shared/packTitles.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const UNIT_PRICE_EUR = 18;
const NYVA_BASE = "https://nyvapay.com";

interface PackAttr {
  key: string;
  value: string;
}
interface PackInput {
  size: number;
  attributes: PackAttr[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY");
    const merchantId = Deno.env.get("NYVA_MERCHANT_ID");
    if (!apiKey) throw new Error("NYVA_PARTNER_API_KEY not set");
    if (!merchantId) throw new Error("NYVA_MERCHANT_ID not set");

    const projectId = Deno.env.get("SUPABASE_URL")?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

    const body = await req.json();
    const packs = (body?.packs ?? []) as PackInput[];
    const market = ((body?.market as Market) || "PT") as Market;

    if (!Array.isArray(packs) || packs.length === 0) {
      return new Response(JSON.stringify({ error: "Carrinho vazio" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Total = sum of pay units * 18€
    let amount = 0;
    const labels: string[] = [];
    const summaryParts: string[] = [];

    for (const pack of packs) {
      const cap = pack.size;
      const units = packPayUnits(cap);
      amount += units * UNIT_PRICE_EUR;
      labels.push(getPackTitle(cap, market));

      const attrs = pack.attributes ?? [];
      const itemCount = attrs.filter((a) => /^_lov_item_\d+_name$/.test(a.key)).length;
      for (let i = 1; i <= itemCount; i++) {
        const name = attrs.find((a) => a.key === `_lov_item_${i}_name`)?.value ?? "";
        const color = attrs.find((a) => a.key === `_lov_item_${i}_color`)?.value ?? "";
        const size = attrs.find((a) => a.key === `_lov_item_${i}_size`)?.value ?? "";
        summaryParts.push(`${name} ${color} (${size})`.trim());
      }
    }

    const productName = labels.length === 1 ? labels[0] : `MRTUGA — ${labels.join(" + ")}`;
    const orderRef = `MRTUGA-${Date.now()}`;
    const note = summaryParts.join(" | ").slice(0, 500);

    const webhookUrl = projectId
      ? `https://${projectId}.functions.supabase.co/nyva-webhook`
      : undefined;

    const payload: Record<string, unknown> = {
      amount: Number(amount.toFixed(2)),
      currency: "EUR",
      product_name: productName.slice(0, 200),
      order: orderRef,
      note,
      payment_type: "one_time",
      success_redirect_url: "https://mrtuga.co/obrigado",
      metadata: {
        market,
        packs: JSON.stringify(packs),
      },
    };
    if (webhookUrl) payload.webhook_url = webhookUrl;

    const res = await fetch(`${NYVA_BASE}/api/partner/merchants/${merchantId}/payment-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      console.error("NYVA error:", res.status, text);
      return new Response(
        JSON.stringify({ error: data?.error || `NYVA ${res.status}`, details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = data?.pay_url || data?.checkout_url || data?.url;
    if (!url) {
      console.error("NYVA no url in response:", data);
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
    console.error("create-nyva-checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

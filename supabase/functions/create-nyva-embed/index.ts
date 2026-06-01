import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NYVA_BASE = "https://nyvapay.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY");
    const merchantId = "0b052e3e-84e0-4899-9100-1d90427c2512"; // DIAGNOSTIC: docs example
    if (!apiKey) throw new Error("NYVA_PARTNER_API_KEY not set");
    if (!merchantId) throw new Error("NYVA_MERCHANT_ID not set");
    console.log("NYVA merchant_id len:", merchantId.length, "preview:", merchantId.slice(0, 6) + "..." + merchantId.slice(-4), "apiKey len:", apiKey.length);

    const body = await req.json().catch(() => ({}));
    const amount = Number(body?.amount);
    const customerEmail = String(body?.customer_email ?? "").trim();
    const customerName = String(body?.customer_name ?? "").trim();
    const productName = String(body?.product_name ?? "MRTUGA Order").slice(0, 200);
    const metadata = body?.metadata ?? {};

    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "amount inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!customerEmail || !/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return new Response(JSON.stringify({ error: "customer_email inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const orderRef = `MRTUGA-${Date.now()}`;
    const successUrl = `https://mrtuga.co/obrigado?ref=${encodeURIComponent(orderRef)}`;

    const payload = {
      merchant_id: merchantId,
      surface: "checkout",
      amount: Number(amount.toFixed(2)),
      currency: "EUR",
      product_name: productName,
      customer_email: customerEmail,
      customer_name: customerName || undefined,
      success_redirect_url: successUrl,
      return_origin: "https://mrtuga.co",
      payment_type: "one_time",
      order: orderRef,
      metadata: { ...metadata, order_ref: orderRef },
    };

    const res = await fetch(`${NYVA_BASE}/api/partner/onboarding-sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any = null;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!res.ok) {
      console.error("NYVA embed error:", res.status, text);
      return new Response(
        JSON.stringify({ error: data?.error || `NYVA ${res.status}`, details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const embedUrl = data?.embed_url || data?.url;
    const paymentRequestId = data?.payment_request_id || data?.id;

    if (!embedUrl) {
      console.error("NYVA no embed_url:", data);
      return new Response(
        JSON.stringify({ error: "NYVA não devolveu embed_url", details: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Best-effort: register pending order
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );
      await supabase.from("orders").insert({
        payment_request_id: paymentRequestId || orderRef,
        order_ref: orderRef,
        amount: Number(amount.toFixed(2)),
        currency: "EUR",
        status: "pending",
        customer_email: customerEmail,
        customer_name: customerName || null,
        product_name: productName,
        metadata,
      });
    } catch (e) {
      console.error("orders insert failed (non-fatal):", e);
    }

    return new Response(
      JSON.stringify({
        embed_url: embedUrl,
        payment_request_id: paymentRequestId,
        order_ref: orderRef,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("create-nyva-embed error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY") ?? "";
  const email = Deno.env.get("NYVA_MERCHANT_ID") ?? "";
  const results: any[] = [];

  const variants: Array<{ name: string; url: string; headers: Record<string, string> }> = [
    { name: "merchant/me X-API-Key + X-Merchant-Email", url: "https://nyvapay.com/api/merchant/me", headers: { "X-API-Key": apiKey, "X-Merchant-Email": email } },
    { name: "merchant/me Bearer", url: "https://nyvapay.com/api/merchant/me", headers: { Authorization: `Bearer ${apiKey}` } },
    { name: "merchant/me Bearer + email", url: "https://nyvapay.com/api/merchant/me", headers: { Authorization: `Bearer ${apiKey}`, "X-Merchant-Email": email } },
    { name: "partner/merchants X-API-Key", url: "https://nyvapay.com/api/partner/merchants", headers: { "X-API-Key": apiKey } },
    { name: "partner/merchants Bearer", url: "https://nyvapay.com/api/partner/merchants", headers: { Authorization: `Bearer ${apiKey}` } },
  ];

  for (const v of variants) {
    try {
      const r = await fetch(v.url, { headers: v.headers });
      const text = await r.text();
      results.push({ name: v.name, status: r.status, body: text.slice(0, 400) });
    } catch (e) {
      results.push({ name: v.name, error: String(e) });
    }
  }

  return new Response(
    JSON.stringify({
      key_prefix: apiKey.slice(0, 8),
      key_length: apiKey.length,
      email,
      results,
    }, null, 2),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});

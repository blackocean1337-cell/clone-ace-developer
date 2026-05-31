import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const key = Deno.env.get("NYVA_PARTNER_API_KEY")!;
  const mid = Deno.env.get("NYVA_MERCHANT_ID") ?? null;
  const r = await fetch("https://nyvapay.com/api/partner/merchants", {
    headers: { "X-API-Key": key },
  });
  const text = await r.text();
  let parsed: unknown = text;
  try { parsed = JSON.parse(text); } catch {}
  return new Response(
    JSON.stringify({ stored_merchant_id: mid, nyva_status: r.status, nyva_response: parsed }, null, 2),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});

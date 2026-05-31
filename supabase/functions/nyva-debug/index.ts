import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY") ?? "";

  const r = await fetch("https://nyvapay.com/api/partner/merchants", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
    body: JSON.stringify({
      email: "x.opscorp@gmail.com",
      display_name: "MRTUGA",
      business_name: "MRTUGA",
      country: "PT",
      currency: "EUR",
    }),
  });
  const text = await r.text();
  return new Response(JSON.stringify({ status: r.status, body: text }, null, 2), {
    headers: { ...cors, "Content-Type": "application/json" },
  });
});

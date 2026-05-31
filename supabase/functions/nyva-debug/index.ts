import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY") ?? "";
  const results: any[] = [];

  const variants = [
    { merchant_email: "x.opscorp@gmail.com", display_name: "MRTUGA" },
    { contact_email: "x.opscorp@gmail.com", display_name: "MRTUGA" },
    { owner_email: "x.opscorp@gmail.com", name: "MRTUGA" },
    { email: "x.opscorp@gmail.com", name: "MRTUGA" },
    { user_email: "x.opscorp@gmail.com", display_name: "MRTUGA" },
  ];

  for (const body of variants) {
    const r = await fetch("https://nyvapay.com/api/partner/merchants", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify(body),
    });
    const t = await r.text();
    results.push({ sent: body, status: r.status, body: t.slice(0, 300) });
  }
  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...cors, "Content-Type": "application/json" },
  });
});

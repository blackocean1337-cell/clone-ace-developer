import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" };

serve(async () => {
  const apiKey = Deno.env.get("NYVA_PARTNER_API_KEY") ?? "";
  const results: any[] = [];

  // 1. Form-encoded
  const r1 = await fetch("https://nyvapay.com/api/partner/merchants", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "X-API-Key": apiKey },
    body: new URLSearchParams({ email: "x.opscorp@gmail.com", display_name: "MRTUGA" }).toString(),
  });
  results.push({ test: "form-encoded", status: r1.status, body: (await r1.text()).slice(0, 400) });

  // 2. Query string
  const r2 = await fetch("https://nyvapay.com/api/partner/merchants?email=x.opscorp%40gmail.com&display_name=MRTUGA", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
    body: "{}",
  });
  results.push({ test: "querystring", status: r2.status, body: (await r2.text()).slice(0, 400) });

  // 3. Just curl, simple JSON, double-check
  const r3 = await fetch("https://nyvapay.com/api/partner/merchants", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey, Accept: "application/json" },
    body: JSON.stringify({ email: "mrtuga@x.opscorp.com", display_name: "MRTUGA" }),
  });
  results.push({ test: "json-different-email", status: r3.status, body: (await r3.text()).slice(0, 400) });

  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...cors, "Content-Type": "application/json" },
  });
});

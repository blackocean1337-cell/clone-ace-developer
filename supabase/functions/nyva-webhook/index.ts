import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    console.log("[nyva-webhook] event:", body?.event, "id:", body?.payment_request_id);

    const event: string = body?.event ?? "";
    if (event !== "payment.succeeded" && event !== "subscription.payment_succeeded") {
      // Acknowledge other events without writing
      return new Response(JSON.stringify({ ok: true, ignored: event }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    const row = {
      payment_request_id: String(body.payment_request_id),
      order_ref: body.order ?? null,
      amount: Number(body.amount ?? 0),
      currency: body.currency ?? "EUR",
      status: body.status ?? "paid",
      customer_email: body.customer_email ?? null,
      customer_name: body.customer_name ?? null,
      product_name: body.product_name ?? null,
      note: body.note ?? null,
      metadata: body.metadata ?? {},
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("orders")
      .upsert(row, { onConflict: "payment_request_id" });

    if (error) {
      console.error("[nyva-webhook] upsert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("[nyva-webhook] error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

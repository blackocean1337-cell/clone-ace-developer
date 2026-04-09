import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map product slug → Stripe price ID
const PRICE_MAP: Record<string, string> = {
  "t-shirt-tech": "price_1TK6Vh2Fp5pZoXCPWnRGBRdI",
  "t-shirt-blanc": "price_1TK6Vh2Fp5pZoXCPWnRGBRdI",
  "t-shirt-navy": "price_1TK6Vh2Fp5pZoXCPWnRGBRdI",
  "t-shirt-kaki": "price_1TK6Vh2Fp5pZoXCPWnRGBRdI",
  "polo": "price_1TK6Vy2Fp5pZoXCPQ1nD3M0o",
  "t-shirt-col-v": "price_1TK6WE2Fp5pZoXCPy5lvDNJ4",
  "t-shirt-manches-longues": "price_1TK6eG2Fp5pZoXCP4RWup6II",
  "pull": "price_1TK6fF2Fp5pZoXCPQ0RJYhvF",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { items, successUrl, cancelUrl } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("No items provided");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Build line items from cart
    const line_items = items.map((item: {
      slug: string;
      name: string;
      color: string;
      size: string;
      quantity: number;
    }) => {
      const priceId = PRICE_MAP[item.slug];
      if (!priceId) {
        throw new Error(`Unknown product slug: ${item.slug}`);
      }
      return {
        price: priceId,
        quantity: item.quantity,
      };
    });

    // Build metadata with order details
    const orderSummary = items.map((item: {
      quantity: number;
      name: string;
      color: string;
      size: string;
    }) =>
      `${item.quantity}x ${item.name} - ${item.color} (${item.size})`
    ).join(" | ");

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: successUrl || `${req.headers.get("origin")}/`,
      cancel_url: cancelUrl || `${req.headers.get("origin")}/`,
      metadata: {
        order_summary: orderSummary,
      },
      shipping_address_collection: {
        allowed_countries: ["PT", "FR", "ES"],
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

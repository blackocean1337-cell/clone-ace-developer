import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  getPackTitle,
  packPayUnits,
  type PackCapacity,
} from "../_shared/packTitles.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_DOMAIN = "wkxepy-d0.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const ADMIN_URL = `https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

const BASE_UNIT_PRICE = 33.90; // EUR — matches product display price
const VALID_CAPS: PackCapacity[] = [1, 3, 6, 9, 12];

interface PackInput {
  size: number;
  attributes: Array<{ key: string; value: string }>;
}

function packPrice(cap: PackCapacity): number {
  return packPayUnits(cap) * BASE_UNIT_PRICE;
}

async function adminGql(
  token: string,
  query: string,
  variables: Record<string, unknown> = {},
) {
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error(`Shopify Admin error: ${JSON.stringify(json.errors || json)}`);
  }
  return json.data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!token) throw new Error("SHOPIFY_ACCESS_TOKEN missing");

    const body = (await req.json()) as {
      packs: PackInput[];
      market?: string;
      promoCode?: string | null;
    };
    const { packs } = body;
    const market = (body.market || "PT").toUpperCase();
    const promoCode = (body.promoCode || "").trim().toUpperCase();

    if (!Array.isArray(packs) || packs.length === 0) {
      throw new Error("packs vazio");
    }

    let subtotal = 0;
    let totalPayUnits = 0;

    const lineItems = packs.map((p) => {
      const cap = VALID_CAPS.includes(p.size as PackCapacity)
        ? (p.size as PackCapacity)
        : null;
      if (!cap) throw new Error(`Capacidade inválida: ${p.size}`);

      const title = getPackTitle(cap, market).slice(0, 255);
      const price = packPrice(cap);
      subtotal += price;
      totalPayUnits += packPayUnits(cap);
      return {
        title,
        quantity: 1,
        originalUnitPrice: price.toFixed(2),
        requiresShipping: true,
        taxable: true,
        customAttributes: p.attributes,
      };
    });

    // Compute promo discount at draft-order level
    let appliedDiscount: { title: string; value: number; valueType: "FIXED_AMOUNT" } | null = null;
    if (promoCode === "TUGA1") {
      const target = totalPayUnits * 1;
      const value = Math.max(0, subtotal - target);
      if (value > 0) {
        appliedDiscount = { title: "TUGA1", value: Math.round(value * 100) / 100, valueType: "FIXED_AMOUNT" };
      }
    } else if (promoCode === "TUGA30") {
      if (subtotal > 30) {
        appliedDiscount = { title: "TUGA30", value: 30, valueType: "FIXED_AMOUNT" };
      }
    }

    const draftQ = `
      mutation($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder { id invoiceUrl }
          userErrors { field message }
        }
      }
    `;
    const draftInput: Record<string, unknown> = {
      lineItems,
      useCustomerDefaultAddress: false,
      tags: ["lovable-checkout", `market:${market}`, ...(promoCode ? [`promo:${promoCode}`] : [])],
    };
    if (appliedDiscount) {
      draftInput.appliedDiscount = appliedDiscount;
    }
    const result = await adminGql(token, draftQ, { input: draftInput });
    const errs = result?.draftOrderCreate?.userErrors || [];
    if (errs.length) throw new Error(`draftOrderCreate: ${JSON.stringify(errs)}`);
    const invoiceUrl = result.draftOrderCreate.draftOrder?.invoiceUrl;
    if (!invoiceUrl) throw new Error("Sem invoiceUrl");
    return new Response(JSON.stringify({ url: invoiceUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("create-checkout-box-variants:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

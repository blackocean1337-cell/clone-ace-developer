import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_DOMAIN = "wkxepy-d0.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const ADMIN_URL = `https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

const BASE_UNIT_PRICE = 18; // EUR
const MAX_PACK_SIZE = 12;
const PACK_PRODUCT_HANDLE = "mrtuga-pack";

interface PackInput {
  size: number;
  attributes: Array<{ key: string; value: string }>;
}

// Price formula: "Leve 3 Paga 2" — every 3rd unit free.
function packPrice(size: number): number {
  const paid = size - Math.floor(size / 3);
  return paid * BASE_UNIT_PRICE;
}

async function adminGql(token: string, query: string, variables: Record<string, unknown> = {}) {
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

// In-memory cache (per warm instance) of pack size → variant GID.
let VARIANT_MAP: Record<number, string> | null = null;

async function ensurePackProduct(token: string): Promise<Record<number, string>> {
  if (VARIANT_MAP) return VARIANT_MAP;

  // 1. Try to find existing pack product by handle.
  const findQ = `
    query($handle: String!) {
      productByHandle(handle: $handle) {
        id
        variants(first: 50) {
          nodes { id title price }
        }
      }
    }
  `;
  const found = await adminGql(token, findQ, { handle: PACK_PRODUCT_HANDLE });
  let productId: string | undefined = found?.productByHandle?.id;
  let variants: Array<{ id: string; title: string; price: string }> =
    found?.productByHandle?.variants?.nodes || [];

  // 2. Create the product if missing.
  if (!productId) {
    const createQ = `
      mutation($input: ProductInput!) {
        productCreate(input: $input) {
          product { id }
          userErrors { field message }
        }
      }
    `;
    const created = await adminGql(token, createQ, {
      input: {
        title: "MRTUGA Pack",
        handle: PACK_PRODUCT_HANDLE,
        status: "ACTIVE",
        productType: "Pack",
        vendor: "MRTUGA",
        published: false,
      },
    });
    const errs = created?.productCreate?.userErrors || [];
    if (errs.length) throw new Error(`productCreate: ${JSON.stringify(errs)}`);
    productId = created.productCreate.product.id;
  }

  // 3. Ensure variants 1..MAX_PACK_SIZE exist with correct prices.
  const existingByTitle = new Map(variants.map((v) => [v.title, v]));
  const toCreate: Array<{ title: string; price: string; size: number }> = [];
  for (let n = 1; n <= MAX_PACK_SIZE; n++) {
    const title = `PACK-${n}`;
    if (!existingByTitle.has(title)) {
      toCreate.push({ title, price: packPrice(n).toFixed(2), size: n });
    }
  }

  if (toCreate.length) {
    const bulkQ = `
      mutation($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
        productVariantsBulkCreate(productId: $productId, variants: $variants) {
          productVariants { id title }
          userErrors { field message }
        }
      }
    `;
    const res = await adminGql(token, bulkQ, {
      productId,
      variants: toCreate.map((v) => ({
        price: v.price,
        optionValues: [{ optionName: "Title", name: v.title }],
        inventoryPolicy: "CONTINUE",
      })),
    });
    const errs = res?.productVariantsBulkCreate?.userErrors || [];
    if (errs.length) throw new Error(`variantsBulkCreate: ${JSON.stringify(errs)}`);
    variants = variants.concat(res.productVariantsBulkCreate.productVariants);
  }

  const map: Record<number, string> = {};
  for (const v of variants) {
    const m = v.title.match(/^PACK-(\d+)$/);
    if (m) map[parseInt(m[1], 10)] = v.id;
  }
  VARIANT_MAP = map;
  return map;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!token) throw new Error("SHOPIFY_ACCESS_TOKEN missing");

    const { packs } = (await req.json()) as { packs: PackInput[] };
    if (!Array.isArray(packs) || packs.length === 0) {
      throw new Error("packs vazio");
    }

    const variantMap = await ensurePackProduct(token);

    const lineItems = packs.map((p) => {
      const size = Math.min(Math.max(p.size, 1), MAX_PACK_SIZE);
      const variantId = variantMap[size];
      if (!variantId) throw new Error(`Sem variante para PACK-${size}`);
      return {
        variantId,
        quantity: 1,
        customAttributes: p.attributes,
      };
    });

    const draftQ = `
      mutation($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder { id invoiceUrl }
          userErrors { field message }
        }
      }
    `;
    const result = await adminGql(token, draftQ, {
      input: {
        lineItems,
        useCustomerDefaultAddress: false,
        tags: ["lovable-checkout"],
      },
    });
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

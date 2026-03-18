import type { CartItem } from "@/components/fincut/CartDrawer";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'wkxepy-d0.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '48c61d7d7ea2626b53978a4ca02aab60';

// Tier variant mapping (Shopify variant IDs)
const TIER_VARIANTS: Record<string, string> = {
  individual: 'gid://shopify/ProductVariant/53926079791444',
  'leva-3-paga-2': 'gid://shopify/ProductVariant/53926945784148',
  'leva-6-paga-3': 'gid://shopify/ProductVariant/53926948372820',
  'leva-9-paga-4': 'gid://shopify/ProductVariant/53926951682388',
  'leva-12-paga-5': 'gid://shopify/ProductVariant/53926955352404',
};

/**
 * Determines which Shopify tier variant to use based on total items in cart.
 */
export function getTierVariant(totalItems: number): { variantId: string; tierName: string } {
  if (totalItems >= 12) return { variantId: TIER_VARIANTS['leva-12-paga-5'], tierName: 'LEVA 12 PAGA 5' };
  if (totalItems >= 9) return { variantId: TIER_VARIANTS['leva-9-paga-4'], tierName: 'LEVA 9 PAGA 4' };
  if (totalItems >= 6) return { variantId: TIER_VARIANTS['leva-6-paga-3'], tierName: 'LEVA 6 PAGA 3' };
  if (totalItems >= 3) return { variantId: TIER_VARIANTS['leva-3-paga-2'], tierName: 'LEVA 3 PAGA 2' };
  return { variantId: TIER_VARIANTS['individual'], tierName: 'Individual' };
}

/**
 * Builds cart attributes from the user's actual item selections.
 */
export function buildCartAttributes(items: CartItem[]): Array<{ key: string; value: string }> {
  const attributes: Array<{ key: string; value: string }> = [];

  // Summary attribute
  const summary = items.map((item, i) =>
    `${item.quantity}x ${item.name} - ${item.color} (${item.size})`
  ).join(' | ');
  attributes.push({ key: 'Resumo do pedido', value: summary });

  // Individual item details
  items.forEach((item, i) => {
    attributes.push({
      key: `Item ${i + 1}`,
      value: `${item.quantity}x ${item.name} - Cor: ${item.color}, Tamanho: ${item.size}`
    });
  });

  // Total items count
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  attributes.push({ key: 'Total de artigos', value: String(totalItems) });

  return attributes;
}

/**
 * Builds line item properties that appear under the product name in checkout.
 */
export function buildLineItemProperties(items: CartItem[]): Array<{ key: string; value: string }> {
  return items.map((item, i) => ({
    key: items.length > 1 ? `Artigo ${i + 1}` : 'Detalhes',
    value: `${item.quantity}x ${item.name} — ${item.color} (${item.size})`,
  }));
}

async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify GraphQL error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

/**
 * Creates a Shopify cart with the correct tier variant and cart attributes,
 * then returns the checkout URL.
 */
export async function createCheckout(items: CartItem[]): Promise<string> {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { variantId } = getTierVariant(totalItems);
  const attributes = buildCartAttributes(items);
  const lineProperties = buildLineItemProperties(items);

  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: {
      lines: [{
        quantity: 1,
        merchandiseId: variantId,
        attributes: lineProperties,
      }],
      attributes,
    },
  });

  const cart = data?.data?.cartCreate?.cart;
  const userErrors = data?.data?.cartCreate?.userErrors || [];

  if (userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${userErrors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  if (!cart?.checkoutUrl) {
    throw new Error('No checkout URL returned from Shopify');
  }

  return formatCheckoutUrl(cart.checkoutUrl);
}

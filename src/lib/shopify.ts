import type { CartItem } from "@/components/fincut/CartDrawer";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'wkxepy-d0.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '48c61d7d7ea2626b53978a4ca02aab60';

// Mapping: site product slug/color → Shopify variant ID
// Each product has a single "Default Title" variant
const PRODUCT_VARIANT_MAP: Record<string, string> = {
  // A t-shirt Icónica - Branca
  'branco': 'gid://shopify/ProductVariant/53961029288276',
  // A t-shirt Icónica - Preta
  'preto': 'gid://shopify/ProductVariant/53961178644820',
  // A t-shirt Icónica - Azul Marinho
  'azul marinho': 'gid://shopify/ProductVariant/53961191817556',
  // A t-shirt Icónica - Verde Cáqui
  'caqui': 'gid://shopify/ProductVariant/53961304605012',
  // A t-shirt Icónica em V (polo)
  'polo': 'gid://shopify/ProductVariant/53961441575252',
};

/**
 * Resolves the Shopify variant ID for a given cart item.
 */
function getVariantForItem(item: CartItem): string {
  // For polo / t-shirt em V, use the polo variant regardless of color
  const nameLower = item.name.toLowerCase();
  if (nameLower.includes('em v') || nameLower.includes('polo')) {
    return PRODUCT_VARIANT_MAP['polo'];
  }

  // Match by color name
  const colorLower = item.color.toLowerCase();
  if (colorLower.includes('branc')) return PRODUCT_VARIANT_MAP['branco'];
  if (colorLower.includes('pret')) return PRODUCT_VARIANT_MAP['preto'];
  if (colorLower.includes('azul') || colorLower.includes('marin')) return PRODUCT_VARIANT_MAP['azul marinho'];
  if (colorLower.includes('caqui') || colorLower.includes('kaki') || colorLower.includes('verde')) return PRODUCT_VARIANT_MAP['caqui'];

  // Fallback to black
  return PRODUCT_VARIANT_MAP['preto'];
}

/**
 * Builds cart attributes from the user's actual item selections.
 */
export function buildCartAttributes(items: CartItem[]): Array<{ key: string; value: string }> {
  const attributes: Array<{ key: string; value: string }> = [];

  const summary = items.map((item) =>
    `${item.quantity}x ${item.name} - ${item.color} (${item.size})`
  ).join(' | ');
  attributes.push({ key: 'Resumo do pedido', value: summary });

  items.forEach((item, i) => {
    attributes.push({
      key: `Item ${i + 1}`,
      value: `${item.quantity}x ${item.name} - Cor: ${item.color}, Tamanho: ${item.size}`
    });
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  attributes.push({ key: 'Total de artigos', value: String(totalItems) });

  return attributes;
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
 * Creates a Shopify cart with individual product lines for each cart item,
 * then returns the checkout URL.
 */
export async function createCheckout(items: CartItem[]): Promise<string> {
  const attributes = buildCartAttributes(items);

  // Build one line per cart item, each mapped to its Shopify product variant
  const lines = items.map((item) => ({
    quantity: item.quantity,
    merchandiseId: getVariantForItem(item),
    attributes: [
      { key: 'Detalhes', value: `${item.quantity}x ${item.name} — ${item.color} (${item.size})` },
    ],
  }));

  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: {
      lines,
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

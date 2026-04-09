import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/components/fincut/CartDrawer";

/**
 * Maps a CartItem to its product slug for Stripe price resolution.
 */
function getSlugForItem(item: CartItem): string {
  const nameLower = item.name.toLowerCase();

  // Camisola / Pull
  if (nameLower.includes("camisola") || nameLower.includes("pull")) {
    return "pull";
  }
  // Manga comprida
  if (nameLower.includes("manga comprida") || nameLower.includes("manches longues")) {
    return "t-shirt-manches-longues";
  }
  // Gola V
  if (nameLower.includes("gola v") || nameLower.includes("col v")) {
    return "t-shirt-col-v";
  }
  // Polo / em V
  if (nameLower.includes("em v") || nameLower.includes("polo")) {
    return "polo";
  }

  // T-shirt Icónica — match by color
  const colorLower = item.color.toLowerCase();
  if (colorLower.includes("branc")) return "t-shirt-blanc";
  if (colorLower.includes("azul") || colorLower.includes("marin")) return "t-shirt-navy";
  if (colorLower.includes("caqui") || colorLower.includes("kaki") || colorLower.includes("verde")) return "t-shirt-kaki";
  return "t-shirt-tech"; // default black
}

/**
 * Creates a Stripe Checkout session from the cart items.
 * Returns the checkout URL.
 */
export async function createStripeCheckout(items: CartItem[]): Promise<string> {
  const payload = {
    items: items.map((item) => ({
      slug: getSlugForItem(item),
      name: item.name,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    })),
    successUrl: `${window.location.origin}/`,
    cancelUrl: `${window.location.origin}/`,
  };

  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || "Erro ao criar sessão de pagamento");
  }

  if (!data?.url) {
    throw new Error("Nenhum URL de checkout retornado");
  }

  return data.url;
}

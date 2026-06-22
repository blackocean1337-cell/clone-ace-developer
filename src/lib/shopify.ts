import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/components/fincut/CartDrawer";
import { groupCartIntoPacks, buildLineAttributes } from "@/lib/cartUtils";

/**
 * Creates a NYVA Pay payment link and returns the hosted pay_url.
 * The cart is grouped into packs; each pack contributes pay-units * 18€
 * (capacities 1/3/6/9/12 → 1/2/3/4/5 paid units).
 *
 * Replaces the previous Shopify Draft Order flow.
 */
export async function createCheckout(items: CartItem[]): Promise<string> {
  const packs = groupCartIntoPacks(items).map((p) => ({
    size: p.size,
    attributes: buildLineAttributes(p),
  }));

  if (packs.length === 0) {
    throw new Error("Carrinho vazio");
  }

  const { data, error } = await supabase.functions.invoke("create-checkout-box-variants", {
    body: { packs, market: "PT" },
  });

  if (error) {
    throw new Error(error.message || "Erro ao criar pagamento");
  }
  if (!data?.url) {
    throw new Error("Sem URL de pagamento");
  }
  return data.url as string;
}

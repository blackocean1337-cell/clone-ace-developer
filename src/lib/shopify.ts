import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/components/fincut/CartDrawer";
import { groupCartIntoPacks, buildLineAttributes } from "@/lib/cartUtils";

/**
 * Creates a Shopify Draft Order through the edge function and returns the invoice URL.
 * Each cart line becomes a single Draft Order line pointing at a "box variant"
 * (PACK-N) — the real items travel as _lov_item_* custom attributes.
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

import type { CartItem } from "@/components/fincut/CartDrawer";

/**
 * Atomic unit (1 t-shirt) flattened from a cart line.
 */
export interface FlatUnit {
  name: string;
  color: string;
  size: string;
  image?: string;
}

/**
 * Expand cart items into one entry per physical unit.
 */
export function flattenCartItems(items: CartItem[]): FlatUnit[] {
  const units: FlatUnit[] = [];
  for (const it of items) {
    for (let i = 0; i < it.quantity; i++) {
      units.push({ name: it.name, color: it.color, size: it.size, image: it.image });
    }
  }
  return units;
}

/**
 * A pack groups N atomic units priced together via a box variant.
 */
export interface Pack {
  size: number;
  units: FlatUnit[];
}

/**
 * Treat each cart line as its own pack (size = quantity). Keeps the UX:
 * "user picked Pack 3 of Black on the product page" → 1 pack of size 3.
 */
export function groupCartIntoPacks(items: CartItem[]): Pack[] {
  return items
    .filter((it) => it.quantity > 0)
    .map((it) => ({
      size: it.quantity,
      units: Array.from({ length: it.quantity }, () => ({
        name: it.name,
        color: it.color,
        size: it.size,
        image: it.image,
      })),
    }));
}

/**
 * Build _lov_item_N_* custom attributes for one pack.
 */
export function buildLineAttributes(pack: Pack): Array<{ key: string; value: string }> {
  const attrs: Array<{ key: string; value: string }> = [];
  pack.units.forEach((u, i) => {
    const n = i + 1;
    attrs.push({ key: `_lov_item_${n}_name`, value: u.name });
    attrs.push({ key: `_lov_item_${n}_color`, value: u.color });
    attrs.push({ key: `_lov_item_${n}_size`, value: u.size });
  });
  attrs.push({ key: "Resumo", value: pack.units.map((u) => `${u.name} ${u.color} ${u.size}`).join(" | ") });
  return attrs;
}

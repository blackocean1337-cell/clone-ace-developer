// Promo code logic — TUGA1 (tudo a 1€) e TUGA30 (-30€ no subtotal)

export const PROMO_STORAGE_KEY = "mrtuga-promo";

export type PromoCode = "TUGA1" | "TUGA30";

export const VALID_PROMOS: PromoCode[] = ["TUGA1", "TUGA30"];

export const TUGA30_AMOUNT = 30;

export interface PromoItem {
  unitPrice: number;
  quantity: number;
}

export interface PromoResult<T extends PromoItem> {
  items: T[];
  originalSubtotal: number;
  subtotal: number;
  discount: number;
  code: PromoCode | null;
}

export function normalizePromo(code: string | null | undefined): PromoCode | null {
  if (!code) return null;
  const upper = code.trim().toUpperCase();
  return (VALID_PROMOS as string[]).includes(upper) ? (upper as PromoCode) : null;
}

export function applyPromo<T extends PromoItem>(items: T[], code: string | null | undefined): PromoResult<T> {
  const valid = normalizePromo(code);
  const originalSubtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  if (valid === "TUGA1") {
    const adjusted = items.map((i) => ({ ...i, unitPrice: 1 }));
    const subtotal = adjusted.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    return {
      items: adjusted,
      originalSubtotal,
      subtotal,
      discount: originalSubtotal - subtotal,
      code: valid,
    };
  }

  if (valid === "TUGA30") {
    // Only apply if subtotal > 30, otherwise fall back to no discount
    if (originalSubtotal > TUGA30_AMOUNT) {
      const ratio = (originalSubtotal - TUGA30_AMOUNT) / originalSubtotal;
      const adjusted = items.map((i) => ({
        ...i,
        unitPrice: Math.round(i.unitPrice * ratio * 100) / 100,
      }));
      const subtotal = adjusted.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
      return {
        items: adjusted,
        originalSubtotal,
        subtotal,
        discount: originalSubtotal - subtotal,
        code: valid,
      };
    }
  }

  return { items, originalSubtotal, subtotal: originalSubtotal, discount: 0, code: null };
}

export function loadStoredPromo(): PromoCode | null {
  try {
    return normalizePromo(localStorage.getItem(PROMO_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveStoredPromo(code: PromoCode | null) {
  try {
    if (code) localStorage.setItem(PROMO_STORAGE_KEY, code);
    else localStorage.removeItem(PROMO_STORAGE_KEY);
  } catch {
    /* noop */
  }
}

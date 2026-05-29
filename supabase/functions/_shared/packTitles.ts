// Titles shown in Shopify checkout per pack capacity × market.
// Source of truth — keep in sync with frontend cart labels.

export type PackCapacity = 1 | 3 | 6 | 9 | 12;
export type PackLocale =
  | "pt" | "es" | "en" | "fr" | "de" | "it" | "nl" | "br" | "mx" | "ar";

export const MARKET_LOCALE: Record<string, PackLocale> = {
  PT: "pt",
  ES: "es",
  US: "en", CA: "en", UK: "en", GB: "en", IE: "en", AU: "en", NZ: "en",
  FR: "fr", BE: "fr", CH: "fr", LU: "fr",
  DE: "de", AT: "de",
  IT: "it",
  NL: "nl",
  BR: "br",
  MX: "mx",
  AR: "ar",
};

export const PACK_TITLES: Record<PackCapacity, Record<PackLocale, string>> = {
  1: {
    pt: "Pack 1 Camisola",
    es: "Pack 1 Camiseta",
    en: "1 Jersey Pack",
    fr: "Pack 1 Maillot",
    de: "1 Trikot Pack",
    it: "Pack 1 Maglia",
    nl: "1 Shirt Pack",
    br: "Pack 1 Camisa",
    mx: "Pack 1 Camiseta",
    ar: "Pack 1 Camiseta",
  },
  3: {
    pt: "Leva 3 Paga 2", es: "Lleva 3 Paga 2", en: "Get 3 Pay 2",
    fr: "Prends 3 Paie 2", de: "Nimm 3 Zahle 2", it: "Prendi 3 Paga 2",
    nl: "Neem 3 Betaal 2", br: "Leva 3 Paga 2", mx: "Lleva 3 Paga 2",
    ar: "Lleva 3 Paga 2",
  },
  6: {
    pt: "Leva 6 Paga 3", es: "Lleva 6 Paga 3", en: "Get 6 Pay 3",
    fr: "Prends 6 Paie 3", de: "Nimm 6 Zahle 3", it: "Prendi 6 Paga 3",
    nl: "Neem 6 Betaal 3", br: "Leva 6 Paga 3", mx: "Lleva 6 Paga 3",
    ar: "Lleva 6 Paga 3",
  },
  9: {
    pt: "Leva 9 Paga 4", es: "Lleva 9 Paga 4", en: "Get 9 Pay 4",
    fr: "Prends 9 Paie 4", de: "Nimm 9 Zahle 4", it: "Prendi 9 Paga 4",
    nl: "Neem 9 Betaal 4", br: "Leva 9 Paga 4", mx: "Lleva 9 Paga 4",
    ar: "Lleva 9 Paga 4",
  },
  12: {
    pt: "Leva 12 Paga 5", es: "Lleva 12 Paga 5", en: "Get 12 Pay 5",
    fr: "Prends 12 Paie 5", de: "Nimm 12 Zahle 5", it: "Prendi 12 Paga 5",
    nl: "Neem 12 Betaal 5", br: "Leva 12 Paga 5", mx: "Lleva 12 Paga 5",
    ar: "Lleva 12 Paga 5",
  },
};

const VALID_CAPS: PackCapacity[] = [1, 3, 6, 9, 12];

export function getPackTitle(capacity: number, market: string): string {
  const cap = VALID_CAPS.includes(capacity as PackCapacity)
    ? (capacity as PackCapacity)
    : null;
  if (!cap) return `Pack (${capacity})`;
  const loc = MARKET_LOCALE[(market || "").toUpperCase()] || "en";
  return PACK_TITLES[cap][loc];
}

// Pay-units per capacity (every 3rd free): 1→1, 3→2, 6→3, 9→4, 12→5.
export function packPayUnits(capacity: PackCapacity): number {
  return capacity - Math.floor(capacity / 3);
}

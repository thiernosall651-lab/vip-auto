import type { CurrencyCode } from "../types/catalog";

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const localeByCurrency: Record<CurrencyCode, string> = {
    MAD: "fr-MA",
    XOF: "fr-SN",
    EUR: "fr-FR",
  };

  return new Intl.NumberFormat(localeByCurrency[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) {
    return null;
  }

  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

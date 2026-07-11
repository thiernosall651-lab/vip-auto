import type { CurrencyCode } from "../types/catalog";

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  // XOF (West African CFA franc) is displayed as "FCFA" with space-grouped thousands.
  if (currency === "XOF") {
    return `${new Intl.NumberFormat("fr-SN", { maximumFractionDigits: 0 }).format(amount)} FCFA`;
  }

  return new Intl.NumberFormat("fr-FR", {
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

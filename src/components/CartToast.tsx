import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useCart } from "../lib/cart";

export function CartToast(): JSX.Element | null {
  const { toast, openCart, dismissToast } = useCart();

  if (!toast) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4"
      role="status"
      aria-live="polite"
      style={{ animation: "toast-in 220ms ease-out" }}
    >
      <div className="flex w-full max-w-md items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-soft">
        <CheckCircle2 className="h-6 w-6 flex-none text-emerald-600" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-sm font-bold text-ink">{toast}</p>
        <button
          className="inline-flex flex-none items-center gap-1.5 rounded bg-ink px-3 py-2 text-xs font-black uppercase tracking-normal text-white transition hover:bg-signal"
          type="button"
          onClick={() => {
            dismissToast();
            openCart();
          }}
        >
          <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
          Voir le panier
        </button>
      </div>
    </div>
  );
}

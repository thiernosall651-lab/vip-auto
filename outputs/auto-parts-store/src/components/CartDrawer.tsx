import { MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "../lib/cart";
import { formatCurrency } from "../lib/format";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const focusableSelector =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function CartDrawer({ isOpen, onClose }: CartDrawerProps): JSX.Element | null {
  const { items, subtotal, removeItem, updateQuantity, buildWhatsAppOrderUrl } = useCart();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <button className="absolute inset-0 bg-black/40" type="button" onClick={onClose} aria-label="Fermer le panier" />
      <aside ref={panelRef} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-slate-500">Commande</p>
            <h2 id="cart-drawer-title" className="text-xl font-black text-ink">
              Votre panier
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-slate-200 text-ink transition hover:border-signal hover:text-signal"
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            title="Fermer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {items.length === 0 ? (
            <div className="rounded border border-dashed border-slate-300 p-6 text-center">
              <p className="text-base font-black text-ink">Panier vide</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ajoutez des produits pour générer une commande WhatsApp prête à envoyer.
              </p>
            </div>
          ) : (
            <ul className="grid gap-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3 rounded border border-slate-200 p-3">
                  <img
                    className="h-20 w-20 flex-none rounded object-cover"
                    src={item.product.image}
                    alt={item.product.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="160"
                    height="160"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-black leading-snug text-ink">{item.product.name}</h3>
                    <p className="mt-1 text-sm font-bold text-signal">
                      {formatCurrency(item.product.price * item.quantity, item.product.currency)}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded border border-slate-200">
                        <button
                          className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition hover:text-signal"
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label={`Réduire la quantité de ${item.product.name}`}
                          title="Réduire"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-ink">{item.quantity}</span>
                        <button
                          className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition hover:text-signal"
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label={`Augmenter la quantité de ${item.product.name}`}
                          title="Augmenter"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        className="inline-flex h-11 w-11 items-center justify-center rounded border border-slate-200 text-slate-500 transition hover:border-signal hover:text-signal"
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Supprimer ${item.product.name} du panier`}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center justify-between text-base font-black text-ink">
            <span>Total TTC</span>
            <span>{formatCurrency(subtotal, "XOF")}</span>
          </div>
          <a
            className={`mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition ${
              items.length === 0 ? "pointer-events-none bg-slate-300" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
            href={items.length > 0 ? buildWhatsAppOrderUrl() : "#"}
            aria-disabled={items.length === 0}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Commander
          </a>
        </div>
      </aside>
    </div>
  );
}

import { MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../lib/cart";
import { formatCurrency } from "../lib/format";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps): JSX.Element | null {
  const { items, subtotal, removeItem, updateQuantity, buildWhatsAppOrderUrl } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusables = asideRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusables || focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      asideRef.current?.querySelector<HTMLElement>("button, a[href], input")?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const canOrder = items.length > 0 && name.trim() !== "" && phone.trim() !== "";
  const deliveryNotes = `Client : ${name}\nTéléphone : ${phone}\nLivraison : ${[city, address]
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" — ")}`;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Panier">
      <button className="absolute inset-0 bg-black/40" type="button" onClick={onClose} aria-label="Fermer le panier" />
      <aside ref={asideRef} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-slate-500">Commande</p>
            <h2 className="text-xl font-black text-ink">Votre panier</h2>
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-ink transition hover:border-signal hover:text-signal"
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
            <>
              <ul className="grid gap-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3 rounded border border-slate-200 p-3">
                    <img
                      className="h-20 w-20 flex-none rounded bg-slate-50 object-contain p-1"
                      src={item.product.image}
                      alt={item.product.imageAlt}
                      loading="lazy"
                      width="160"
                      height="160"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black leading-snug text-ink">{item.product.name}</h3>
                      <p className="mt-1 text-sm font-bold text-signal">
                        {formatCurrency(item.product.price, item.product.currency)}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded border border-slate-200">
                          <button
                            className="inline-flex h-9 w-9 items-center justify-center text-slate-700 transition hover:text-signal"
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Réduire la quantité"
                            title="Réduire"
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm font-black text-ink">{item.quantity}</span>
                          <button
                            className="inline-flex h-9 w-9 items-center justify-center text-slate-700 transition hover:text-signal"
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Augmenter la quantité"
                            title="Augmenter"
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <button
                          className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-500 transition hover:border-signal hover:text-signal"
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Supprimer le produit"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3 rounded border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-ink">Vos coordonnées</p>
                <label className="grid gap-1.5 text-xs font-bold text-slate-600">
                  Nom complet
                  <input
                    className="min-h-11 rounded border border-slate-300 bg-white px-3 text-sm font-normal text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ex: Awa Sène"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-slate-600">
                  Téléphone
                  <input
                    className="min-h-11 rounded border border-slate-300 bg-white px-3 text-sm font-normal text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Ex: 77 123 45 67"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-xs font-bold text-slate-600">
                    Ville
                    <input
                      className="min-h-11 rounded border border-slate-300 bg-white px-3 text-sm font-normal text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="Dakar"
                      autoComplete="address-level2"
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs font-bold text-slate-600">
                    Quartier / repère
                    <input
                      className="min-h-11 rounded border border-slate-300 bg-white px-3 text-sm font-normal text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Ex: Sacré-Cœur 3"
                    />
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center justify-between text-base font-black text-ink">
            <span>Total</span>
            <span>{formatCurrency(subtotal, "XOF")}</span>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500">
            <span>Paiement à l'atelier ou à la livraison</span>
            <span aria-hidden="true">•</span>
            <span>Wave</span>
            <span aria-hidden="true">•</span>
            <span>Orange Money</span>
          </p>
          {items.length > 0 && !canOrder ? (
            <p className="mt-2 text-xs font-semibold text-signal">
              Renseignez votre nom et votre téléphone pour envoyer la commande.
            </p>
          ) : null}
          <a
            className={`mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded px-5 py-3 text-sm font-black uppercase tracking-normal text-white transition ${
              canOrder ? "bg-emerald-600 hover:bg-emerald-700" : "pointer-events-none bg-slate-300"
            }`}
            href={canOrder ? buildWhatsAppOrderUrl(deliveryNotes) : "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!canOrder}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Commander sur WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { contactInfo } from "../data/catalog";
import { useCart } from "../lib/cart";

type HeaderProps = {
  onCartOpen: () => void;
};

type NavigationItem = {
  label: string;
  to: "/" | "/shop" | "/about" | "/contact";
};

const navigationItems: NavigationItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Boutique", to: "/shop" },
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header({ onCartOpen }: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Pièces contrôlées, livraison rapide et paiement à la réception.</p>
          <a
            className="inline-flex items-center gap-2 font-semibold text-amber-300 transition hover:text-white"
            href={`https://wa.me/${contactInfo.whatsapp}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Conseil WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link className="flex items-center gap-3" to="/" aria-label="Retour à l'accueil">
          <span className="flex h-11 w-11 items-center justify-center rounded bg-signal text-lg font-black text-white">
            AP
          </span>
          <span>
            <span className="block text-lg font-black uppercase leading-none tracking-normal text-ink">
              Atlas Auto Parts
            </span>
            <span className="text-xs font-semibold uppercase tracking-normal text-slate-500">
              Pièces auto premium
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navigationItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-bold uppercase tracking-normal text-slate-600 transition hover:text-signal"
              activeProps={{ className: "text-signal" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="relative inline-flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white text-ink transition hover:border-signal hover:text-signal"
            type="button"
            onClick={onCartOpen}
            aria-label="Ouvrir le panier"
            title="Panier"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-signal px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            ) : null}
          </button>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white text-ink md:hidden"
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            aria-expanded={isMenuOpen}
            aria-label="Ouvrir le menu"
            title="Menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Navigation mobile">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded px-3 py-3 text-sm font-bold uppercase tracking-normal text-slate-700 transition hover:bg-slate-100"
                activeProps={{ className: "bg-red-50 text-signal" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

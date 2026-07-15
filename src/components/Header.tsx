import { Link } from "@tanstack/react-router";
import { CalendarCheck, Lock, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useAppointment } from "../lib/appointment";
import { useCart } from "../lib/cart";

type HeaderProps = {
  onCartOpen: () => void;
};

type NavigationItem = {
  label: string;
  to: "/" | "/services" | "/shop" | "/about" | "/contact";
};

const navigationItems: NavigationItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Boutique", to: "/shop" },
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header({ onCartOpen }: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { openAppointment } = useAppointment();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Centre d'entretien auto à Dakar · Rendez-vous rapide sur WhatsApp.</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 font-semibold text-amber-300 transition hover:text-white"
            onClick={() => openAppointment()}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre rendez-vous
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link className="flex items-center" to="/" aria-label="VIP AUTO — Accueil">
          <img
            className="h-11 w-auto rounded md:h-12"
            src="/images/logo-vip.png"
            alt="VIP AUTO — Pièces auto, entretien, performance"
            width="760"
            height="364"
          />
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
            type="button"
            className="hidden min-h-11 items-center justify-center gap-2 rounded bg-signal px-4 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 active:scale-[0.98] md:inline-flex"
            onClick={() => openAppointment()}
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prendre RDV
          </button>
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
          <Link
            to="/admin/login"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white text-slate-400 transition hover:border-signal hover:text-signal"
            aria-label="Espace administrateur"
            title="Espace administrateur"
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
          </Link>
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
            <button
              type="button"
              className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-4 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700"
              onClick={() => {
                setIsMenuOpen(false);
                openAppointment();
              }}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Prendre rendez-vous
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
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

/** Scroll to top after the next frame so navigation to the current route still returns to the top. */
function scrollToTop(): void {
  requestAnimationFrame(() => window.scrollTo({ top: 0 }));
}

export function Header({ onCartOpen }: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function handleNavClick(): void {
    setIsMenuOpen(false);
    scrollToTop();
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="bg-ink text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>Pièces contrôlées, livraison rapide et paiement à la réception.</p>
            <a
              className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-red-400 transition hover:text-white"
              href={`https://wa.me/${contactInfo.whatsapp}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Conseil WhatsApp
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link className="flex items-center gap-3" to="/" aria-label="VIP AUTO — retour à l'accueil" onClick={scrollToTop}>
            <img
              className="h-11 w-auto"
              src="/images/logo-vip.webp"
              alt="Logo VIP AUTO"
              width="240"
              height="160"
              decoding="async"
            />
            <span>
              <span className="block text-lg font-black uppercase leading-none tracking-normal text-ink">
                VIP AUTO
              </span>
              <span className="text-xs font-semibold uppercase tracking-normal text-slate-500">
                Pièces auto & entretien
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-normal text-slate-600 transition hover:text-signal"
                activeProps={{ className: "text-signal" }}
                onClick={scrollToTop}
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
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              title="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <nav className="relative z-40 border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Navigation mobile">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-[44px] items-center rounded px-3 py-3 text-sm font-bold uppercase tracking-normal text-slate-700 transition hover:bg-slate-100"
                  activeProps={{ className: "bg-red-50 text-signal" }}
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      {isMenuOpen ? (
        <button
          type="button"
          aria-label="Fermer le menu"
          tabIndex={-1}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}
    </>
  );
}

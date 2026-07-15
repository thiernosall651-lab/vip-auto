import { useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { contactInfo } from "../data/catalog";

// Persistent WhatsApp entry point — the primary conversion channel in Senegal.
// Hidden on mobile product pages so it never overlaps the sticky buy bar.
export function WhatsAppButton(): JSX.Element {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const onProductPage = pathname.startsWith("/products/");

  return (
    <a
      className={`fixed bottom-4 right-4 z-40 items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-soft transition hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 ${
        onProductPage ? "hidden md:inline-flex" : "inline-flex"
      }`}
      href={`https://wa.me/${contactInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter VIP AUTO sur WhatsApp"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

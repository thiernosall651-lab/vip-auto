import { Link, Navigate, Outlet } from "@tanstack/react-router";
import { Boxes, Home, LayoutDashboard, LogOut, MessageSquareQuote, Sparkles, Star, Wrench } from "lucide-react";
import { useState } from "react";
import { AdminAssistant } from "../../components/admin/AdminAssistant";
import { useAdminAuth } from "../../lib/admin/auth";

const navItems = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Produits", icon: Boxes, exact: false },
  { to: "/admin/services", label: "Services", icon: Wrench, exact: false },
  { to: "/admin/homepage", label: "Page d'accueil", icon: Home, exact: false },
  { to: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote, exact: false },
  { to: "/admin/brands", label: "Marques", icon: Star, exact: false },
] as const;

export function AdminLayout(): JSX.Element {
  const { isAuthenticated, logout } = useAdminAuth();
  const [assistantOpen, setAssistantOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <>
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-1 border-b border-slate-200 bg-ink px-4 py-4 text-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="mb-4 flex items-center gap-3 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-signal text-sm font-black">VA</span>
          <div>
            <p className="text-sm font-black uppercase leading-none">VIP AUTO</p>
            <p className="text-xs text-slate-400">Administration</p>
          </div>
        </div>
        <nav className="grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                activeProps={{ className: "bg-signal text-white hover:bg-signal" }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => setAssistantOpen(true)}
          className="mt-3 flex items-center gap-3 rounded bg-white/10 px-3 py-2.5 text-sm font-black text-amber-300 transition hover:bg-signal hover:text-white"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Assistant IA
        </button>
        <div className="mt-auto grid gap-1 border-t border-white/10 pt-3">
          <a
            href="/"
            className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Voir le site
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Se déconnecter
          </button>
        </div>
      </aside>

      <div className="p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </div>
    </div>
      <AdminAssistant isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </>
  );
}

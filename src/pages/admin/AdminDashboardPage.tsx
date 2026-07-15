import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminButton, AdminCard, AdminField, TextInput } from "../../components/admin/AdminUI";
import { useAdminAuth } from "../../lib/admin/auth";
import { useContent } from "../../lib/content/store";

export function AdminDashboardPage(): JSX.Element {
  const { content, resetContent } = useContent();
  const { changePin } = useAdminAuth();
  const [currentPin, setCurrentPin] = useState("");
  const [nextPin, setNextPin] = useState("");
  const [pinMessage, setPinMessage] = useState("");

  const stats = [
    { label: "Produits", value: content.products.length, to: "/admin/products" as const },
    { label: "Services", value: content.services.length, to: "/admin/services" as const },
    { label: "Témoignages", value: content.reviews.length, to: "/admin/testimonials" as const },
    { label: "Marques", value: content.brands.length, to: "/admin/brands" as const },
  ];

  function handleChangePin(): void {
    if (changePin(currentPin, nextPin)) {
      setPinMessage("Code PIN mis à jour ✓");
    } else {
      setPinMessage("Échec : code actuel incorrect ou nouveau code invalide (4 chiffres).");
    }
    setCurrentPin("");
    setNextPin("");
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Tableau de bord</h1>
        <p className="mt-1 text-sm text-slate-500">Gérez le contenu du site VIP AUTO.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to} className="rounded border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
            <p className="text-3xl font-black text-ink">{stat.value}</p>
            <p className="mt-1 text-sm font-bold text-slate-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <h2 className="text-lg font-black text-ink">Changer le code PIN</h2>
          <div className="mt-4 grid gap-3">
            <AdminField label="Code actuel">
              <TextInput value={currentPin} onChange={setCurrentPin} type="password" />
            </AdminField>
            <AdminField label="Nouveau code (4 chiffres)">
              <TextInput value={nextPin} onChange={(value) => setNextPin(value.replace(/\D/g, "").slice(0, 4))} type="password" />
            </AdminField>
            <div className="flex items-center gap-3">
              <AdminButton onClick={handleChangePin}>Mettre à jour</AdminButton>
              {pinMessage ? <span className="text-sm font-bold text-slate-600">{pinMessage}</span> : null}
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-lg font-black text-ink">Réinitialiser le contenu</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Rétablit tous les produits, services, témoignages et marques à leurs valeurs d'origine. Cette action est
            irréversible.
          </p>
          <div className="mt-4">
            <AdminButton
              variant="danger"
              onClick={() => {
                if (window.confirm("Réinitialiser tout le contenu du site ?")) {
                  resetContent();
                }
              }}
            >
              Réinitialiser
            </AdminButton>
          </div>
        </AdminCard>
      </div>

      <p className="text-xs text-slate-400">
        Note : le contenu et l'authentification sont enregistrés dans ce navigateur (localStorage). Pour une gestion
        multi-utilisateurs et un stockage centralisé, une base de données (Supabase) pourra être branchée sans changer
        cette interface.
      </p>
    </div>
  );
}

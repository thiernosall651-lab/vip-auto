import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminButton, AdminCard, AdminField, ImageInput, TextInput } from "../../components/admin/AdminUI";
import { useContent } from "../../lib/content/store";
import type { BrandItem } from "../../types/catalog";

function blankBrand(): BrandItem {
  return { id: `brand-${Date.now()}`, name: "", logo: "" };
}

export function AdminBrandsPage(): JSX.Element {
  const { content, saveBrand, deleteBrand } = useContent();
  const [draft, setDraft] = useState<BrandItem | null>(null);

  function update<K extends keyof BrandItem>(key: K, value: BrandItem[K]): void {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  if (draft) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-ink">
            {content.brands.some((b) => b.id === draft.id) ? "Modifier" : "Ajouter"} une marque
          </h1>
          <AdminButton variant="ghost" onClick={() => setDraft(null)}>
            Annuler
          </AdminButton>
        </div>
        <AdminCard>
          <div className="grid gap-4">
            <AdminField label="Nom de la marque">
              <TextInput value={draft.name} onChange={(value) => update("name", value)} />
            </AdminField>
            <ImageInput label="Logo officiel (optionnel)" value={draft.logo} onChange={(value) => update("logo", value)} />
          </div>
          <div className="mt-6 flex gap-3">
            <AdminButton
              onClick={() => {
                saveBrand({ ...draft, name: draft.name.trim() });
                setDraft(null);
              }}
            >
              Enregistrer
            </AdminButton>
            <AdminButton variant="ghost" onClick={() => setDraft(null)}>
              Annuler
            </AdminButton>
          </div>
        </AdminCard>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink">Marques</h1>
          <p className="mt-1 text-sm text-slate-500">{content.brands.length} marque(s) entretenue(s).</p>
        </div>
        <AdminButton onClick={() => setDraft(blankBrand())}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </AdminButton>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {content.brands.map((brand) => (
          <div key={brand.id} className="flex items-center gap-3 rounded border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex h-12 w-16 flex-none items-center justify-center overflow-hidden rounded bg-slate-50">
              {brand.logo ? (
                <img src={brand.logo} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="text-xs font-black uppercase text-slate-400">{brand.name.slice(0, 3)}</span>
              )}
            </div>
            <p className="min-w-0 flex-1 truncate text-sm font-black text-ink">{brand.name}</p>
            <button className="text-slate-500 hover:text-signal" onClick={() => setDraft({ ...brand })} aria-label="Modifier">
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="text-slate-500 hover:text-signal"
              onClick={() => {
                if (window.confirm(`Supprimer « ${brand.name} » ?`)) {
                  deleteBrand(brand.id);
                }
              }}
              aria-label="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminButton, AdminCard, AdminField, TextArea, TextInput } from "../../components/admin/AdminUI";
import { useContent } from "../../lib/content/store";
import type { Review } from "../../types/catalog";

function blankReview(): Review {
  return { id: `review-${Date.now()}`, name: "", rating: 5, city: "", quote: "" };
}

export function AdminTestimonialsPage(): JSX.Element {
  const { content, saveReview, deleteReview } = useContent();
  const [draft, setDraft] = useState<Review | null>(null);

  function update<K extends keyof Review>(key: K, value: Review[K]): void {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  if (draft) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-ink">
            {content.reviews.some((r) => r.id === draft.id) ? "Modifier" : "Ajouter"} un témoignage
          </h1>
          <AdminButton variant="ghost" onClick={() => setDraft(null)}>
            Annuler
          </AdminButton>
        </div>
        <AdminCard>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Nom du client">
              <TextInput value={draft.name} onChange={(value) => update("name", value)} />
            </AdminField>
            <AdminField label="Ville">
              <TextInput value={draft.city} onChange={(value) => update("city", value)} />
            </AdminField>
            <AdminField label="Note">
              <select
                className="min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink outline-none focus:border-signal focus:ring-2 focus:ring-red-100"
                value={draft.rating}
                onChange={(event) => update("rating", Number(event.target.value) as Review["rating"])}
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} étoile(s)
                  </option>
                ))}
              </select>
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Témoignage">
              <TextArea value={draft.quote} onChange={(value) => update("quote", value)} rows={3} />
            </AdminField>
          </div>
          <div className="mt-6 flex gap-3">
            <AdminButton
              onClick={() => {
                saveReview(draft);
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
          <h1 className="text-3xl font-black text-ink">Témoignages</h1>
          <p className="mt-1 text-sm text-slate-500">{content.reviews.length} avis client(s).</p>
        </div>
        <AdminButton onClick={() => setDraft(blankReview())}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </AdminButton>
      </div>
      <div className="grid gap-3">
        {content.reviews.map((review) => (
          <div key={review.id} className="flex items-center gap-4 rounded border border-slate-200 bg-white p-3 shadow-sm">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-ink">
                {review.name} · <span className="font-semibold text-slate-500">{review.city}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-amber-500">
                {Array.from({ length: review.rating }, (_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </p>
              <p className="mt-1 truncate text-xs text-slate-500">{review.quote}</p>
            </div>
            <button className="text-slate-500 hover:text-signal" onClick={() => setDraft({ ...review })} aria-label="Modifier">
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="text-slate-500 hover:text-signal"
              onClick={() => {
                if (window.confirm(`Supprimer l'avis de ${review.name} ?`)) {
                  deleteReview(review.id);
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

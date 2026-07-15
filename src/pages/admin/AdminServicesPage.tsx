import { Copy, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminButton, AdminCard, AdminField, ImageInput, TextArea, TextInput } from "../../components/admin/AdminUI";
import { generateService } from "../../lib/ai/engine";
import { useContent } from "../../lib/content/store";
import type { Service } from "../../types/catalog";

function blankService(): Service {
  return { id: `service-${Date.now()}`, name: "", description: "", details: [], image: "" };
}

export function AdminServicesPage(): JSX.Element {
  const { content, saveService, deleteService } = useContent();
  const [draft, setDraft] = useState<Service | null>(null);
  const [extras, setExtras] = useState("");

  function update<K extends keyof Service>(key: K, value: Service[K]): void {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  }

  function generateWithAI(): void {
    if (!draft) {
      return;
    }
    const result = generateService({ name: draft.name });
    setDraft({ ...draft, name: draft.name.trim() || result.name, description: result.description, details: result.benefits });
    setExtras(
      [
        `TITRE MARKETING\n${result.headline}`,
        `SEO\nTitre : ${result.seoTitle}\nMéta : ${result.seoDescription}`,
        `FAQ\n${result.faq.map((item) => `Q : ${item.question}\nR : ${item.answer}`).join("\n\n")}`,
        `CTA WHATSAPP\n${result.whatsappCtas.map((cta) => `• ${cta}`).join("\n")}`,
      ].join("\n\n"),
    );
  }

  if (draft) {
    return (
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-ink">
            {content.services.some((s) => s.id === draft.id) ? "Modifier" : "Ajouter"} un service
          </h1>
          <AdminButton variant="ghost" onClick={() => setDraft(null)}>
            Annuler
          </AdminButton>
        </div>

        <AdminCard>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-signal text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-black text-ink">Rédacteur de service IA</h2>
              <p className="text-xs text-slate-500">
                Génère description, bénéfices, SEO, FAQ et CTA WhatsApp à partir du nom du service.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <AdminButton onClick={generateWithAI}>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Générer avec l'IA
            </AdminButton>
          </div>
          {extras ? (
            <div className="mt-4 grid gap-2">
              <AdminField label="Contenu marketing généré (modifiable)">
                <TextArea value={extras} onChange={setExtras} rows={10} />
              </AdminField>
              <div>
                <AdminButton variant="ghost" onClick={() => navigator.clipboard.writeText(extras)}>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copier
                </AdminButton>
              </div>
            </div>
          ) : null}
        </AdminCard>

        <AdminCard>
          <div className="grid gap-4">
            <AdminField label="Nom du service">
              <TextInput value={draft.name} onChange={(value) => update("name", value)} />
            </AdminField>
            <AdminField label="Description">
              <TextArea value={draft.description} onChange={(value) => update("description", value)} rows={3} />
            </AdminField>
            <AdminField label="Détails (un par ligne)">
              <TextArea
                value={draft.details.join("\n")}
                onChange={(value) => update("details", value.split("\n").map((item) => item.trim()).filter(Boolean))}
                rows={4}
              />
            </AdminField>
            <ImageInput label="Image du service (optionnelle)" value={draft.image} onChange={(value) => update("image", value)} />
          </div>
          <div className="mt-6 flex gap-3">
            <AdminButton
              onClick={() => {
                saveService(draft);
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
          <h1 className="text-3xl font-black text-ink">Services</h1>
          <p className="mt-1 text-sm text-slate-500">{content.services.length} service(s).</p>
        </div>
        <AdminButton onClick={() => setDraft(blankService())}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </AdminButton>
      </div>
      <div className="grid gap-3">
        {content.services.map((service) => (
          <div key={service.id} className="flex items-center gap-4 rounded border border-slate-200 bg-white p-3 shadow-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-ink">{service.name}</p>
              <p className="truncate text-xs text-slate-500">{service.description}</p>
            </div>
            <button className="text-slate-500 hover:text-signal" onClick={() => setDraft({ ...service })} aria-label="Modifier">
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="text-slate-500 hover:text-signal"
              onClick={() => {
                if (window.confirm(`Supprimer « ${service.name} » ?`)) {
                  deleteService(service.id);
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

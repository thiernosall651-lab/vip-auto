import { Copy, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { generateMarketing, marketingKinds, type MarketingKind } from "../../lib/ai/engine";
import { AdminButton, AdminField, TextArea, TextInput } from "./AdminUI";

const selectClass =
  "min-h-11 w-full rounded border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100";

export function AdminAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }): JSX.Element | null {
  const [kind, setKind] = useState<MarketingKind>("facebook");
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) {
    return null;
  }

  function generate(): void {
    setOutput(generateMarketing(kind, topic));
    setCopied(false);
  }

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Assistant IA marketing">
      <button className="absolute inset-0 bg-black/40" type="button" onClick={onClose} aria-label="Fermer" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-black text-ink">Assistant IA marketing</p>
              <p className="text-xs text-slate-500">Expert automobile · Dakar</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-ink transition hover:border-signal hover:text-signal"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <AdminField label="Type de contenu">
            <select className={selectClass} value={kind} onChange={(event) => setKind(event.target.value as MarketingKind)}>
              {marketingKinds.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Sujet / produit / service" hint="Ex : Vidange, Huile Castrol, Freinage, Batterie…">
            <TextInput value={topic} onChange={setTopic} placeholder="l'entretien de votre véhicule" />
          </AdminField>

          <AdminButton onClick={generate}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Générer
          </AdminButton>

          {output ? (
            <div className="grid gap-2">
              <AdminField label="Contenu généré (modifiable)">
                <TextArea value={output} onChange={setOutput} rows={10} />
              </AdminField>
              <div className="flex items-center gap-3">
                <AdminButton variant="ghost" onClick={copy}>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copier
                </AdminButton>
                {copied ? <span className="text-sm font-bold text-emerald-600">Copié ✓</span> : null}
              </div>
            </div>
          ) : (
            <p className="text-xs leading-6 text-slate-400">
              Choisissez un type de contenu, indiquez le sujet et cliquez sur « Générer ». Le texte reste entièrement
              modifiable avant d'être copié vers Facebook, Instagram, WhatsApp ou Google Business.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

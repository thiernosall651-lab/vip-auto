import { Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { AdminButton, AdminCard, AdminField, ImageInput, TextArea, TextInput } from "../../components/admin/AdminUI";
import { generateHomepage, type GeneratedHomepage } from "../../lib/ai/engine";
import { useContent } from "../../lib/content/store";
import type { HeroContent } from "../../types/catalog";

function VariantList({
  title,
  items,
  onUse,
}: {
  title: string;
  items: string[];
  onUse: (value: string) => void;
}): JSX.Element {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-normal text-slate-500">{title}</p>
      <div className="mt-2 grid gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 rounded border border-slate-200 bg-slate-50 p-2">
            <p className="min-w-0 flex-1 text-sm text-slate-700">{item}</p>
            <button
              type="button"
              onClick={() => onUse(item)}
              className="flex-none rounded bg-ink px-2.5 py-1 text-xs font-black uppercase tracking-normal text-white transition hover:bg-signal"
            >
              Utiliser
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminHomepagePage(): JSX.Element {
  const { content, setHero } = useContent();
  const [draft, setDraft] = useState<HeroContent>(content.hero);
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("");
  const [variants, setVariants] = useState<GeneratedHomepage | null>(null);
  const [bannersText, setBannersText] = useState("");

  function update<K extends keyof HeroContent>(key: K, value: HeroContent[K]): void {
    setSaved(false);
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function generateVariants(): void {
    const result = generateHomepage({ theme });
    setVariants(result);
    setBannersText(
      [
        `BANNIÈRES\n${result.banners.map((banner) => `• ${banner}`).join("\n")}`,
        `CAMPAGNES\n${result.campaigns.map((campaign) => `${campaign.title}\n${campaign.body}`).join("\n\n")}`,
      ].join("\n\n"),
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Page d'accueil</h1>
        <p className="mt-1 text-sm text-slate-500">Modifiez le bloc héros affiché en haut de la page d'accueil.</p>
      </div>

      <AdminCard>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-signal text-white">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-black text-ink">Rédacteur page d'accueil IA</h2>
            <p className="text-xs text-slate-500">
              Génère titres, sous-titres, boutons, bannières et campagnes. Cliquez sur « Utiliser » pour appliquer.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <AdminField label="Thème / campagne (optionnel)">
            <TextInput value={theme} onChange={setTheme} placeholder="Ex : hivernage, promo vidange…" />
          </AdminField>
          <AdminButton onClick={generateVariants}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Générer des variantes
          </AdminButton>
        </div>
        {variants ? (
          <div className="mt-4 grid gap-4">
            <VariantList title="Titres proposés" items={variants.headlines} onUse={(value) => update("title", value)} />
            <VariantList
              title="Sous-titres proposés"
              items={variants.subtitles}
              onUse={(value) => update("subtitle", value)}
            />
            <VariantList
              title="Textes de bouton"
              items={variants.ctas}
              onUse={(value) => update("primaryCtaLabel", value)}
            />
            <AdminField label="Bannières & campagnes (modifiable)">
              <TextArea value={bannersText} onChange={setBannersText} rows={8} />
            </AdminField>
            <div>
              <AdminButton variant="ghost" onClick={() => navigator.clipboard.writeText(bannersText)}>
                <Copy className="h-4 w-4" aria-hidden="true" />
                Copier
              </AdminButton>
            </div>
          </div>
        ) : null}
      </AdminCard>

      <AdminCard>
        <div className="grid gap-4">
          <AdminField label="Sur-titre">
            <TextInput value={draft.eyebrow} onChange={(value) => update("eyebrow", value)} />
          </AdminField>
          <AdminField label="Titre principal">
            <TextArea value={draft.title} onChange={(value) => update("title", value)} rows={2} />
          </AdminField>
          <AdminField label="Sous-titre">
            <TextArea value={draft.subtitle} onChange={(value) => update("subtitle", value)} rows={3} />
          </AdminField>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminField label="Bouton principal (rendez-vous)">
              <TextInput value={draft.primaryCtaLabel} onChange={(value) => update("primaryCtaLabel", value)} />
            </AdminField>
            <AdminField label="Bouton secondaire (services)">
              <TextInput value={draft.secondaryCtaLabel} onChange={(value) => update("secondaryCtaLabel", value)} />
            </AdminField>
          </div>
          <ImageInput label="Image du héros" value={draft.image} onChange={(value) => update("image", value)} />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <AdminButton
            onClick={() => {
              setHero(draft);
              setSaved(true);
            }}
          >
            Enregistrer
          </AdminButton>
          {saved ? <span className="text-sm font-bold text-emerald-600">Enregistré ✓</span> : null}
        </div>
      </AdminCard>
    </div>
  );
}

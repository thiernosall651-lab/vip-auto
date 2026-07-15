import { premiumOilBrands } from "../data/catalog";
import { SectionHeader } from "./SectionHeader";

// Showcase of the premium oil brands stocked at the workshop — official
// container photo + official logo + brand name. Purely presentational: no
// price, no cart, no product page. Cards share the same structure so every
// card in a row keeps an equal height; images are lazy-loaded.
export function PremiumOilBrands(): JSX.Element | null {
  if (premiumOilBrands.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Marques premium"
          title="Marques d'huiles premium disponibles"
          description="Retrouvez à l'atelier VIP AUTO les plus grandes marques d'huiles moteur, en bidons d'origine. Nous vous conseillons l'huile adaptée à votre véhicule lors de votre vidange."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {premiumOilBrands.map((brand) => (
            <article
              key={brand.id}
              className="flex h-full flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex h-56 items-center justify-center bg-white p-5">
                <img
                  src={brand.image}
                  alt={`Huile moteur ${brand.name} en bidon d'origine disponible chez VIP AUTO à Dakar`}
                  loading="lazy"
                  width={480}
                  height={360}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 p-5">
                <img
                  src={brand.logo}
                  alt={`Logo officiel ${brand.name}`}
                  loading="lazy"
                  className="h-7 w-auto max-w-[130px] object-contain"
                />
                <span className="text-sm font-black uppercase tracking-normal text-ink">{brand.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

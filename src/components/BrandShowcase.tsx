import { partnerBrands } from "../data/catalog";
import { SectionHeader } from "./SectionHeader";

export function BrandShowcase(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <SectionHeader
        eyebrow="Nos marques"
        title="Compatibles avec les plus grandes marques"
        description="Des références contrôlées pour les constructeurs les plus répandus au Maroc. Les logos officiels remplaceront prochainement ces emplacements."
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {partnerBrands.map((brand) => (
          <div
            key={brand.id}
            className="group flex aspect-[3/2] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-soft"
          >
            {brand.logo ? (
              <img
                className="max-h-12 w-auto object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                loading="lazy"
                width="160"
                height="80"
              />
            ) : (
              <span className="text-center text-sm font-black uppercase tracking-wide text-steel transition group-hover:text-ink sm:text-base">
                {brand.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

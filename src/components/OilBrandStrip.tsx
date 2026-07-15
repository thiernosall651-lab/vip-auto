import { oilBrands } from "../data/catalog";

// Static, centered logo strip of the oil / lubricant brands we trust. Uniform
// height per row keeps it balanced; grayscale settles to full colour on hover,
// matching the premium, understated treatment of the vehicle brand carousel.
export function OilBrandStrip(): JSX.Element | null {
  if (oilBrands.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-slate-200 bg-white py-12" aria-label="Marques d'huiles et de lubrifiants de confiance">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm font-black uppercase tracking-normal text-slate-500">
          Marques d'huiles de confiance
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
          {oilBrands.map((brand) => (
            <li key={brand.id} className="flex h-9 items-center sm:h-11">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  className="h-full w-auto max-w-[132px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="whitespace-nowrap text-lg font-black uppercase tracking-wide text-slate-400">
                  {brand.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

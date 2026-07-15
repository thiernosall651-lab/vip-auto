import { useContent } from "../lib/content/store";
import type { BrandItem } from "../types/catalog";

// Uniform tile so there is never any layout shift, whether a brand shows an
// uploaded transparent logo (admin) or its wordmark fallback.
function BrandTile({ brand }: { brand: BrandItem }): JSX.Element {
  return (
    <div className="mr-10 flex h-20 w-48 flex-none items-center justify-center">
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          width={180}
          height={80}
          loading="lazy"
          className="max-h-20 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="whitespace-nowrap text-lg font-black uppercase tracking-wide text-slate-400 transition-colors duration-300 hover:text-ink">
          {brand.name}
        </span>
      )}
    </div>
  );
}

// Premium infinite marquee: the list is duplicated and the track is animated by
// -50%, giving a seamless loop. Pauses on hover; respects reduced motion.
export function BrandCarousel(): JSX.Element | null {
  const { content } = useContent();

  if (content.brands.length === 0) {
    return null;
  }

  const items = [...content.brands, ...content.brands];

  return (
    <div className="group relative overflow-hidden" aria-label="Marques que nous entretenons">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((brand, index) => (
          <BrandTile key={`${brand.id}-${index}`} brand={brand} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

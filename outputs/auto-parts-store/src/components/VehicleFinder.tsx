import { Search } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { products, vehicleBrands, vehicleYears } from "../data/catalog";

export function VehicleFinder(): JSX.Element {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const matchingProducts = useMemo(() => {
    if (!hasSearched) {
      return [];
    }

    return products.filter((product) => {
      const matchesBrand = selectedBrand
        ? product.compatibleBrands.some((brand) => brand.toLowerCase() === selectedBrand.toLowerCase())
        : true;
      const year = Number(selectedYear);
      const matchesYear = selectedYear ? product.compatibleYears.includes(year) : true;

      return matchesBrand && matchesYear;
    });
  }, [hasSearched, selectedBrand, selectedYear]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setHasSearched(true);
  }

  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:-mt-20 sm:px-6 lg:-mt-24">
      <form
        className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(2,6,23,0.45)] ring-1 ring-black/5 md:p-6"
        onSubmit={handleSubmit}
        aria-label="Rechercher des pièces par véhicule"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="finder-brand">
            Marque
            <select
              id="finder-brand"
              name="brand"
              autoComplete="off"
              className="min-h-12 rounded border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
            >
              <option value="">Toutes les marques</option>
              {vehicleBrands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-ink" htmlFor="finder-year">
            Année
            <select
              id="finder-year"
              name="year"
              autoComplete="off"
              className="min-h-12 rounded border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              <option value="">Toutes les années</option>
              {vehicleYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-signal px-6 py-3 text-sm font-black uppercase tracking-normal text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2"
            type="submit"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Trouver
          </button>
        </div>

        <div className="mt-4" role="status" aria-live="polite">
          {hasSearched ? (
            <div className="rounded bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              {matchingProducts.length > 0
                ? `${matchingProducts.length} produit(s) compatible(s) trouvé(s).`
                : "Aucun produit trouvé pour cette recherche. Un conseiller peut vérifier la référence sur WhatsApp."}
            </div>
          ) : null}
        </div>
      </form>
    </section>
  );
}

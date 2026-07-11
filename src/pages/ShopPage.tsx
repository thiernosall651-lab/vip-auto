import { useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { categories, products, vehicleBrands } from "../data/catalog";
import { useSeo } from "../lib/useSeo";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/SectionHeader";
import type { ProductCategory } from "../types/catalog";

type CategoryFilter = ProductCategory | "all";

function isCategoryFilter(value: string | undefined): value is ProductCategory {
  return categories.some((categoryItem) => categoryItem.id === value);
}

export function ShopPage(): JSX.Element {
  const search = useSearch({ from: "/shop" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(() =>
    isCategoryFilter(search.category) ? search.category : "all",
  );
  const [brand, setBrand] = useState(() => (search.brand ? search.brand.toLowerCase() : "all"));

  useEffect(() => {
    setCategory(isCategoryFilter(search.category) ? search.category : "all");
  }, [search.category]);

  useEffect(() => {
    setBrand(search.brand ? search.brand.toLowerCase() : "all");
  }, [search.brand]);

  useSeo({
    title: "Boutique pièces auto | VIP AUTO",
    description:
      "Filtrez les pièces auto VIP AUTO par catégorie, marque compatible et recherche texte. Commande rapide avec paiement à la livraison.",
    canonicalPath: "/shop",
  });

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "all" || product.category === category;
      const matchesBrand =
        brand === "all" || product.compatibleBrands.some((compatibleBrand) => compatibleBrand.toLowerCase() === brand);

      return matchesQuery && matchesCategory && matchesBrand;
    });
  }, [brand, category, query]);

  return (
    <main>
      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            as="h1"
            eyebrow="Boutique"
            title="Catalogue de pièces auto"
            description="Filtrez par catégorie, marque compatible et mot-clé pour trouver la pièce adaptée à votre véhicule."
          />

          <div className="mt-8 grid gap-3 rounded border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_220px]">
            <label className="relative block">
              <span className="sr-only">Recherche produit</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                className="min-h-12 w-full rounded border border-slate-300 pl-10 pr-4 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
                type="search"
                name="q"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Huile, batterie, Mercedes..."
              />
            </label>

            <label className="sr-only" htmlFor="category-filter">
              Catégorie
            </label>
            <select
              id="category-filter"
              className="min-h-12 rounded border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              value={category}
              onChange={(event) => setCategory(event.target.value as CategoryFilter)}
            >
              <option value="all">Toutes catégories</option>
              {categories.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem.name}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="brand-filter">
              Marque compatible
            </label>
            <select
              id="brand-filter"
              className="min-h-12 rounded border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            >
              <option value="all">Toutes marques</option>
              {vehicleBrands.map((vehicleBrand) => (
                <option key={vehicleBrand.id} value={vehicleBrand.name.toLowerCase()}>
                  {vehicleBrand.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-slate-600">{filteredProducts.length} produit(s) affiché(s)</p>
          <p className="text-sm text-slate-500">Prix TTC · paiement à la livraison disponible</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <h2 className="text-xl font-black text-ink">Aucun produit trouvé</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Essayez une autre recherche ou demandez une vérification de référence par WhatsApp.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

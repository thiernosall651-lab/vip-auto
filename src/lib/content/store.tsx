import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { BrandItem, HeroContent, OilProduct, Product, Review, Service } from "../../types/catalog";
import { buildDefaultContent, type SiteContent } from "./defaults";

const STORAGE_KEY = "vip-auto-content";
const VERSION_KEY = "vip-auto-content-version";
// Bump when seed data (e.g. the official brand list) changes so returning
// visitors pick it up. Only version-owned collections are refreshed; product /
// service / testimonial / hero edits are preserved.
const CONTENT_VERSION = "5";

function loadContent(): SiteContent {
  const defaults = buildDefaultContent();

  if (typeof window === "undefined") {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaults;
    }
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    const outdated = window.localStorage.getItem(VERSION_KEY) !== CONTENT_VERSION;
    // Merge defaults with parsed data for brands and recommended oils so that
    // newly added properties (logo, image) are picked up even when the user
    // has an older localStorage entry without them.
    const mergeById = <T extends { id?: string }>(base: T[], override?: T[]): T[] => {
      if (!Array.isArray(override) || override.length === 0) return base;
      const map = new Map<string, T>();
      for (const item of override) {
        if (item && (item as any).id) map.set((item as any).id, item);
      }
      const merged = base.map((b) => {
        const id = (b as any).id as string | undefined;
        const other = id ? (map.get(id) as any) : undefined;
        if (!other) return b;
        // shallow merge but avoid overriding with empty strings / null / undefined
        const result: any = { ...(b as any) };
        for (const key of Object.keys(other)) {
          const val = other[key];
          if (val !== undefined && val !== null && !(typeof val === "string" && val === "")) {
            result[key] = val;
          }
        }
        return result as T;
      });
      // append any override items that don't exist in base
      for (const item of override) {
        if (item && (item as any).id && !base.some((b) => (b as any).id === (item as any).id)) {
          merged.push(item);
        }
      }
      return merged;
    };

    return {
      hero: { ...defaults.hero, ...parsed.hero },
      products: Array.isArray(parsed.products) ? mergeById(defaults.products, parsed.products) : defaults.products,
      services: Array.isArray(parsed.services) ? parsed.services : defaults.services,
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : defaults.reviews,
      brands: !outdated && Array.isArray(parsed.brands) ? mergeById(defaults.brands, parsed.brands) : defaults.brands,
      recommendedOils: !outdated && Array.isArray(parsed.recommendedOils)
        ? mergeById(defaults.recommendedOils, parsed.recommendedOils)
        : defaults.recommendedOils,
    };
  } catch {
    return defaults;
  }
}

function upsert<T extends { id: string }>(items: T[], next: T): T[] {
  const exists = items.some((item) => item.id === next.id);
  return exists ? items.map((item) => (item.id === next.id ? next : item)) : [...items, next];
}

type ContentContextValue = {
  content: SiteContent;
  activeProducts: Product[];
  setHero: (hero: HeroContent) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveService: (service: Service) => void;
  deleteService: (id: string) => void;
  saveReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  saveBrand: (brand: BrandItem) => void;
  deleteBrand: (id: string) => void;
  saveOil: (oil: OilProduct) => void;
  deleteOil: (id: string) => void;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [content, setContent] = useState<SiteContent>(loadContent);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      window.localStorage.setItem(VERSION_KEY, CONTENT_VERSION);
    } catch (error) {
      // localStorage quota (large base64 images) — keep the app running.
      console.warn("VIP AUTO: impossible d'enregistrer le contenu (quota atteint ?)", error);
    }
  }, [content]);

  const setHero = useCallback((hero: HeroContent) => setContent((current) => ({ ...current, hero })), []);

  const saveProduct = useCallback(
    (product: Product) => setContent((current) => ({ ...current, products: upsert(current.products, product) })),
    [],
  );
  const deleteProduct = useCallback(
    (id: string) =>
      setContent((current) => ({ ...current, products: current.products.filter((item) => item.id !== id) })),
    [],
  );

  const saveService = useCallback(
    (service: Service) => setContent((current) => ({ ...current, services: upsert(current.services, service) })),
    [],
  );
  const deleteService = useCallback(
    (id: string) =>
      setContent((current) => ({ ...current, services: current.services.filter((item) => item.id !== id) })),
    [],
  );

  const saveReview = useCallback(
    (review: Review) => setContent((current) => ({ ...current, reviews: upsert(current.reviews, review) })),
    [],
  );
  const deleteReview = useCallback(
    (id: string) =>
      setContent((current) => ({ ...current, reviews: current.reviews.filter((item) => item.id !== id) })),
    [],
  );

  const saveBrand = useCallback(
    (brand: BrandItem) => setContent((current) => ({ ...current, brands: upsert(current.brands, brand) })),
    [],
  );
  const deleteBrand = useCallback(
    (id: string) => setContent((current) => ({ ...current, brands: current.brands.filter((item) => item.id !== id) })),
    [],
  );

  const saveOil = useCallback(
    (oil: OilProduct) =>
      setContent((current) => ({ ...current, recommendedOils: upsert(current.recommendedOils, oil) })),
    [],
  );
  const deleteOil = useCallback(
    (id: string) =>
      setContent((current) => ({
        ...current,
        recommendedOils: current.recommendedOils.filter((item) => item.id !== id),
      })),
    [],
  );

  const resetContent = useCallback(() => setContent(buildDefaultContent()), []);

  const activeProducts = useMemo(
    () =>
      content.products.filter(
        (product) =>
          product.isActive !== false && product.slug.trim().length > 0 && product.name.trim().length > 0,
      ),
    [content.products],
  );

  const value = useMemo<ContentContextValue>(
    () => ({
      content,
      activeProducts,
      setHero,
      saveProduct,
      deleteProduct,
      saveService,
      deleteService,
      saveReview,
      deleteReview,
      saveBrand,
      deleteBrand,
      saveOil,
      deleteOil,
      resetContent,
    }),
    [
      activeProducts,
      content,
      deleteBrand,
      deleteOil,
      deleteProduct,
      deleteReview,
      deleteService,
      resetContent,
      saveBrand,
      saveOil,
      saveProduct,
      saveReview,
      saveService,
      setHero,
    ],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used inside ContentProvider");
  }
  return context;
}

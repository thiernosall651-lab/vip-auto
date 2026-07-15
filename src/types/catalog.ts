export type ProductCategory =
  | "engine-oil"
  | "transmission"
  | "filtration"
  | "ignition";

export type CurrencyCode = "MAD" | "XOF" | "EUR";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: string;
  compatibleBrands: string[];
  compatibleYears: number[];
  price: number;
  compareAtPrice?: number;
  currency: CurrencyCode;
  image: string;
  images?: string[];
  imageAlt: string;
  badge?: string;
  description: string;
  specifications: string[];
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive?: boolean;
  // Optional AI-assisted marketing / SEO fields (additive; safe to leave empty).
  seoTitle?: string;
  seoDescription?: string;
  longDescription?: string;
  benefits?: string[];
  keywords?: string[];
  tags?: string[];
};

export type Category = {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type VehicleBrand = {
  id: string;
  name: string;
  logo?: string;
};

export type Review = {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  city: string;
  quote: string;
};

export type Guarantee = {
  title: string;
  description: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  details: string[];
  image?: string;
};

export type OilProduct = {
  id: string;
  brand: string;
  name: string;
  grade: string;
  description: string;
  image?: string;
  badge?: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  image: string;
};

export type BrandItem = VehicleBrand & {
  logo?: string;
};

// Showcase-only oil brand (no product/price): official container photo + logo.
export type OilBrandShowcase = {
  id: string;
  name: string;
  logo: string;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ContactInfo = {
  companyName: string;
  phone: string;
  phoneSecondary: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  mapUrl: string;
};

export type ProductCategory =
  | "engine-oil"
  | "battery"
  | "braking"
  | "maintenance"
  | "mercedes"
  | "accessories";

export type CurrencyCode = "XOF" | "EUR";

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
  imageAlt: string;
  badge?: string;
  description: string;
  specifications: string[];
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
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
};

export type PartnerBrand = {
  id: string;
  name: string;
  /** Optional logo path — a real image can replace the text placeholder later. */
  logo?: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  /** Lucide icon key resolved in the UI layer. */
  icon: string;
};

export type CatalogFamily = {
  id: string;
  title: string;
  eyebrow: string;
  items: CatalogItem[];
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

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ContactInfo = {
  companyName: string;
  founder: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  mapUrl: string;
};

import { products, reviews, services, vehicleBrands } from "../../data/catalog";
import type { BrandItem, HeroContent, OilProduct, Product, Review, Service } from "../../types/catalog";

export type SiteContent = {
  hero: HeroContent;
  products: Product[];
  services: Service[];
  reviews: Review[];
  brands: BrandItem[];
  recommendedOils: OilProduct[];
};

export const defaultHero: HeroContent = {
  eyebrow: "Centre d'entretien auto à Dakar · depuis 2020",
  title: "L'entretien de votre voiture, entre de bonnes mains à Dakar.",
  subtitle:
    "Confiez votre voiture à des mécaniciens expérimentés : vidange, freinage, filtres, batterie, suspension et diagnostic. Prenez rendez-vous en 30 secondes sur WhatsApp.",
  primaryCtaLabel: "Prendre rendez-vous",
  secondaryCtaLabel: "Découvrir nos services",
  image: "/images/hero-vidange.webp",
};

export const defaultRecommendedOils: OilProduct[] = [
  {
    id: "castrol-edge",
    brand: "Castrol",
    name: "Castrol EDGE",
    grade: "5W-30 · 5W-40",
    badge: "Recommandé pro",
    description:
      "Sa technologie Fluid Titanium renforce le film d'huile sous forte pression : une protection maximale pour les moteurs modernes essence et diesel.",
    image: "/images/bidon-castrol.webp",
  },
  {
    id: "castrol-magnatec",
    brand: "Castrol",
    name: "Castrol MAGNATEC",
    grade: "5W-30 · 10W-40",
    description:
      "Ses molécules intelligentes s'accrochent au moteur dès le démarrage à froid, là où se produit la majorité de l'usure.",
    image: "/images/huile-castrol.webp",
  },
  {
    id: "valvoline-synpower",
    brand: "Valvoline",
    name: "Valvoline SynPower",
    grade: "5W-30 · 5W-40",
    badge: "Recommandé pro",
    description:
      "100 % synthétique, excellente tenue à la chaleur et forte protection anti-usure : idéale pour les conditions exigeantes de Dakar.",
    image: "/images/huile-valvoline.webp",
  },
  {
    id: "valvoline-maxlife",
    brand: "Valvoline",
    name: "Valvoline MaxLife",
    grade: "10W-40",
    description:
      "Pensée pour les moteurs à fort kilométrage : réduit la consommation d'huile et protège les joints des véhicules plus âgés.",
    image: "/images/bidon-valvoline-maxlife.webp",
  },
];

export function buildDefaultContent(): SiteContent {
  return {
    hero: { ...defaultHero },
    products: products.map((product) => ({ ...product })),
    services: services.map((service) => ({ ...service })),
    reviews: reviews.map((review) => ({ ...review })),
    brands: vehicleBrands.map((brand) => ({ ...brand })),
    recommendedOils: defaultRecommendedOils.map((oil) => ({ ...oil })),
  };
}

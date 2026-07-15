// VIP AUTO — offline content-generation engine ("AI content assistant").
//
// It writes premium, SEO- and conversion-oriented French copy for the Senegalese
// automotive market. It is deterministic and runs fully in the browser (no key,
// no external call). Product type is inferred from uploaded filenames + the
// fields the admin types. This is the single seam to swap for a Claude vision +
// text endpoint later — the admin UI stays unchanged.
import type { ProductCategory } from "../../types/catalog";

export type AutoPartType =
  | "engine-oil"
  | "transmission-oil"
  | "oil-filter"
  | "air-filter"
  | "cabin-filter"
  | "brake-pads"
  | "brake-disc"
  | "battery"
  | "spark-plug"
  | "coolant"
  | "generic";

export const partTypeOptions: { value: AutoPartType; label: string }[] = [
  { value: "engine-oil", label: "Huile moteur" },
  { value: "transmission-oil", label: "Huile de transmission" },
  { value: "oil-filter", label: "Filtre à huile" },
  { value: "air-filter", label: "Filtre à air" },
  { value: "cabin-filter", label: "Filtre d'habitacle" },
  { value: "brake-pads", label: "Plaquettes de frein" },
  { value: "brake-disc", label: "Disque de frein" },
  { value: "battery", label: "Batterie" },
  { value: "spark-plug", label: "Bougie d'allumage" },
  { value: "coolant", label: "Liquide de refroidissement" },
  { value: "generic", label: "Pièce / accessoire auto" },
];

const MAJOR_BRANDS = [
  "Toyota",
  "Hyundai",
  "Kia",
  "Renault",
  "Peugeot",
  "Nissan",
  "Ford",
  "Volkswagen",
  "Mercedes-Benz",
  "BMW",
];

type Profile = {
  label: string;
  category: ProductCategory;
  descriptor: string;
  features: string[];
  benefits: string[];
  keywords: string[];
  tags: string[];
  priceRange: [number, number];
};

const profiles: Record<AutoPartType, Profile> = {
  "engine-oil": {
    label: "Huile moteur",
    category: "engine-oil",
    descriptor: "une lubrification optimale et une protection durable du moteur, même sous la chaleur de Dakar",
    features: [
      "Formule synthétique haute performance",
      "Excellente tenue à haute température",
      "Protection anti-usure renforcée",
      "Compatible moteurs essence et diesel",
    ],
    benefits: [
      "Prolonge la durée de vie du moteur",
      "Réduit la consommation de carburant",
      "Assure des démarrages plus souples",
      "Espace les réparations imprévues",
    ],
    keywords: ["huile moteur", "vidange dakar", "lubrifiant synthétique", "5w-40", "entretien moteur"],
    tags: ["huile", "vidange", "moteur", "entretien"],
    priceRange: [12000, 30000],
  },
  "transmission-oil": {
    label: "Huile de transmission",
    category: "transmission",
    descriptor: "des passages de vitesses souples et une boîte protégée dans la durée",
    features: [
      "Fluide adapté aux boîtes automatiques et CVT",
      "Stabilité thermique élevée",
      "Anti-usure et anti-shudder",
      "Spécifications constructeur respectées",
    ],
    benefits: [
      "Boîte de vitesses plus douce",
      "Prolonge la durée de vie de la transmission",
      "Évite les à-coups au passage des rapports",
      "Protège contre la surchauffe",
    ],
    keywords: ["huile transmission", "atf dakar", "boite automatique", "cvt", "vidange boite"],
    tags: ["transmission", "boite", "atf", "entretien"],
    priceRange: [6000, 18000],
  },
  "oil-filter": {
    label: "Filtre à huile",
    category: "filtration",
    descriptor: "une huile propre et un moteur protégé des impuretés à chaque vidange",
    features: ["Média filtrant haute capacité", "Joint d'étanchéité inclus", "Montage rapide", "Qualité d'origine"],
    benefits: [
      "Retient les impuretés du moteur",
      "Prolonge la propreté de l'huile",
      "Protège les pièces internes",
      "Indispensable à chaque vidange",
    ],
    keywords: ["filtre a huile", "filtration moteur", "vidange dakar", "entretien"],
    tags: ["filtre", "filtration", "vidange"],
    priceRange: [3000, 9000],
  },
  "air-filter": {
    label: "Filtre à air",
    category: "filtration",
    descriptor: "un moteur qui respire mieux et une combustion optimisée",
    features: ["Filtration fine des poussières", "Débit d'air optimisé", "Adapté au climat poussiéreux", "Montage simple"],
    benefits: [
      "Améliore les performances moteur",
      "Réduit la consommation",
      "Protège le moteur de la poussière",
      "Facile à remplacer à l'entretien",
    ],
    keywords: ["filtre a air", "filtration", "performance moteur", "dakar"],
    tags: ["filtre", "air", "filtration"],
    priceRange: [3500, 10000],
  },
  "cabin-filter": {
    label: "Filtre d'habitacle",
    category: "filtration",
    descriptor: "un air plus sain dans l'habitacle et une climatisation plus efficace",
    features: ["Filtre anti-pollen et poussière", "Améliore la qualité de l'air", "Compatible climatisation", "Remplacement rapide"],
    benefits: [
      "Habitacle plus sain",
      "Climatisation plus performante",
      "Réduit les mauvaises odeurs",
      "Confort de conduite amélioré",
    ],
    keywords: ["filtre habitacle", "filtre pollen", "climatisation", "air habitacle"],
    tags: ["filtre", "habitacle", "climatisation"],
    priceRange: [4000, 12000],
  },
  "brake-pads": {
    label: "Plaquettes de frein",
    category: "filtration",
    descriptor: "un freinage sûr et progressif, essentiel à votre sécurité",
    features: ["Garniture haute résistance", "Freinage progressif et silencieux", "Faible usure des disques", "Montage à l'atelier"],
    benefits: [
      "Distances de freinage réduites",
      "Sécurité renforcée",
      "Freinage silencieux",
      "Durée de vie optimisée",
    ],
    keywords: ["plaquettes de frein", "freinage dakar", "securite", "freins"],
    tags: ["freins", "plaquettes", "securite"],
    priceRange: [12000, 35000],
  },
  "brake-disc": {
    label: "Disque de frein",
    category: "filtration",
    descriptor: "un freinage stable, sans vibration, pour une conduite en confiance",
    features: ["Acier haute qualité", "Dissipation thermique efficace", "Anti-corrosion", "Compatibilité vérifiée"],
    benefits: ["Freinage sans vibration", "Meilleure dissipation de la chaleur", "Sécurité accrue", "Longévité renforcée"],
    keywords: ["disque de frein", "freinage", "securite", "dakar"],
    tags: ["freins", "disque", "securite"],
    priceRange: [15000, 45000],
  },
  battery: {
    label: "Batterie",
    category: "engine-oil",
    descriptor: "des démarrages fiables, sans crainte de tomber en panne",
    features: ["Forte puissance de démarrage", "Adaptée au climat chaud", "Sans entretien", "Longue durée de vie"],
    benefits: [
      "Démarrages fiables au quotidien",
      "Résiste à la chaleur de Dakar",
      "Alimente vos équipements",
      "Tranquillité d'esprit",
    ],
    keywords: ["batterie voiture", "demarrage", "batterie dakar", "12v"],
    tags: ["batterie", "demarrage", "electrique"],
    priceRange: [35000, 90000],
  },
  "spark-plug": {
    label: "Bougie d'allumage",
    category: "ignition",
    descriptor: "un allumage précis, une combustion optimisée et une conduite plus souple",
    features: ["Électrode de précision", "Allumage fiable", "Longue durée de vie", "Compatible moteurs essence"],
    benefits: [
      "Démarrages faciles",
      "Réduit la consommation",
      "Moteur plus souple",
      "Moins d'à-coups",
    ],
    keywords: ["bougie allumage", "allumage", "iridium", "entretien moteur"],
    tags: ["bougie", "allumage", "ignition"],
    priceRange: [4000, 14000],
  },
  coolant: {
    label: "Liquide de refroidissement",
    category: "engine-oil",
    descriptor: "un moteur protégé de la surchauffe, indispensable sous le climat sénégalais",
    features: ["Protection anti-surchauffe", "Anti-corrosion", "Prêt à l'emploi", "Compatible tous circuits"],
    benefits: [
      "Évite la surchauffe moteur",
      "Protège le circuit de refroidissement",
      "Adapté aux fortes chaleurs",
      "Prolonge la vie du moteur",
    ],
    keywords: ["liquide refroidissement", "antigel", "surchauffe", "moteur"],
    tags: ["refroidissement", "moteur", "entretien"],
    priceRange: [4000, 12000],
  },
  generic: {
    label: "Pièce auto",
    category: "engine-oil",
    descriptor: "fiabilité et qualité pour l'entretien de votre véhicule",
    features: ["Qualité contrôlée", "Sélectionnée par VIP AUTO", "Compatibilité vérifiée", "Disponible à l'atelier"],
    benefits: ["Fiabilité assurée", "Entretien facilité", "Bon rapport qualité-prix", "Conseil d'expert"],
    keywords: ["piece auto", "entretien", "vip auto dakar"],
    tags: ["piece", "auto", "entretien"],
    priceRange: [5000, 25000],
  },
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function detectType(hints: { fileNames?: string[]; name?: string; brand?: string }): AutoPartType {
  const hay = normalize([...(hints.fileNames ?? []), hints.name ?? "", hints.brand ?? ""].join(" "));
  const has = (keywords: string[]): boolean => keywords.some((keyword) => hay.includes(keyword));

  if (has(["habitacle", "cabin", "pollen"])) return "cabin-filter";
  if (has(["filtre a air", "filtre-air", "air filter", "filtreair"]) || (has(["filtre", "filter"]) && has(["air"])))
    return "air-filter";
  if (has(["filtre", "filter"])) return "oil-filter";
  if (has(["transmission", "atf", "cvt", "dexron", "boite"])) return "transmission-oil";
  if (has(["huile", "oil", "lubrifiant", "5w", "10w", "15w", "sae", "vidange"])) return "engine-oil";
  if (has(["plaquette", "brake pad", "frein"]) && !has(["disque", "rotor"])) return "brake-pads";
  if (has(["disque", "rotor", "brake disc"])) return "brake-disc";
  if (has(["batterie", "battery"])) return "battery";
  if (has(["bougie", "spark", "plug", "ngk", "iridium", "allumage"])) return "spark-plug";
  if (has(["liquide", "coolant", "refroidissement", "antigel", "glycol"])) return "coolant";
  return "generic";
}

export type GeneratedProduct = {
  name: string;
  brand: string;
  category: ProductCategory;
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  compatibleBrands: string[];
  altText: string;
  keywords: string[];
  tags: string[];
  priceRange: string;
  suggestedPrice: number;
};

export function generateProduct(input: { type: AutoPartType; brand?: string; name?: string }): GeneratedProduct {
  const profile = profiles[input.type];
  const brand = (input.brand ?? "").trim();
  const baseName = (input.name ?? "").trim() || `${brand ? `${brand} ` : ""}${profile.label}`;
  const [low, high] = profile.priceRange;
  const suggestedPrice = Math.round((low + high) / 2 / 500) * 500;

  return {
    name: baseName,
    brand: brand || "VIP AUTO",
    category: profile.category,
    seoTitle: `${baseName} à Dakar | ${profile.label} — VIP AUTO`,
    seoDescription: `${baseName} chez VIP AUTO à Dakar : ${profile.descriptor}. Conseil d'expert, installation à l'atelier et paiement Wave, Orange Money ou espèces.`,
    shortDescription: `${baseName} — pour ${profile.descriptor}. Sélectionné par VIP AUTO pour sa fiabilité et sa qualité.`,
    longDescription: `${baseName} vous garantit ${profile.descriptor}. Chez VIP AUTO, nous ne proposons que des pièces et produits fiables, adaptés aux conditions de conduite au Sénégal. Nos mécaniciens à Dakar peuvent l'installer lors de votre rendez-vous et vous conseiller sur l'entretien de votre véhicule. Devis clair avant toute intervention, et paiement à l'atelier.`,
    features: profile.features,
    benefits: profile.benefits,
    compatibleBrands: MAJOR_BRANDS.slice(0, 8),
    altText: `${baseName} — ${profile.label} disponible chez VIP AUTO à Dakar`,
    keywords: [...profile.keywords, brand].filter(Boolean).map((keyword) => keyword.toLowerCase()),
    tags: profile.tags,
    priceRange: `${formatFcfa(low)} – ${formatFcfa(high)}`,
    suggestedPrice,
  };
}

export type GeneratedService = {
  name: string;
  headline: string;
  description: string;
  benefits: string[];
  seoTitle: string;
  seoDescription: string;
  faq: { question: string; answer: string }[];
  whatsappCtas: string[];
};

export function generateService(input: { name?: string; topic?: string }): GeneratedService {
  const subject = (input.name ?? input.topic ?? "").trim() || "l'entretien de votre véhicule";
  const lower = subject.charAt(0).toLowerCase() + subject.slice(1);

  return {
    name: (input.name ?? "").trim() || capitalize(subject),
    headline: `${capitalize(subject)} à Dakar, par des mécaniciens de confiance`,
    description: `Confiez ${lower} à l'atelier VIP AUTO à Dakar. Nos mécaniciens qualifiés interviennent avec sérieux et transparence : diagnostic précis, pièces de qualité et devis clair validé avec vous avant toute intervention. Vous repartez l'esprit tranquille, avec un véhicule entretenu dans les règles.`,
    benefits: [
      "Mécaniciens qualifiés et expérimentés",
      "Devis transparent avant intervention",
      "Pièces et produits de qualité",
      "Paiement à l'atelier (espèces, Wave, Orange Money)",
    ],
    seoTitle: `${capitalize(subject)} à Dakar | VIP AUTO`,
    seoDescription: `${capitalize(subject)} chez VIP AUTO à Dakar : mécaniciens qualifiés, devis transparent et travail soigné. Prenez rendez-vous en ligne sur WhatsApp.`,
    faq: [
      {
        question: `Combien coûte ${lower} ?`,
        answer: "Le tarif dépend de votre véhicule. Nous établissons un devis clair et validé avec vous avant toute intervention, sans mauvaise surprise.",
      },
      {
        question: "Faut-il prendre rendez-vous ?",
        answer: "Oui, pour vous garantir une prise en charge rapide. Réservez en quelques secondes sur WhatsApp et nous confirmons le créneau.",
      },
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Le paiement se fait à l'atelier, en espèces, par Wave ou par Orange Money, une fois la prestation terminée.",
      },
    ],
    whatsappCtas: [
      `Bonjour VIP AUTO, je souhaite un rendez-vous pour ${lower}.`,
      `📅 Réservez ${lower} à Dakar — réponse rapide sur WhatsApp !`,
      `Besoin de ${lower} ? Écrivez-nous sur WhatsApp, on s'occupe de tout.`,
    ],
  };
}

export type GeneratedHomepage = {
  headlines: string[];
  subtitles: string[];
  ctas: string[];
  banners: string[];
  campaigns: { title: string; body: string }[];
};

export function generateHomepage(input: { theme?: string }): GeneratedHomepage {
  const theme = (input.theme ?? "").trim();
  const themeSuffix = theme ? ` — ${theme}` : "";

  return {
    headlines: [
      "L'entretien de votre voiture, entre de bonnes mains à Dakar.",
      "VIP AUTO : votre garage de confiance depuis 2020.",
      `Votre véhicule mérite le meilleur entretien${themeSuffix}.`,
    ],
    subtitles: [
      "Vidange, freinage, filtres, batterie, suspension et diagnostic par des mécaniciens expérimentés. Rendez-vous en 30 secondes sur WhatsApp.",
      "Un atelier sérieux, un devis transparent et des pièces de qualité. Prenez rendez-vous dès aujourd'hui.",
      "Confiez votre voiture à une équipe de confiance à Dakar. Diagnostic précis, travail soigné, paiement à l'atelier.",
    ],
    ctas: ["Prendre rendez-vous", "Réserver mon entretien", "Demander un devis"],
    banners: [
      "🔧 Entretien complet à Dakar — prenez rendez-vous sur WhatsApp !",
      "✅ Devis clair avant toute intervention. Votre confiance, notre priorité.",
      `🚗 ${theme || "Offre du moment"} : réservez votre passage à l'atelier dès maintenant.`,
    ],
    campaigns: [
      {
        title: theme ? `Campagne : ${theme}` : "Campagne hivernage",
        body: "Avant les grandes pluies, faites contrôler freins, essuie-glaces et batterie chez VIP AUTO. Prenez rendez-vous sur WhatsApp et roulez en toute sécurité.",
      },
      {
        title: "Campagne vidange",
        body: "Offrez une vidange de qualité à votre moteur : huile premium (Castrol, Valvoline) et filtre changés dans les règles. Réservez à l'atelier VIP AUTO, Dakar.",
      },
    ],
  };
}

export type MarketingKind =
  | "product-desc"
  | "service-desc"
  | "seo"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "gbp"
  | "banner"
  | "headline"
  | "cta";

export const marketingKinds: { value: MarketingKind; label: string }[] = [
  { value: "product-desc", label: "Description produit" },
  { value: "service-desc", label: "Description service" },
  { value: "seo", label: "Contenu SEO (titre + méta)" },
  { value: "facebook", label: "Post Facebook" },
  { value: "instagram", label: "Légende Instagram" },
  { value: "whatsapp", label: "Promotion WhatsApp" },
  { value: "gbp", label: "Post Google Business" },
  { value: "banner", label: "Bannière promotionnelle" },
  { value: "headline", label: "Titre marketing" },
  { value: "cta", label: "Texte de CTA" },
];

export function generateMarketing(kind: MarketingKind, rawTopic: string): string {
  const topic = rawTopic.trim() || "l'entretien de votre véhicule";
  const lower = topic.charAt(0).toLowerCase() + topic.slice(1);
  const cap = capitalize(topic);

  switch (kind) {
    case "product-desc":
      return `${cap} — sélectionné par VIP AUTO pour sa fiabilité et sa qualité. Adapté aux conditions de conduite à Dakar, installation possible à l'atelier lors de votre rendez-vous. Conseil d'expert et paiement Wave, Orange Money ou espèces.`;
    case "service-desc":
      return `Confiez ${lower} à VIP AUTO, votre atelier de confiance à Dakar. Mécaniciens qualifiés, devis transparent avant intervention et travail soigné. Prenez rendez-vous en quelques secondes sur WhatsApp.`;
    case "seo":
      return `Titre SEO : ${cap} à Dakar | VIP AUTO\nMéta-description : ${cap} chez VIP AUTO à Dakar : mécaniciens qualifiés, pièces de qualité et devis transparent. Rendez-vous rapide sur WhatsApp, paiement à l'atelier.`;
    case "facebook":
      return `🔧 ${cap} chez VIP AUTO, votre garage de confiance à Dakar !\n\nDes mécaniciens expérimentés, un devis clair avant toute intervention et des pièces de qualité. Votre voiture mérite le meilleur. 🚗✨\n\n📍 Liberté 6, Dakar\n📲 Prenez rendez-vous sur WhatsApp\n\n#VIPAUTO #Dakar #Sénégal #EntretienAuto #Mécanique`;
    case "instagram":
      return `${cap} ✨🔧\nVotre voiture entre de bonnes mains à Dakar. Devis transparent, travail soigné. 🚗\n📲 Rendez-vous sur WhatsApp (lien en bio)\n.\n.\n#VIPAUTO #Dakar #Senegal #Garage #EntretienAuto #Mecanique #Voiture`;
    case "whatsapp":
      return `🚗 *VIP AUTO — ${cap}*\nBonjour ! Profitez de ${lower} dans notre atelier à Dakar (Liberté 6). Devis clair, pièces de qualité, paiement à l'atelier.\n👉 Répondez à ce message pour réserver votre créneau.`;
    case "gbp":
      return `${cap} chez VIP AUTO, Dakar. Notre équipe de mécaniciens qualifiés prend soin de votre véhicule avec un devis transparent et des pièces de qualité. Prenez rendez-vous dès aujourd'hui — paiement à l'atelier (espèces, Wave, Orange Money).`;
    case "banner":
      return `🔧 ${cap} à Dakar — Rendez-vous rapide sur WhatsApp. Devis clair, travail soigné.`;
    case "headline":
      return `${cap} : la confiance d'un atelier professionnel à Dakar.`;
    case "cta":
      return "Prendre rendez-vous · Réserver mon entretien · Demander un devis · Écrire sur WhatsApp";
    default:
      return cap;
  }
}

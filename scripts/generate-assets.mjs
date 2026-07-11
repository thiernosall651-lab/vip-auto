import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("public/images");

const assets = [
  {
    fileName: "hero-workshop.webp",
    width: 1600,
    height: 1000,
    title: "AUTO PARTS",
    subtitle: "Workshop · Stock · Delivery",
    theme: "workshop",
  },
  {
    fileName: "about-counter.webp",
    width: 900,
    height: 650,
    title: "PARTS COUNTER",
    subtitle: "Verified references",
    theme: "counter",
  },
  {
    fileName: "category-engine-oil.webp",
    width: 700,
    height: 520,
    title: "ENGINE OIL",
    subtitle: "5W-30 · 5W-40",
    theme: "oil",
  },
  {
    fileName: "category-battery.webp",
    width: 700,
    height: 520,
    title: "BATTERIES",
    subtitle: "Start power",
    theme: "battery",
  },
  {
    fileName: "category-braking.webp",
    width: 700,
    height: 520,
    title: "BRAKING",
    subtitle: "Pads · Discs",
    theme: "braking",
  },
  {
    fileName: "category-maintenance.webp",
    width: 700,
    height: 520,
    title: "SERVICE",
    subtitle: "Filters · Additives",
    theme: "maintenance",
  },
  {
    fileName: "category-mercedes.webp",
    width: 700,
    height: 520,
    title: "PREMIUM",
    subtitle: "Mercedes compatible",
    theme: "premium",
  },
  {
    fileName: "product-oil-pack.webp",
    width: 640,
    height: 480,
    title: "OIL PACK",
    subtitle: "Oil + filters",
    theme: "oilPack",
  },
  {
    fileName: "product-mercedes-oil.webp",
    width: 640,
    height: 480,
    title: "5W-40",
    subtitle: "Premium oil",
    theme: "oil",
  },
  {
    fileName: "product-additive.webp",
    width: 640,
    height: 480,
    title: "ADDITIVE",
    subtitle: "Engine care",
    theme: "additive",
  },
  {
    fileName: "product-battery.webp",
    width: 640,
    height: 480,
    title: "74Ah",
    subtitle: "Battery",
    theme: "battery",
  },
  {
    fileName: "product-brake-pads.webp",
    width: 640,
    height: 480,
    title: "BRAKE PADS",
    subtitle: "Front axle",
    theme: "braking",
  },
  {
    fileName: "product-brake-cleaner.webp",
    width: 640,
    height: 480,
    title: "CLEANER",
    subtitle: "Fast dry",
    theme: "cleaner",
  },
];

const palettes = {
  workshop: ["#101827", "#334155", "#dc2626", "#f59e0b"],
  counter: ["#111827", "#475569", "#e5e7eb", "#dc2626"],
  oil: ["#111827", "#1f2937", "#f59e0b", "#f8fafc"],
  battery: ["#111827", "#1f2937", "#22c55e", "#e5e7eb"],
  braking: ["#111827", "#374151", "#dc2626", "#e5e7eb"],
  maintenance: ["#111827", "#334155", "#0ea5e9", "#e5e7eb"],
  premium: ["#111827", "#475569", "#f59e0b", "#f8fafc"],
  oilPack: ["#111827", "#1f2937", "#dc2626", "#f59e0b"],
  additive: ["#111827", "#334155", "#06b6d4", "#f8fafc"],
  cleaner: ["#111827", "#475569", "#dc2626", "#f8fafc"],
};

function renderProductShape(theme, width, height) {
  const centerX = width * 0.5;
  const baseY = height * 0.7;

  if (theme === "battery") {
    return `
      <rect x="${centerX - 170}" y="${baseY - 130}" width="340" height="190" rx="20" fill="#111827"/>
      <rect x="${centerX - 125}" y="${baseY - 165}" width="70" height="38" rx="8" fill="#22c55e"/>
      <rect x="${centerX + 55}" y="${baseY - 165}" width="70" height="38" rx="8" fill="#dc2626"/>
      <rect x="${centerX - 130}" y="${baseY - 60}" width="260" height="55" rx="10" fill="#f8fafc" opacity="0.92"/>
    `;
  }

  if (theme === "braking") {
    return `
      <circle cx="${centerX - 70}" cy="${baseY - 40}" r="105" fill="#d1d5db"/>
      <circle cx="${centerX - 70}" cy="${baseY - 40}" r="42" fill="#111827"/>
      <rect x="${centerX + 40}" y="${baseY - 130}" width="110" height="210" rx="24" fill="#dc2626"/>
      <rect x="${centerX + 68}" y="${baseY - 98}" width="54" height="146" rx="15" fill="#7f1d1d"/>
    `;
  }

  if (theme === "cleaner" || theme === "additive") {
    return `
      <rect x="${centerX - 80}" y="${baseY - 230}" width="160" height="280" rx="26" fill="#f8fafc"/>
      <rect x="${centerX - 55}" y="${baseY - 270}" width="110" height="55" rx="12" fill="#111827"/>
      <rect x="${centerX - 62}" y="${baseY - 96}" width="124" height="70" rx="14" fill="${theme === "cleaner" ? "#dc2626" : "#06b6d4"}"/>
    `;
  }

  if (theme === "oil" || theme === "oilPack" || theme === "maintenance" || theme === "premium") {
    return `
      <path d="M ${centerX - 125} ${baseY + 55} L ${centerX - 105} ${baseY - 135} Q ${centerX - 95} ${baseY - 200} ${centerX - 35} ${baseY - 210} L ${centerX + 70} ${baseY - 210} Q ${centerX + 135} ${baseY - 205} ${centerX + 145} ${baseY - 135} L ${centerX + 165} ${baseY + 55} Z" fill="#f8fafc"/>
      <rect x="${centerX - 45}" y="${baseY - 250}" width="105" height="52" rx="12" fill="#111827"/>
      <rect x="${centerX - 88}" y="${baseY - 92}" width="205" height="82" rx="16" fill="${theme === "oilPack" ? "#dc2626" : "#f59e0b"}"/>
      <rect x="${centerX - 230}" y="${baseY - 35}" width="92" height="105" rx="14" fill="#e5e7eb" opacity="${theme === "oilPack" || theme === "maintenance" ? "1" : "0"}"/>
    `;
  }

  return `
    <rect x="${centerX - 150}" y="${baseY - 150}" width="300" height="230" rx="28" fill="#f8fafc"/>
  `;
}

function renderAsset(asset) {
  const [bg, panel, accent, text] = palettes[asset.theme];
  const productShape = renderProductShape(asset.theme, asset.width, asset.height);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${asset.width}" height="${asset.height}" viewBox="0 0 ${asset.width} ${asset.height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="1" stop-color="${panel}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#020617" flood-opacity="0.35"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="${asset.width * 0.82}" cy="${asset.height * 0.18}" r="${asset.width * 0.18}" fill="${accent}" opacity="0.18"/>
      <circle cx="${asset.width * 0.12}" cy="${asset.height * 0.88}" r="${asset.width * 0.22}" fill="#ffffff" opacity="0.08"/>
      <g filter="url(#shadow)">
        ${productShape}
      </g>
      <rect x="${asset.width * 0.08}" y="${asset.height * 0.1}" width="${asset.width * 0.48}" height="${asset.height * 0.17}" rx="18" fill="#ffffff" opacity="0.92"/>
      <text x="${asset.width * 0.11}" y="${asset.height * 0.17}" fill="#111827" font-family="Inter, Arial, sans-serif" font-size="${asset.width * 0.045}" font-weight="900">${asset.title}</text>
      <text x="${asset.width * 0.11}" y="${asset.height * 0.23}" fill="#475569" font-family="Inter, Arial, sans-serif" font-size="${asset.width * 0.022}" font-weight="700">${asset.subtitle}</text>
      <rect x="${asset.width * 0.08}" y="${asset.height * 0.78}" width="${asset.width * 0.24}" height="${asset.height * 0.06}" rx="12" fill="${accent}"/>
      <text x="${asset.width * 0.1}" y="${asset.height * 0.82}" fill="${text}" font-family="Inter, Arial, sans-serif" font-size="${asset.width * 0.019}" font-weight="900">READY STOCK</text>
    </svg>
  `;
}

await mkdir(outputDir, { recursive: true });

await Promise.all(
  assets.map(async (asset) => {
    await sharp(Buffer.from(renderAsset(asset)))
      .webp({ quality: 84 })
      .toFile(path.join(outputDir, asset.fileName));
  }),
);

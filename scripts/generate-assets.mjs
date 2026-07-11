import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Premium, text-free automotive visuals.
 *
 * These are dark "studio" compositions (spotlight, metallic materials, soft
 * reflections and film grain) rendered as SVG and encoded to WebP. They are
 * intentionally photographic in feel rather than illustrative — no labels,
 * badges or captions — so a real product/workshop photo can drop in later by
 * simply replacing the file of the same name.
 */

const outputDir = path.resolve("public/images");

const assets = [
  { fileName: "hero-workshop.webp", width: 1600, height: 1200, kind: "hero", accent: "#dc2626" },
  { fileName: "about-counter.webp", width: 1000, height: 720, kind: "counter", accent: "#dc2626" },
  { fileName: "category-engine-oil.webp", width: 900, height: 675, kind: "oil", accent: "#f59e0b" },
  { fileName: "category-battery.webp", width: 900, height: 675, kind: "battery", accent: "#22c55e" },
  { fileName: "category-braking.webp", width: 900, height: 675, kind: "braking", accent: "#dc2626" },
  { fileName: "category-maintenance.webp", width: 900, height: 675, kind: "spray", accent: "#38bdf8" },
  { fileName: "category-mercedes.webp", width: 900, height: 675, kind: "oil", accent: "#64748b" },
  { fileName: "product-oil-pack.webp", width: 900, height: 675, kind: "oil", accent: "#dc2626" },
  { fileName: "product-mercedes-oil.webp", width: 900, height: 675, kind: "oil", accent: "#f59e0b" },
  { fileName: "product-additive.webp", width: 900, height: 675, kind: "spray", accent: "#38bdf8" },
  { fileName: "product-battery.webp", width: 900, height: 675, kind: "battery", accent: "#22c55e" },
  { fileName: "product-brake-pads.webp", width: 900, height: 675, kind: "braking", accent: "#dc2626" },
  { fileName: "product-brake-cleaner.webp", width: 900, height: 675, kind: "spray", accent: "#dc2626" },
];

function sharedDefs(accent) {
  return `
    <radialGradient id="spot" cx="50%" cy="28%" r="80%">
      <stop offset="0" stop-color="#20242e"/>
      <stop offset="52%" stop-color="#0c0e13"/>
      <stop offset="100%" stop-color="#050608"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0c11"/>
      <stop offset="1" stop-color="#040507"/>
    </linearGradient>
    <radialGradient id="accentGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="whiteMetal" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="#fbfcfd"/>
      <stop offset="0.45" stop-color="#dfe3e9"/>
      <stop offset="1" stop-color="#98a0ac"/>
    </linearGradient>
    <linearGradient id="darkMetal" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" stop-color="#3a3f4b"/>
      <stop offset="0.5" stop-color="#20242d"/>
      <stop offset="1" stop-color="#0c0e13"/>
    </linearGradient>
    <linearGradient id="steelMetal" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="#eef1f4"/>
      <stop offset="0.5" stop-color="#b9c0c9"/>
      <stop offset="1" stop-color="#6b7280"/>
    </linearGradient>
    <linearGradient id="accentBand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0.75"/>
    </linearGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <filter id="cast" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="34" stdDeviation="30" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.9" intercept="-0.55"/></feComponentTransfer>
    </filter>
  `;
}

function backdrop(w, h, accent, accentPos = [0.82, 0.2]) {
  return `
    <rect width="${w}" height="${h}" fill="url(#spot)"/>
    <rect y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="url(#floor)"/>
    <rect y="${h * 0.6}" width="${w}" height="2" fill="#ffffff" opacity="0.05"/>
    <ellipse cx="${w * accentPos[0]}" cy="${h * accentPos[1]}" rx="${w * 0.42}" ry="${h * 0.42}" fill="url(#accentGlow)"/>
  `;
}

function reflection(cx, topY, baseY, halfWidth) {
  return `<ellipse cx="${cx}" cy="${baseY + 14}" rx="${halfWidth * 1.05}" ry="${(baseY - topY) * 0.09 + 10}" fill="#000000" opacity="0.5" filter="url(#soft)"/>`;
}

function bottle(cx, baseY, scale, accent) {
  const w = 150 * scale;
  const top = baseY - 300 * scale;
  return `
    ${reflection(cx, top, baseY, w)}
    <g filter="url(#cast)">
      <path d="M ${cx - w} ${baseY} L ${cx - w * 0.82} ${top + 110 * scale}
        Q ${cx - w * 0.7} ${top + 40 * scale} ${cx - w * 0.28} ${top + 30 * scale}
        L ${cx + w * 0.28} ${top + 30 * scale}
        Q ${cx + w * 0.72} ${top + 40 * scale} ${cx + w * 0.86} ${top + 110 * scale}
        L ${cx + w * 1.05} ${baseY} Z" fill="url(#whiteMetal)"/>
      <rect x="${cx - 42 * scale}" y="${top - 42 * scale}" width="${84 * scale}" height="${64 * scale}" rx="${12 * scale}" fill="#14171d"/>
      <rect x="${cx - w * 0.78} " y="${baseY - 150 * scale}" width="${w * 1.7}" height="${120 * scale}" rx="${16 * scale}" fill="url(#accentBand)"/>
      <path d="M ${cx - w * 0.7} ${baseY - 30 * scale} L ${cx - w * 0.58} ${top + 130 * scale} Q ${cx - w * 0.5} ${top + 70 * scale} ${cx - w * 0.2} ${top + 62 * scale} L ${cx - w * 0.2} ${top + 82 * scale} Q ${cx - w * 0.42} ${top + 96 * scale} ${cx - w * 0.46} ${baseY - 30 * scale} Z" fill="#ffffff" opacity="0.4"/>
    </g>
  `;
}

function spray(cx, baseY, scale, accent) {
  const w = 92 * scale;
  const top = baseY - 340 * scale;
  return `
    ${reflection(cx, top, baseY, w)}
    <g filter="url(#cast)">
      <rect x="${cx - w}" y="${top + 60 * scale}" width="${w * 2}" height="${baseY - (top + 60 * scale)}" rx="${26 * scale}" fill="url(#whiteMetal)"/>
      <rect x="${cx - w * 0.66}" y="${top}" width="${w * 1.32}" height="${74 * scale}" rx="${14 * scale}" fill="#14171d"/>
      <rect x="${cx - w * 0.24}" y="${top - 30 * scale}" width="${w * 0.48}" height="${40 * scale}" rx="${8 * scale}" fill="#20242d"/>
      <rect x="${cx - w * 0.86}" y="${baseY - 150 * scale}" width="${w * 1.72}" height="${96 * scale}" rx="${12 * scale}" fill="url(#accentBand)"/>
      <rect x="${cx - w * 0.7}" y="${top + 84 * scale}" width="${18 * scale}" height="${baseY - (top + 150 * scale)}" rx="${9 * scale}" fill="#ffffff" opacity="0.4"/>
    </g>
  `;
}

function battery(cx, baseY, scale, accent) {
  const w = 210 * scale;
  const top = baseY - 250 * scale;
  return `
    ${reflection(cx, top, baseY, w)}
    <g filter="url(#cast)">
      <rect x="${cx - w}" y="${top}" width="${w * 2}" height="${baseY - top}" rx="${24 * scale}" fill="url(#darkMetal)"/>
      <rect x="${cx - w * 0.62}" y="${top - 34 * scale}" width="${w * 0.5}" height="${44 * scale}" rx="${8 * scale}" fill="#dfe3e9"/>
      <rect x="${cx + w * 0.12}" y="${top - 34 * scale}" width="${w * 0.5}" height="${44 * scale}" rx="${8 * scale}" fill="${accent}"/>
      <rect x="${cx - w * 0.82}" y="${top + 40 * scale}" width="${w * 1.64}" height="${70 * scale}" rx="${12 * scale}" fill="#ffffff" opacity="0.06"/>
      <rect x="${cx - w * 0.82}" y="${baseY - 92 * scale}" width="${w * 1.64}" height="${44 * scale}" rx="${10 * scale}" fill="url(#accentBand)"/>
      <rect x="${cx - w}" y="${top}" width="${w * 2}" height="${18 * scale}" rx="${9 * scale}" fill="#ffffff" opacity="0.18"/>
    </g>
  `;
}

function brake(cx, baseY, scale, accent) {
  const r = 150 * scale;
  const cy = baseY - r * 0.7;
  return `
    ${reflection(cx - r * 0.35, cy - r, baseY, r)}
    <g filter="url(#cast)">
      <circle cx="${cx - r * 0.35}" cy="${cy}" r="${r}" fill="url(#steelMetal)"/>
      <circle cx="${cx - r * 0.35}" cy="${cy}" r="${r * 0.86}" fill="none" stroke="#0c0e13" stroke-width="${6 * scale}" opacity="0.5"/>
      <circle cx="${cx - r * 0.35}" cy="${cy}" r="${r * 0.4}" fill="url(#darkMetal)"/>
      <circle cx="${cx - r * 0.35}" cy="${cy}" r="${r * 0.14}" fill="#05070a"/>
      <rect x="${cx + r * 0.5}" y="${cy - r * 0.72}" width="${r * 0.62}" height="${r * 1.5}" rx="${20 * scale}" fill="url(#accentBand)"/>
      <rect x="${cx + r * 0.66}" y="${cy - r * 0.5}" width="${r * 0.3}" height="${r * 1.06}" rx="${12 * scale}" fill="#000000" opacity="0.35"/>
      <circle cx="${cx - r * 0.78}" cy="${cy - r * 0.6}" r="${r * 0.16}" fill="#ffffff" opacity="0.35"/>
    </g>
  `;
}

function carSilhouette(w, h) {
  const cx = w * 0.52;
  const baseY = h * 0.78;
  const s = w / 1600;
  return `
    <g opacity="0.16">
      <path d="M ${cx - 560 * s} ${baseY}
        Q ${cx - 540 * s} ${baseY - 70 * s} ${cx - 430 * s} ${baseY - 96 * s}
        L ${cx - 330 * s} ${baseY - 176 * s}
        Q ${cx - 250 * s} ${baseY - 236 * s} ${cx - 120 * s} ${baseY - 244 * s}
        L ${cx + 150 * s} ${baseY - 244 * s}
        Q ${cx + 320 * s} ${baseY - 240 * s} ${cx + 430 * s} ${baseY - 150 * s}
        Q ${cx + 520 * s} ${baseY - 108 * s} ${cx + 600 * s} ${baseY - 96 * s}
        Q ${cx + 660 * s} ${baseY - 84 * s} ${cx + 660 * s} ${baseY} Z"
        fill="#c9ced6"/>
    </g>
    <path d="M ${cx - 330 * s} ${baseY - 176 * s} Q ${cx - 250 * s} ${baseY - 236 * s} ${cx - 120 * s} ${baseY - 244 * s} L ${cx + 150 * s} ${baseY - 244 * s} Q ${cx + 300 * s} ${baseY - 240 * s} ${cx + 410 * s} ${baseY - 160 * s}"
      fill="none" stroke="#ffffff" stroke-width="${3 * s}" opacity="0.28" stroke-linecap="round"/>
    <circle cx="${cx - 300 * s}" cy="${baseY}" r="${86 * s}" fill="#05070a"/>
    <circle cx="${cx - 300 * s}" cy="${baseY}" r="${86 * s}" fill="none" stroke="#9aa1ac" stroke-width="${5 * s}" opacity="0.4"/>
    <circle cx="${cx + 360 * s}" cy="${baseY}" r="${86 * s}" fill="#05070a"/>
    <circle cx="${cx + 360 * s}" cy="${baseY}" r="${86 * s}" fill="none" stroke="#9aa1ac" stroke-width="${5 * s}" opacity="0.4"/>
  `;
}

function renderHero(asset) {
  const { width: w, height: h, accent } = asset;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>${sharedDefs(accent)}</defs>
      <rect width="${w}" height="${h}" fill="url(#spot)"/>
      <rect y="${h * 0.6}" width="${w}" height="${h * 0.4}" fill="url(#floor)"/>
      <ellipse cx="${w * 0.78}" cy="${h * 0.32}" rx="${w * 0.5}" ry="${h * 0.5}" fill="url(#accentGlow)"/>
      <!-- perspective floor lines for showroom depth -->
      <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="2">
        <line x1="${w * 0.5}" y1="${h * 0.6}" x2="${-w * 0.1}" y2="${h}"/>
        <line x1="${w * 0.5}" y1="${h * 0.6}" x2="${w * 0.25}" y2="${h}"/>
        <line x1="${w * 0.5}" y1="${h * 0.6}" x2="${w * 0.75}" y2="${h}"/>
        <line x1="${w * 0.5}" y1="${h * 0.6}" x2="${w * 1.1}" y2="${h}"/>
      </g>
      <rect y="${h * 0.6}" width="${w}" height="2" fill="#ffffff" opacity="0.06"/>
      ${carSilhouette(w, h)}
      <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>
      <rect width="${w}" height="${h}" fill="#05060a" opacity="0.12"/>
    </svg>
  `;
}

function renderTile(asset) {
  const { width: w, height: h, accent, kind } = asset;
  const cx = w * 0.5;
  const baseY = h * 0.74;
  const scale = (h / 675) * 1.02;
  let subject = "";

  if (kind === "battery") subject = battery(cx, baseY, scale, accent);
  else if (kind === "braking") subject = brake(cx, baseY, scale, accent);
  else if (kind === "spray") subject = spray(cx, baseY, scale, accent);
  else if (kind === "counter") subject = `${bottle(cx - w * 0.16, baseY, scale * 0.82, accent)}${spray(cx + w * 0.2, baseY, scale * 0.7, accent)}`;
  else subject = bottle(cx, baseY, scale, accent);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>${sharedDefs(accent)}</defs>
      ${backdrop(w, h, accent, [0.8, 0.22])}
      <rect y="${h * 0.6}" width="${w}" height="2" fill="#ffffff" opacity="0.06"/>
      ${subject}
      <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.45"/>
      <rect width="${w}" height="${h}" fill="#05060a" opacity="0.1"/>
    </svg>
  `;
}

await mkdir(outputDir, { recursive: true });

await Promise.all(
  assets.map(async (asset) => {
    const svg = asset.kind === "hero" ? renderHero(asset) : renderTile(asset);

    await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(path.join(outputDir, asset.fileName));
  }),
);

console.log(`Generated ${assets.length} premium assets.`);

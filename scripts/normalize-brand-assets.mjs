// Normalizes the freshly-added oil-brand assets (messy filenames, mixed
// formats: svg/jpeg/png/avif/webp — some with stray spaces or double
// extensions) into clean, optimized WebP with canonical names.
//
// - Brand logos: transparency preserved, standardized height (equal visual
//   height across the trust strip), high quality.
// - Product "bidon" photos: resized + compressed for the recommended-oils grid.
// Originals are removed only after a successful conversion.
//
// Run with: node scripts/normalize-brand-assets.mjs
import fs from "node:fs";
import { unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");

// Official oil-brand logos -> transparent WebP, equal height for the strip.
// Rendered at 2x display height so they stay crisp on retina screens.
const logos = {
  "Castrol_logo_2023.svg.webp": "logo-oil-castrol.webp",
  "Valvoline_company_logo.svg.webp": "logo-oil-valvoline.webp",
  "logo-shell.svg": "logo-oil-shell.webp",
  "logo-totalenergies.svg .jpeg": "logo-oil-totalenergies.webp",
  "logo-elf.svg": "logo-oil-elf.webp",
  "logo-liqui-moly.svg..webp": "logo-oil-liqui-moly.webp",
  "logo-mobil1.svg .png": "logo-oil-mobil1.webp",
  "logo-motul.svg .svg": "logo-oil-motul.webp",
};

// Official product photos (oil containers) -> optimized WebP.
const bidons = {
  "bidon-huile-castro.jpg": "bidon-castrol.webp",
  "bidon-valvoline.webp": "bidon-valvoline.webp",
  "valvoline-maxlife.webp (1).webp": "bidon-valvoline-maxlife.webp",
  "bidon-huile-shell.jpg": "bidon-shell.webp",
  "bidon-huile-totalenergie.png": "bidon-totalenergies.webp",
  "bidon-huile-elf.avif": "bidon-elf.webp",
  "bidon-huile-liqui-moly.jpg": "bidon-liqui-moly.webp",
  "bidon-huile-mobil-1.webp": "bidon-mobil1.webp",
  "bidon-huilemotul.jpg": "bidon-motul.webp",
};

// Junk artefacts that are not usable images.
const junk = ["logo-castrol-svg.html", "logo-valvoline.svg"];

async function convert(srcName, outName, transform) {
  const src = path.join(dir, srcName);
  if (!fs.existsSync(src)) {
    console.warn(`  skip (missing): ${srcName}`);
    return;
  }
  const out = path.join(dir, outName);
  // Convert into a temp file first so an in-place name (same src/out) is safe.
  const tmp = path.join(dir, `.__tmp__${outName}`);
  try {
    await transform(sharp(src)).toFile(tmp);
    fs.renameSync(tmp, out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`  ${srcName}  ->  ${outName} (${kb} KB)`);
    if (srcName !== outName) await unlink(src);
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    console.error(`  FAILED ${srcName}: ${err.message}`);
  }
}

console.log("Oil brand logos (transparent, equal height):");
for (const [src, out] of Object.entries(logos)) {
  await convert(src, out, (img) =>
    img
      .resize({ height: 200, fit: "inside", withoutEnlargement: false })
      .webp({ quality: 92, alphaQuality: 100, effort: 6 }),
  );
}

console.log("Oil product photos (bidons):");
for (const [src, out] of Object.entries(bidons)) {
  await convert(src, out, (img) =>
    img
      .resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 }),
  );
}

console.log("Removing junk artefacts:");
for (const name of junk) {
  const p = path.join(dir, name);
  if (fs.existsSync(p)) {
    await unlink(p);
    console.log(`  removed ${name}`);
  }
}

console.log("Done.");

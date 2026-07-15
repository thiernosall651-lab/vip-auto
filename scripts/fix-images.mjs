// One-off fix: rename the mis-named Valvoline photo, then optimize the new
// oil photos and brand logos to lightweight WebP (equal height, alpha kept).
import { rename, unlink } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");

async function safeRename(from, to) {
  try {
    await rename(path.join(dir, from), path.join(dir, to));
    console.log(`renamed ${from} -> ${to}`);
  } catch (err) {
    // ignore if source doesn't exist
  }
}

async function convertToWebp(srcName, outName, opts = {}) {
  const src = path.join(dir, srcName);
  const out = path.join(dir, outName);
  if (!fs.existsSync(src)) {
    console.warn(`source missing: ${srcName}`);
    return false;
  }

  try {
    await sharp(src)
      .resize(opts.resize || { height: 160, fit: "inside", withoutEnlargement: true })
      .webp({ quality: opts.quality ?? 86 })
      .toFile(out);

    const stat = await fs.promises.stat(out);
    console.log(`converted ${srcName} -> ${outName} (${Math.round(stat.size / 1024)} KB)`);

    // remove original only after successful conversion
    try {
      await unlink(src);
      console.log(`removed original ${srcName}`);
    } catch (e) {
      console.warn(`could not remove original ${srcName}: ${e.message}`);
    }

    return true;
  } catch (err) {
    console.error(`failed to convert ${srcName}: ${err.message}`);
    return false;
  }
}

// 1) Fix Valvoline filename with stray space
await safeRename("huile-valvoline .png", "huile-valvoline.png");

// 2) Convert oil product photos -> WebP (keep reasonably large images for product pages)
await convertToWebp("huile-castrol.png", "huile-castrol.webp", { resize: { width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }, quality: 86 });
await convertToWebp("huile-valvoline.png", "huile-valvoline.webp", { resize: { width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }, quality: 86 });

// 3) Brand logos conversion map (handles misspellings / legacy names -> canonical output)
const brandMap = {
  "bmw-logo.png": "bmw-logo.webp",
  "mercedes-besn-logo.png": "mercedes-benz-logo.webp",
  "audi-logo.png": "audi-logo.webp",
  "volvagen-logo.png": "volkswagen-logo.webp",
  "toyota-logo.png": "toyota-logo.webp",
  "hundai-logo.png": "hyundai-logo.webp",
  "kia-logo.png": "kia-logo.webp",
  "ford-logo.png": "ford-logo.webp",
  "nissan-logo.png": "nissan-logo.webp",
  "renault-logo.png": "renault-logo.webp",
};

for (const [src, out] of Object.entries(brandMap)) {
  await convertToWebp(src, out, { resize: { height: 160, fit: "inside", withoutEnlargement: true }, quality: 84 });
}

console.log("fix-images script finished.");

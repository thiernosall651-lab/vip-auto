// Production image pipeline for VIP AUTO.
// - Converts heavy product/marketing photos (PNG/JPEG, ~2 MB each) to sized WebP.
// - Trims + compresses the brand logo (kept as PNG at the path mandated by the brand docs).
// - Generates a branded favicon set from the VA monogram.
//
// Run with: node scripts/optimize-images.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.resolve("public/images");
const publicDir = path.resolve("public");

// Raster source photos referenced by the catalog / pages -> optimized WebP.
const photos = [
  "huile-shelle.png",
  "huile-65.png",
  "filtre-auto.png",
  "bougie.png",
  "huile-lukoil.png",
  "huile-330-pemco.png",
  "huile-classic.png",
  "huile-attooo.png",
  "engine-huile.jpeg",
  "huile-atf.png",
  "huile-.png",
  "huile-v8german.png",
  "bougie-land-rover.png",
  "mali-auto.png",
];

async function convertPhotos() {
  for (const file of photos) {
    const source = path.join(imagesDir, file);
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    const target = path.join(imagesDir, `${base}.webp`);
    const buffer = await readFile(source);
    const info = await sharp(buffer)
      .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(target);
    console.log(`photo  ${file} -> ${base}.webp (${Math.round(info.size / 1024)} KB)`);
  }
}

async function optimizeLogo() {
  const source = path.join(imagesDir, "logo-vip.png");
  const buffer = await readFile(source);
  const info = await sharp(buffer)
    .trim({ threshold: 20 })
    .resize({ width: 760, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(path.join(imagesDir, "logo-vip-optimized.png"));
  console.log(`logo   logo-vip.png -> logo-vip-optimized.png (${Math.round(info.size / 1024)} KB)`);
}

async function buildFavicons() {
  const monogram = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="#dc2626"/>
  <text x="50%" y="53%" dominant-baseline="central" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="228" fill="#ffffff" letter-spacing="4">VA</text>
</svg>`;

  await writeFile(path.join(publicDir, "favicon.svg"), monogram, "utf8");
  console.log("icon   favicon.svg");

  const svgBuffer = Buffer.from(monogram);
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("icon   apple-touch-icon.png (180)");
  await sharp(svgBuffer).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32.png"));
  console.log("icon   favicon-32.png (32)");
}

await convertPhotos();
await optimizeLogo();
await buildFavicons();
console.log("Done.");

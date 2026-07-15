// Normalizes the two newly-added vehicle logos to match the existing ones:
// clean optimized WebP, ~160px tall (same as toyota/bmw/etc.).
// - Mitsubishi: real transparent PNG (mislabeled .webp), 2560x1440 -> resized,
//   transparency preserved.
// - Peugeot: lossy WebP with a faint baked-in checkerboard (no alpha). Light
//   pixels are clamped to pure white so it sits cleanly on the white marquee
//   (consistent with the other opaque logos like BMW).
//
// Run with: node scripts/integrate-vehicle-logos.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");
const HEIGHT = 160;

async function writeWebp(name, pipeline) {
  const out = path.join(dir, name);
  const tmp = path.join(dir, `.__tmp__${name}`);
  await pipeline.toFile(tmp);
  fs.renameSync(tmp, out);
  console.log(`  ${name} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
}

// Mitsubishi — keep alpha, just resize + compress.
await writeWebp(
  "mitsubishi-logo.webp",
  sharp(path.join(dir, "mitsubishi-logo.webp"))
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 }),
);

// Peugeot — clamp near-white pixels to pure white to remove the faint
// checkerboard, then encode. No alpha needed (white on white marquee).
{
  const { data, info } = await sharp(path.join(dir, "peugeot-logo.webp"))
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i] > 210 && data[i + 1] > 210 && data[i + 2] > 210) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  await writeWebp(
    "peugeot-logo.webp",
    sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).webp({
      quality: 90,
      effort: 6,
    }),
  );
}

console.log("Done.");

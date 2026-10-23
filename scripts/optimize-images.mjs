// Gera versões WebP em vários tamanhos das imagens usadas com next/image.
// Necessário porque o site é exportado como estático (Netlify Drop), sem o
// otimizador de imagens do servidor do Next. Roda sozinho antes do build.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

import sharp from "sharp";

const PUBLIC = "public";
const OUT_DIR = join(PUBLIC, "_img");
// Mesmos tamanhos que o next/image pede por padrão (deviceSizes + imageSizes)
const WIDTHS = [32, 64, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 2560];
const SOURCES = ["logo-atlas.png", ...readdirSync(join(PUBLIC, "atlas")).map((f) => `atlas/${f}`)]
  .filter((f) => extname(f) === ".png");

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const manifest = {};
for (const file of SOURCES) {
  const input = join(PUBLIC, file);
  const { width } = await sharp(input).metadata();
  const slug = file.replace(/\//g, "-").replace(/\.png$/, "");
  const widths = WIDTHS.filter((w) => w < width).concat(width);
  for (const w of widths) {
    await sharp(input)
      .resize({ width: w })
      .webp({ quality: 78 })
      .toFile(join(OUT_DIR, `${slug}-${w}.webp`));
  }
  manifest[`/${file}`] = { slug, widths };
  console.log(`${basename(file)}: ${widths.length} tamanhos`);
}

writeFileSync("lib/image-manifest.json", JSON.stringify(manifest, null, 2));

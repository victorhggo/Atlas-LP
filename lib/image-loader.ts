// Loader do next/image para o site estático: aponta para os WebP gerados
// por scripts/optimize-images.mjs, no menor tamanho que cobre a largura pedida.
import manifest from "./image-manifest.json";

type Manifest = Record<string, { slug: string; widths: number[] }>;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const entry = (manifest as Manifest)[src];
  if (!entry) return src;
  const best =
    entry.widths.find((w) => w >= width) ??
    entry.widths[entry.widths.length - 1];
  return `/_img/${entry.slug}-${best}.webp`;
}

import { join } from "node:path";
import sharp from "sharp";

type PublicImageMetadata = {
  width?: number;
  height?: number;
};

const metadataCache = new Map<string, Promise<PublicImageMetadata>>();

export function getPublicImageMetadata(src: string): Promise<PublicImageMetadata> {
  if (!src.startsWith("/") || src.startsWith("//")) return Promise.resolve({});

  const cached = metadataCache.get(src);
  if (cached) return cached;

  const pending = sharp(join(process.cwd(), "public", src.replace(/^\/+/, "")))
    .metadata()
    .then(({ width, height }) => ({ width, height }));

  metadataCache.set(src, pending);
  return pending;
}

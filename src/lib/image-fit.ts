import imageDimensions from "@/data/image-dimensions.json";

const dimensions: Record<string, number[]> = imageDimensions;

/**
 * Fracción de la foto que puede quedar fuera del marco al llenarlo.
 * `tall`: foto más alta que el marco (se recorta pared/piso arriba y abajo).
 * `wide`: foto más ancha que el marco (se recortan los costados, donde suele estar el mueble).
 */
export type MaxCrop = number | { tall: number; wide: number };

const DEFAULT_MAX_CROP: MaxCrop = { tall: 0.34, wide: 0.12 };

export function getImageDimensions(src: string): [number, number] | undefined {
  const size = dimensions[src];
  return size ? [size[0], size[1]] : undefined;
}

/**
 * "cover" si llenar el marco recorta como mucho lo permitido por `maxCrop`;
 * si no, "contain" para no dejar fuera parte del mueble. Sin medidas conocidas: "contain".
 */
export function imageFitForFrame(src: string, frameRatio = 1, maxCrop: MaxCrop = DEFAULT_MAX_CROP): "cover" | "contain" {
  const size = dimensions[src];
  if (!size) return "contain";
  const relative = size[0] / size[1] / frameRatio;
  const cropped = 1 - Math.min(relative, 1 / relative);
  const limit = typeof maxCrop === "number" ? maxCrop : relative < 1 ? maxCrop.tall : maxCrop.wide;
  return cropped <= limit ? "cover" : "contain";
}

/** Marco de escritorio para una galería: 4:3 si la mayoría de las fotos son horizontales, cuadrado si no. */
export function galleryFrameRatio(srcs: string[]): number {
  const known = srcs.map((src) => dimensions[src]).filter(Boolean);
  const wide = known.filter(([w, h]) => w / h > 1.15).length;
  return known.length > 0 && wide > known.length / 2 ? 4 / 3 : 1;
}

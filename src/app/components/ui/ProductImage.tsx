import Image from "next/image";
import { imageFitForFrame, type MaxCrop } from "@/lib/image-fit";

type FrameRatio = number | { base: number; sm: number };

type ProductImageProps = {
  src: string;
  alt: string;
  sizes: string;
  /** Proporción ancho/alto del marco (1 = cuadrado); puede cambiar desde `sm`. */
  frameRatio?: FrameRatio;
  /** Recorte aceptado para llenar el marco; por defecto 34% en fotos altas y 12% en anchas. */
  maxCrop?: MaxCrop;
  priority?: boolean;
  className?: string;
};

/**
 * Foto de producto dentro de un marco `relative` con proporción fija.
 * Si la foto calza con el marco, lo llena; si no, se muestra completa sobre
 * un fondo con la misma foto desenfocada, para no cortar el mueble ni dejar franjas vacías.
 */
export default function ProductImage({
  src,
  alt,
  sizes,
  frameRatio = 1,
  maxCrop,
  priority = false,
  className = "",
}: ProductImageProps) {
  const ratios = typeof frameRatio === "number" ? { base: frameRatio, sm: frameRatio } : frameRatio;
  const coverBase = imageFitForFrame(src, ratios.base, maxCrop) === "cover";
  const coverSm = imageFitForFrame(src, ratios.sm, maxCrop) === "cover";
  const loading = priority ? ({ priority: true } as const) : ({ loading: "lazy" } as const);
  const fit = `${coverBase ? "object-cover" : "object-contain"} ${coverSm ? "sm:object-cover" : "sm:object-contain"}`;

  return (
    <>
      {!(coverBase && coverSm) && (
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="64px"
          quality={40}
          loading="lazy"
          className={`scale-110 object-cover opacity-60 blur-2xl ${coverBase ? "hidden" : "block"} ${coverSm ? "sm:hidden" : "sm:block"}`}
        />
      )}
      <Image src={src} alt={alt} fill sizes={sizes} className={`${fit} ${className}`} {...loading} />
    </>
  );
}

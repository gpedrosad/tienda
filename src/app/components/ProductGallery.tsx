"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductImage from "@/app/components/ui/ProductImage";
import { galleryFrameRatio, getImageDimensions } from "@/lib/image-fit";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  imageAlt?: string;
}

/** Evita estirar en el visor fotos de baja resolución más allá de su tamaño real. */
function lightboxMaxSize(src: string) {
  const size = getImageDimensions(src);
  return size ? { maxWidth: `min(64rem, ${size[0]}px)`, maxHeight: `${size[1]}px` } : undefined;
}

export default function ProductGallery({ images, productName, imageAlt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const mainTrackRef = useRef<HTMLDivElement>(null);
  const baseAlt = imageAlt || productName;
  const desktopRatio = galleryFrameRatio(images);
  const altFor = (index: number) =>
    images.length > 1 ? `${baseAlt}, foto ${index + 1} de ${images.length}` : baseAlt;

  const goToSlide = useCallback((index: number) => {
    const track = mainTrackRef.current;
    if (!track) {
      setActiveIndex(index);
      return;
    }

    const slideWidth = track.clientWidth;
    track.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  const handleMainScroll = useCallback(() => {
    const track = mainTrackRef.current;
    if (!track) return;

    const slideWidth = track.clientWidth;
    if (!slideWidth) return;

    const nextIndex = Math.round(track.scrollLeft / slideWidth);
    if (nextIndex !== activeIndex && nextIndex >= 0 && nextIndex < images.length) {
      setActiveIndex(nextIndex);
    }
  }, [activeIndex, images.length]);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setZoomScale(1);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setZoomScale(1);
    setIsLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setZoomScale(1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setZoomScale(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLightboxOpen, closeLightbox, goToPrevious, goToNext]);

  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-canvas-deep shadow-sm">
        <div className="absolute right-3 top-3 z-10 rounded-full bg-ink/70 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
          {activeIndex + 1}/{images.length}
        </div>

        <div
          ref={mainTrackRef}
          onScroll={handleMainScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((imageSrc, index) => (
            <button
              key={imageSrc}
              type="button"
              onClick={() => openLightbox(index)}
              className={`relative min-w-full aspect-square snap-center cursor-zoom-in overflow-hidden ${
                desktopRatio === 1 ? "" : "sm:aspect-[4/3]"
              }`}
              aria-label={`Ampliar foto ${index + 1} de ${productName}`}
            >
              <ProductImage
                src={imageSrc}
                alt={altFor(index)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                frameRatio={{ base: 1, sm: desktopRatio }}
                priority={index === 0}
              />
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink/45 px-2 py-1.5 backdrop-blur-sm sm:hidden"
          >
            <div className="relative h-[3px] w-16 overflow-hidden rounded-full bg-white/35">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-white transition-transform duration-300 ease-out"
                style={{
                  width: `${100 / images.length}%`,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:block">
        <div className="flex gap-2.5 md:gap-3 min-w-max">
          {images.map((imageSrc, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`thumb-${imageSrc}`}
                type="button"
                onClick={() => goToSlide(index)}
                className={`relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-ink ring-2 ring-ink/20 shadow-md scale-[1.02]"
                    : "border-line hover:border-ink-muted"
                }`}
                aria-label={`Ver foto ${index + 1} de ${productName}`}
                aria-current={isActive}
              >
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  sizes="96px"
                  loading="lazy"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${productName}`}
        >
          <button
            type="button"
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label="Cerrar"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 md:left-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-3 md:right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl h-[75vh] md:h-[80vh] overflow-hidden"
            style={lightboxMaxSize(images[activeIndex])}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomScale((prev) => (prev === 1 ? 2 : 1))}
              className={`relative h-full w-full ${
                zoomScale === 1 ? "cursor-zoom-in" : "cursor-zoom-out"
              }`}
              aria-label={zoomScale === 1 ? "Acercar imagen" : "Alejar imagen"}
            >
              <span className="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                {zoomScale === 1 ? "Click para zoom +" : "Click para zoom -"}
              </span>
            <Image
              src={images[activeIndex]}
              alt={altFor(activeIndex)}
              fill
              sizes="100vw"
              className={`object-contain transition-transform duration-300 ${
                zoomScale === 1 ? "scale-100" : "scale-[2]"
              }`}
              priority
            />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

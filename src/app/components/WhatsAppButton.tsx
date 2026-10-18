"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buttonClasses } from "@/app/components/ui/Button";
import { buildWhatsAppUrl, formatCLP, trackWhatsAppClick } from "@/lib/whatsapp";

interface WhatsappButtonProps {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  priceLabel?: string;
  imageUrl?: string;
  buttonLabel?: string;
  prefilledMessage?: string;
  alwaysVisible?: boolean;
  watchSelector?: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({
  productTitle,
  productId,
  productPrice,
  priceLabel,
  imageUrl,
  buttonLabel = "Cotizar por WhatsApp",
  prefilledMessage,
  alwaysVisible = false,
  watchSelector,
}) => {
  const [isPastHero, setIsPastHero] = useState(alwaysVisible);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const isVisible = (alwaysVisible || isPastHero) && !isOverFooter;
  const displayPrice = priceLabel ?? (typeof productPrice === "number" ? formatCLP(productPrice) : undefined);

  useEffect(() => {
    if (alwaysVisible) {
      setIsPastHero(true);
      return;
    }

    if (watchSelector) {
      const target = document.querySelector(watchSelector);
      if (!target) {
        setIsPastHero(window.scrollY > 80);
        return;
      }

      const observer = new IntersectionObserver(([entry]) => {
        setIsPastHero(!entry.isIntersecting);
      });
      observer.observe(target);
      return () => observer.disconnect();
    }

    const handleScroll = () => {
      setIsPastHero(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible, watchSelector]);

  useEffect(() => {
    const credit = document.getElementById("footer-creditos");
    if (!credit) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOverFooter(entry.isIntersecting),
      { rootMargin: "0px 0px 96px 0px", threshold: 0 }
    );

    observer.observe(credit);
    return () => observer.disconnect();
  }, []);

  const handleWhatsappClick = useCallback(() => {
    void trackWhatsAppClick({
      productTitle,
      productId,
      productPrice,
      placement: "sticky",
    }).catch((err) => {
      console.error("Error enviando conversión a Facebook:", err);
    });

    const url = buildWhatsAppUrl(prefilledMessage ?? `Hola, quiero cotizar el producto ${productTitle}`);
    window.open(url, "_blank");
  }, [prefilledMessage, productId, productPrice, productTitle]);

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Cotización rápida por WhatsApp"
      className={`fixed bottom-4 left-0 right-0 z-30 px-4 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto w-full max-w-md lg:max-w-5xl">
        <div className="hidden lg:flex items-center justify-between gap-5 rounded-full border border-neutral-200 bg-white/95 px-5 py-3 shadow-2xl shadow-neutral-900/10 backdrop-blur">
          <div className="flex min-w-0 items-center gap-3">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={`Miniatura de ${productTitle}`}
                width={44}
                height={44}
                sizes="44px"
                loading="lazy"
                className="h-11 w-11 rounded-full object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-normal text-neutral-900">{productTitle}</p>
              {displayPrice && <p className="text-xs text-neutral-500">{displayPrice}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleWhatsappClick}
            data-fb-disable-auto-event-tracking="true"
            className={buttonClasses({
              variant: "whatsapp",
              fullWidthMobile: false,
              className: "shrink-0",
            })}
          >
            <AiOutlineWhatsApp size={20} aria-hidden="true" />
            {buttonLabel}
          </button>
        </div>
        <button
          type="button"
          onClick={handleWhatsappClick}
          data-fb-disable-auto-event-tracking="true"
          className={buttonClasses({
            variant: "whatsapp",
            fullWidthMobile: false,
            className: "w-full lg:hidden",
          })}
        >
          <AiOutlineWhatsApp size={20} aria-hidden="true" />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default WhatsappButton;

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buttonClasses } from "@/app/components/ui/Button";
import { useProductQuote } from "@/app/components/RepisaJ60Quote";
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
  /** Si se define, el sticky aparece cuando ninguno de estos elementos está en pantalla. */
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
  const quote = useProductQuote();
  const price = quote?.active ? quote.price : productPrice;
  const messageText = quote?.active ? quote.message : prefilledMessage;
  const blocked = Boolean(quote?.active && !quote.valid);
  const [isPastHero, setIsPastHero] = useState(alwaysVisible);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const isVisible = (alwaysVisible || isPastHero) && !isOverFooter;
  const numericPrice = typeof price === "number" ? formatCLP(price) : undefined;
  const displayPrice = blocked ? "Elige el largo" : (priceLabel && !quote?.active ? priceLabel : numericPrice);

  useEffect(() => {
    if (alwaysVisible) {
      setIsPastHero(true);
      return;
    }

    const targets = watchSelector ? Array.from(document.querySelectorAll(watchSelector)) : [];

    if (!watchSelector || targets.length === 0) {
      const handleScroll = () => {
        setIsPastHero(window.scrollY > 80);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setIsPastHero(visible.size === 0);
    });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
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
    if (blocked) return;

    void trackWhatsAppClick({
      productTitle,
      productId,
      productPrice: price,
      placement: "sticky",
    }).catch((err) => {
      console.error("Error enviando conversión a Facebook:", err);
    });

    const url = buildWhatsAppUrl(messageText ?? `Hola, quiero cotizar el producto ${productTitle}`);
    window.open(url, "_blank");
  }, [blocked, messageText, price, productId, productTitle]);

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Cotización rápida por WhatsApp"
      className={`fixed bottom-4 left-0 right-0 z-30 px-4 ${
        watchSelector ? "" : "transition-all duration-300"
      } ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : watchSelector
            ? "hidden"
            : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto w-full max-w-md lg:max-w-5xl">
        <div className="hidden lg:flex items-center justify-between gap-5 rounded-full border border-line bg-white/95 px-5 py-3 shadow-2xl shadow-ink/10 backdrop-blur">
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
              <p className="truncate text-sm font-normal text-ink">{productTitle}</p>
              {displayPrice && <p className="text-xs text-ink-muted">{displayPrice}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleWhatsappClick}
            disabled={blocked}
            data-fb-disable-auto-event-tracking="true"
            className={buttonClasses({
              variant: "whatsapp",
              fullWidthMobile: false,
              className: `shrink-0 ${blocked ? "cursor-not-allowed opacity-60" : ""}`,
            })}
          >
            <AiOutlineWhatsApp size={20} aria-hidden="true" />
            {buttonLabel}
          </button>
        </div>
        {numericPrice ? (
          <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-white/95 py-2 pl-5 pr-2 shadow-2xl shadow-ink/10 backdrop-blur lg:hidden">
            <p className="min-w-0 truncate text-sm font-medium text-ink">{blocked ? "Elige el largo" : numericPrice}</p>
            <button
              type="button"
              onClick={handleWhatsappClick}
              disabled={blocked}
              data-fb-disable-auto-event-tracking="true"
              className={buttonClasses({
                variant: "whatsapp",
                size: "sm",
                fullWidthMobile: false,
                className: `shrink-0 whitespace-nowrap ${blocked ? "cursor-not-allowed opacity-60" : ""}`,
              })}
            >
              <AiOutlineWhatsApp size={20} aria-hidden="true" />
              {buttonLabel}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleWhatsappClick}
            disabled={blocked}
            data-fb-disable-auto-event-tracking="true"
            className={buttonClasses({
              variant: "whatsapp",
              fullWidthMobile: false,
              className: `w-full lg:hidden ${blocked ? "cursor-not-allowed opacity-60" : ""}`,
            })}
          >
            <AiOutlineWhatsApp size={20} aria-hidden="true" />
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default WhatsappButton;

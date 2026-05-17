"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buildWhatsAppUrl, formatCLP, trackWhatsAppClick } from "@/lib/whatsapp";

interface WhatsappButtonProps {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  priceLabel?: string;
  imageUrl?: string;
  buttonLabel?: string;
  prefilledMessage?: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({
  productTitle,
  productId,
  productPrice,
  priceLabel,
  imageUrl,
  buttonLabel = "Cotizar por WhatsApp",
  prefilledMessage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const displayPrice = priceLabel ?? (typeof productPrice === "number" ? formatCLP(productPrice) : undefined);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-normal text-neutral-900">{productTitle}</p>
              {displayPrice && <p className="text-xs text-neutral-500">{displayPrice}</p>}
            </div>
          </div>
          <button
            onClick={handleWhatsappClick}
            data-fb-disable-auto-event-tracking="true"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-[#1ebe5d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <AiOutlineWhatsApp size={21} />
            {buttonLabel}
          </button>
        </div>
        <button
          onClick={handleWhatsappClick}
          data-fb-disable-auto-event-tracking="true"
          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium tracking-wide text-white shadow-lg shadow-emerald-500/25 backdrop-blur-sm transition-colors hover:bg-[#1ebe5d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 lg:hidden"
        >
          <AiOutlineWhatsApp size={22} />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default WhatsappButton;

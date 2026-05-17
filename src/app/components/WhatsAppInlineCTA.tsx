"use client";

import { useCallback } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

interface WhatsAppInlineCTAProps {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  placement: "inline" | "banner";
  variant?: "primary" | "secondary";
  label?: string;
  fullWidth?: boolean;
  prefilledMessage?: string;
}

export default function WhatsAppInlineCTA({
  productTitle,
  productId,
  productPrice,
  placement,
  variant = "primary",
  label = "Cotizar por WhatsApp",
  fullWidth = false,
  prefilledMessage,
}: WhatsAppInlineCTAProps) {
  const handleClick = useCallback(() => {
    void trackWhatsAppClick({
      productTitle,
      productId,
      productPrice,
      placement,
    }).catch((err) => {
      console.error("Error enviando conversión a Facebook:", err);
    });

    const message = prefilledMessage ?? `Hola, quiero cotizar el producto ${productTitle}`;
    window.open(buildWhatsAppUrl(message), "_blank");
  }, [placement, prefilledMessage, productId, productPrice, productTitle]);

  const variantClass =
    variant === "primary"
      ? "bg-[#25D366] text-white shadow-lg shadow-emerald-500/20 hover:bg-[#1ebe5d] focus-visible:ring-[#25D366]"
      : "border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 focus-visible:ring-neutral-900";

  return (
    <button
      type="button"
      onClick={handleClick}
      data-fb-disable-auto-event-tracking="true"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm md:text-base font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        fullWidth ? "w-full" : "w-full sm:w-auto"
      } ${variantClass}`}
    >
      <AiOutlineWhatsApp
        size={22}
        className={variant === "primary" ? "text-white" : "text-[#25D366]"}
      />
      {label}
    </button>
  );
}

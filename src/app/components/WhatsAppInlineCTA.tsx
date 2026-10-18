"use client";

import { useCallback } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buttonClasses } from "@/app/components/ui/Button";
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

  return (
    <button
      type="button"
      onClick={handleClick}
      data-fb-disable-auto-event-tracking="true"
      className={buttonClasses({
        variant: variant === "primary" ? "whatsapp" : "secondary",
        fullWidthMobile: !fullWidth,
        className: fullWidth ? "w-full" : undefined,
      })}
    >
      <AiOutlineWhatsApp size={20} aria-hidden="true" />
      {label}
    </button>
  );
}

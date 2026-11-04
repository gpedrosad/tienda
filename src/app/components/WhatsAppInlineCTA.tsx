"use client";

import { useCallback } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { buttonClasses } from "@/app/components/ui/Button";
import { useProductQuote } from "@/app/components/RepisaJ60Quote";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";

interface WhatsAppInlineCTAProps {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  placement: "inline" | "banner" | "product_hero";
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
  const quote = useProductQuote();
  const price = quote?.active ? quote.price : productPrice;
  const messageText = quote?.active ? quote.message : prefilledMessage;
  const blocked = Boolean(quote?.active && !quote.valid);

  const handleClick = useCallback(() => {
    if (blocked) return;

    void trackWhatsAppClick({
      productTitle,
      productId,
      productPrice: price,
      placement,
    }).catch((err) => {
      console.error("Error enviando conversión a Facebook:", err);
    });

    const message = messageText ?? `Hola, quiero cotizar el producto ${productTitle}`;
    window.open(buildWhatsAppUrl(message), "_blank");
  }, [blocked, messageText, placement, price, productId, productTitle]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={blocked}
      data-fb-disable-auto-event-tracking="true"
      className={buttonClasses({
        variant: variant === "primary" ? "whatsapp" : "secondary",
        fullWidthMobile: !fullWidth,
        className: `${fullWidth ? "w-full" : ""} ${blocked ? "cursor-not-allowed opacity-60" : ""}`.trim(),
      })}
    >
      <AiOutlineWhatsApp size={20} aria-hidden="true" />
      {label}
    </button>
  );
}

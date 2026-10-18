"use client";

import type { ReactNode } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { trackWhatsAppClick } from "@/lib/whatsapp";
import { buttonClasses, type ButtonSize } from "./Button";

type WhatsAppClick = {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  placement: string;
};

function reportWhatsAppClick(payload: WhatsAppClick) {
  void trackWhatsAppClick(payload).catch((err) => {
    console.error("Error enviando conversión a Facebook:", err);
  });
}

type WhatsAppCTAProps = {
  href: string;
  label?: string;
  placement: string;
  size?: ButtonSize;
  tone?: "light" | "dark";
  fullWidthMobile?: boolean;
  className?: string;
  productTitle?: string;
  productId?: string;
  productPrice?: number;
  onClick?: () => void;
};

export default function WhatsAppCTA({
  href,
  label = "Cotizar por WhatsApp",
  placement,
  size,
  tone,
  fullWidthMobile,
  className,
  productTitle,
  productId,
  productPrice,
  onClick,
}: WhatsAppCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-fb-disable-auto-event-tracking="true"
      className={buttonClasses({ variant: "whatsapp", size, tone, fullWidthMobile, className })}
      onClick={() => {
        onClick?.();
        reportWhatsAppClick({
          productTitle: productTitle ?? label,
          productId,
          productPrice,
          placement,
        });
      }}
    >
      <AiOutlineWhatsApp size={20} aria-hidden="true" />
      {label}
    </a>
  );
}

type WhatsAppAnchorProps = {
  href: string;
  placement: string;
  productTitle: string;
  productId?: string;
  productPrice?: number;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
};

export function WhatsAppAnchor({
  href,
  placement,
  productTitle,
  productId,
  productPrice,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: WhatsAppAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      data-fb-disable-auto-event-tracking="true"
      onClick={() => {
        onClick?.();
        reportWhatsAppClick({ productTitle, productId, productPrice, placement });
      }}
    >
      {children}
    </a>
  );
}

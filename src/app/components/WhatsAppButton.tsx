"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";

interface WhatsappButtonProps {
  productTitle: string;
}

interface DataLayerEvent {
  event: string;
  product: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ productTitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsappClick = useCallback(async () => {
    // GTM DataLayer event
    if (typeof window !== "undefined") {
      const win = window as { dataLayer?: DataLayerEvent[] };
      win.dataLayer = win.dataLayer ?? [];
      win.dataLayer.push({ event: "whatsapp_conversion", product: productTitle });
    }

    // Facebook Conversion API call
    try {
      await fetch("/api/facebook-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "MensajeWhatsApp",
          event_source_url: window.location.href,
          product: productTitle,
        }),
      });
    } catch (err) {
      console.error("Error enviando conversión a Facebook:", err);
    }

    // Abrir WhatsApp con mensaje
    const phone = "56995497838";
    const text = encodeURIComponent(`Hola, quiero cotizar el producto ${productTitle}`);
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
  }, [productTitle]);

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-30 px-4 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto w-full max-w-md">
      <button
        onClick={handleWhatsappClick}
        data-fb-disable-auto-event-tracking="true"
        className="w-full flex items-center justify-center gap-2.5 rounded-full border border-neutral-700 bg-neutral-900/95 px-5 py-3 text-sm md:text-base font-medium tracking-wide text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        <AiOutlineWhatsApp size={22} className="text-emerald-400" />
        Cotizar por WhatsApp
      </button>
      </div>
    </div>
  );
};

export default WhatsappButton;

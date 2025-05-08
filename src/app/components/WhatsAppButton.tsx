"use client";

import { useCallback } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";

interface WhatsappButtonProps {
  productTitle: string;
}

interface DataLayerEvent {
  event: string;
  product: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ productTitle }) => {
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
    const text = `Hola, quiero me interesa el producto ${encodeURIComponent(
      productTitle
    )}`;
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
  }, [productTitle]);

  return (
    <div className="flex justify-center mb-10">
      <button
        onClick={handleWhatsappClick}
        data-fb-disable-auto-event-tracking="true"
        className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-semibold py-3 px-6 rounded-xl shadow-lg animate-pulse transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <AiOutlineWhatsApp size={26} />
        Enviar mensaje a WhatsApp
      </button>
    </div>
  );
};

export default WhatsappButton;
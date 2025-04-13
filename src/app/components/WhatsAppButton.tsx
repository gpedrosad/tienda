"use client";

import { AiOutlineWhatsApp } from "react-icons/ai";

interface WhatsappButtonProps {
  productTitle: string;
}

interface DataLayerEvent {
  event: string;
  product: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ productTitle }) => {
  const handleWhatsappClick = async () => {
    if (typeof window !== "undefined") {
      // Aseguramos que el dataLayer exista
      const win = window as { dataLayer?: DataLayerEvent[] };

      if (!win.dataLayer) {
        win.dataLayer = [];
      }

      // Disparamos el evento para GTM
      win.dataLayer.push({
        event: "whatsapp_conversion",
        product: productTitle,
      });
    }

    // Llamada a la API interna para enviar el evento a Facebook Conversion API
    try {
      await fetch("/api/facebook-whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productTitle }),
      });
    } catch (error) {
      console.error("Error enviando conversión a Facebook:", error);
    }

    // Abre WhatsApp con el mensaje preconfigurado
    const url = `https://wa.me/56995497838?text=Hola, quiero comprar el producto ${encodeURIComponent(productTitle)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={handleWhatsappClick}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        <AiOutlineWhatsApp size={24} />
        Comprar por Whatsapp
      </button>
    </div>
  );
};

export default WhatsappButton;
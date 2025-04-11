"use client";

import { AiOutlineWhatsApp } from "react-icons/ai";

interface WhatsappButtonProps {
  productTitle: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ productTitle }) => {
  const handleWhatsappClick = () => {
    if (typeof window !== "undefined") {
        const win = window as unknown as { dataLayer: any[] };
        
      // Inicializa dataLayer si no existe
      if (!win.dataLayer) {
        win.dataLayer = [];
      }

      // Enviar evento al dataLayer
      win.dataLayer.push({
        event: "whatsapp_conversion",
        product: productTitle,
      });
    }

    // Abrir WhatsApp
    const url = `https://wa.me/56995497838?text=Hola, quiero comprar el producto ${encodeURIComponent(
      productTitle
    )}`;
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
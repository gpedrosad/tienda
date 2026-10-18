"use client";
import { useState } from "react";
import { AiOutlineCar, AiOutlineCreditCard, AiOutlinePhone, AiOutlineSafety, AiOutlineUndo, AiOutlineSetting } from "react-icons/ai";
import { DEFAULT_PRODUCTION_DAYS, WARRANTY_MONTHS } from "@/lib/seo";

export default function Accordion({
  productionDays = DEFAULT_PRODUCTION_DAYS,
}: {
  productionDays?: number;
}) {
  // Definición de los ítems del acordeón con la información ordenada
  const accordionItems = [
    {
      title: "Métodos de pago",
      content: "Tarjeta de crédito, débito y transferencia."
    },
    {
      title: "Envíos",
      content: "Retiro en nuestro taller en Chillán o envío a todo Chile. El despacho se coordina según tu comuna o región al cotizar."
    },
    {
      title: "Cambios y devoluciones",
      content: "Puedes cambiar o devolver el producto en un plazo de 30 días, siempre que se encuentre en su estado original y sin uso. Se aplican condiciones y restricciones según el tipo de producto."
    },
    {
      title: "Garantía",
      content: `${WARRANTY_MONTHS} meses contra defectos de fabricación desde la entrega del mueble.`
    },
    {
      title: "Tiempo de fabricación",
      content: `${productionDays} días hábiles en total.`
    },
    {
      title: "Contacto",
      content: "Cualquier duda o consulta, puedes enviarnos un WhatsApp al +56 9 9549 7838 o al mail hola@ideamadera.cl."
    }
  ];

  // Estado que guarda los índices de los elementos abiertos (permite varios abiertos)
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Función para abrir/cerrar cada elemento
  const toggleAccordion = (index: number) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(index)) {
        return prevOpenItems.filter((itemIndex) => itemIndex !== index);
      } else {
        return [...prevOpenItems, index];
      }
    });
  };

  // Función para renderizar el icono correspondiente según el título del ítem
  const renderIcon = (title: string) => {
    switch (title) {
      case "Métodos de pago":
        return <AiOutlineCreditCard className="mr-3 text-wood" size={18} aria-hidden="true" />;
      case "Envíos":
        return <AiOutlineCar className="mr-3 text-wood" size={18} aria-hidden="true" />;
      case "Cambios y devoluciones":
        return <AiOutlineUndo className="mr-3 text-wood" size={18} aria-hidden="true" />;
      case "Garantía":
        return <AiOutlineSafety className="mr-3 text-wood" size={18} aria-hidden="true" />;
      case "Tiempo de fabricación":
        return <AiOutlineSetting className="mr-3 text-wood" size={18} aria-hidden="true" />;
      case "Contacto":
        return <AiOutlinePhone className="mr-3 text-wood" size={18} aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-line divide-y divide-line/70">
      {accordionItems.map((item, index) => {
        const isOpen = openItems.includes(index);
        const panelId = `product-accordion-${index}`;
        return (
          <div 
            key={index}
            className="transition-all duration-300 hover:bg-canvas/60"
          >
            {/* Encabezado del acordeón */}
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 group"
            >
              <div className="flex items-center">
                {renderIcon(item.title)}
                <span className="font-display text-sm md:text-base font-medium tracking-tight text-ink group-hover:text-wood-dark transition-colors duration-300">
                  {item.title}
                </span>
              </div>
              {/* Flecha que rota cuando está abierto */}
              <svg
                className={`w-4 h-4 md:w-5 md:h-5 transform transition-all duration-500 ease-out text-ink-muted group-hover:text-wood ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Contenido que se muestra/oculta */}
            <div
              id={panelId}
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 md:px-6 pb-4 md:pb-5 pl-11 md:pl-12">
                <p className="text-sm md:text-base text-ink-muted leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
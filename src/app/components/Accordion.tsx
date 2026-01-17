"use client";
import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineCreditCard, AiOutlinePhone, AiOutlineUndo, AiOutlineSetting } from "react-icons/ai";

export default function Accordion() {
  // Definición de los ítems del acordeón con la información ordenada
  const accordionItems = [
    {
      title: "Métodos de pago",
      content: "Tarjeta de crédito, débito y transferencia."
    },
    {
      title: "Envíos",
      content: "Envíos a todo Chile, cada pedido tiene un plazo de 15 días hábiles."
    },
    {
      title: "Cambios y devoluciones",
      content: "Puedes cambiar o devolver el producto en un plazo de 30 días, siempre que se encuentre en su estado original y sin uso. Se aplican condiciones y restricciones según el tipo de producto."
    },
    {
      title: "Tiempo de fabricación",
      content: "15 días hábiles."
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
        return <AiOutlineCreditCard className="mr-3 text-neutral-600" size={18} />;
      case "Envíos":
        return <AiOutlineClockCircle className="mr-3 text-neutral-600" size={18} />;
      case "Cambios y devoluciones":
        return <AiOutlineUndo className="mr-3 text-neutral-600" size={18} />;
      case "Tiempo de fabricación":
        return <AiOutlineSetting className="mr-3 text-neutral-600" size={18} />;
      case "Contacto":
        return <AiOutlinePhone className="mr-3 text-neutral-600" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-neutral-200/60 divide-y divide-neutral-100">
      {accordionItems.map((item, index) => {
        const isOpen = openItems.includes(index);
        return (
          <div 
            key={index}
            className="transition-all duration-300 hover:bg-neutral-50/50"
          >
            {/* Encabezado del acordeón */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left focus:outline-none group"
            >
              <div className="flex items-center">
                {renderIcon(item.title)}
                <span className="text-sm md:text-base font-light tracking-tight text-neutral-900 group-hover:text-neutral-700 transition-colors duration-300">
                  {item.title}
                </span>
              </div>
              {/* Flecha que rota cuando está abierto */}
              <svg
                className={`w-4 h-4 md:w-5 md:h-5 transform transition-all duration-500 ease-out text-neutral-400 group-hover:text-neutral-600 ${
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
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 md:px-6 pb-4 md:pb-5 pl-11 md:pl-12">
                <p className="text-sm md:text-base font-light text-neutral-600 leading-relaxed">
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
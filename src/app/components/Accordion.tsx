"use client";
import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineCreditCard, AiOutlinePhone, AiOutlineUndo, AiOutlineSetting } from "react-icons/ai";

export default function Accordion() {
  // Definición de los ítems del acordeón con la información ordenada
  const accordionItems = [
    {
      title: "MÉTODOS DE PAGO",
      content: "Tarjeta de crédito, débito y transferencia."
    },
    {
      title: "ENVIOS",
      content: "Envíos a todo Chile, cada pedido tiene un plazo de 15 días hábiles."
    },
    {
      title: "CAMBIOS Y DEVOLUCIONES",
      content: "Puedes cambiar o devolver el producto en un plazo de 30 días, siempre que se encuentre en su estado original y sin uso. Se aplican condiciones y restricciones según el tipo de producto."
    },
    {
      title: "TIEMPO DE FABRICACIÓN",
      content: "15 días hábiles."
    },
    {
      title: "CONTACTO",
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
      case "MÉTODOS DE PAGO":
        return <AiOutlineCreditCard className="mr-2" />;
      case "ENVIOS":
        return <AiOutlineClockCircle className="mr-2" />;
      case "CAMBIOS Y DEVOLUCIONES":
        return <AiOutlineUndo className="mr-2" />;
      case "TIEMPO DE FABRICACIÓN":
        return <AiOutlineSetting className="mr-2" />;
      case "CONTACTO":
        return <AiOutlinePhone className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto border border-gray-200 divide-y divide-gray-200">
      {accordionItems.map((item, index) => {
        const isOpen = openItems.includes(index);
        return (
          <div key={index}>
            {/* Encabezado del acordeón */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
            >
              <div className="flex items-center">
                {renderIcon(item.title)}
                <span className="text-sm uppercase tracking-wide">
                  {item.title}
                </span>
              </div>
              {/* Flecha que rota cuando está abierto */}
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Contenido que se muestra/oculta */}
            <div
              className={`px-4 overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 py-2" : "max-h-0"
              }`}
            >
              <p className="text-sm text-gray-700">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
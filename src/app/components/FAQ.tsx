"use client";

import React, { useState, useRef, useEffect } from 'react';

const questions = [
  {
    id: 1,
    title: "¿Cuánto tarda el envío?",
    answer:
      "El envío usualmente tarda 15 días hábiles, dependiendo de la ubicación y la disponibilidad del producto. Además, recibirás un número de seguimiento para estar al tanto de la entrega.",
  },
  {
    id: 2,
    title: "¿Se puede pagar en cuotas?",
    answer:
      "Sí, ofrecemos diversas opciones de pago, incluyendo la posibilidad de abonar en cuotas mediante tarjetas de crédito y otros métodos de financiamiento.",
  },
  {
    id: 3,
    title: "¿Qué garantía tienen los muebles?",
    answer:
      "Nuestros muebles cuentan con una garantía de 12 meses contra defectos de fabricación. Si presentás algún inconveniente, te asistiremos para resolverlo a la brevedad.",
  },
  {
    id: 4,
    title: "¿Puedo pedir medidas especiales?",
    answer:
      "Claro, realizamos muebles a medida. Comunicate con nuestro equipo para asesorarte y coordinar las especificaciones de tu pedido personalizado.",
  },
  {
    id: 5,
    title: "¿Qué pasa si llega dañado?",
    answer:
      "En caso de recibir un mueble dañado, te pedimos que nos contactes de inmediato para gestionar el reemplazo o la reparación, conforme a nuestras políticas de garantía.",
  },
];

const FAQItem = ({ question }: { question: typeof questions[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calcula la altura real del contenido para asignarla al contenedor al expandir
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow hover:shadow-md transition-shadow duration-200">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-lg font-medium text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question.title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? maxHeight : 0 }}
      >
        <div ref={contentRef} className="px-5 pb-4 text-gray-600">
          {question.answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
        Preguntas Frecuentes
      </h2>
      <div className="space-y-6">
        {questions.map((q) => (
          <FAQItem key={q.id} question={q} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
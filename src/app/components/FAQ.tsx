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
    <div className="border-b border-neutral-200 bg-white transition-colors duration-300 hover:bg-neutral-50/50">
      <button
        className="w-full flex items-center justify-between py-5 md:py-6 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base md:text-lg font-light text-neutral-900 tracking-tight pr-8 group-hover:text-neutral-600 transition-colors duration-300">
          {question.title}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-500 ${
          isOpen ? "rotate-180" : ""
        }`}>
          <svg
            className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? maxHeight : 0 }}
      >
        <div ref={contentRef} className="pb-6 pr-12">
          <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            {question.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="max-w-3xl mx-auto py-16 md:py-20 lg:py-24 px-5 md:px-12 lg:px-20">
      {/* Encabezado minimalista */}
      <div className="mb-12 md:mb-16 space-y-3">
        <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-light">
          Preguntas frecuentes
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight">
          ¿Tienes dudas?
        </h2>
      </div>

      {/* Lista de preguntas sin espaciado entre items */}
      <div className="border-t border-neutral-200">
        {questions.map((q) => (
          <FAQItem key={q.id} question={q} />
        ))}
      </div>

      {/* CTA adicional */}
      <div className="mt-12 md:mt-16 text-center">
        <p className="text-sm md:text-base text-neutral-600 font-light mb-4">
          ¿No encuentras lo que buscas?
        </p>
        <a
          href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, tengo una consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm md:text-base text-neutral-900 font-normal border-b border-neutral-900 hover:text-neutral-600 hover:border-neutral-600 transition-colors duration-300 pb-0.5"
        >
          Contáctanos directamente
        </a>
      </div>
    </section>
  );
};

export default FAQ;
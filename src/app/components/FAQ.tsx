"use client";

import React, { useState, useRef, useEffect } from "react";
import Reveal from "@/app/components/Reveal";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { homeFaqItems } from "@/lib/seo";

const faqWhatsAppUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage("preguntas frecuentes", [
    "Tengo una duda antes de cotizar un producto.",
  ]),
);

const FAQItem = ({ question }: { question: (typeof homeFaqItems)[0] }) => {
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
          {question.question}
        </span>
        <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
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
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? maxHeight : 0,
          opacity: isOpen ? 1 : 0.6,
          transition: "max-height 400ms var(--ease-out-quart), opacity 300ms var(--ease-out-quart)",
        }}
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
      <Reveal as="header" className="mb-12 md:mb-16 space-y-3">
        <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-light">
          Preguntas frecuentes
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-[-0.02em] text-balance">
          ¿Tienes dudas?
        </h2>
      </Reveal>

      {/* Lista de preguntas sin espaciado entre items */}
      <div className="border-t border-neutral-200">
        {homeFaqItems.map((item, index) => (
          <FAQItem key={`${item.question}-${index}`} question={item} />
        ))}
      </div>

      <Reveal delay={100} className="mt-12 md:mt-16 text-center">
        <p className="text-sm md:text-base text-neutral-600 font-light mb-4">
          ¿No encuentras lo que buscas?
        </p>
        <a
          href={faqWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm md:text-base text-neutral-900 font-normal border-b border-neutral-900 hover:text-neutral-600 hover:border-neutral-600 transition-colors duration-200 pb-0.5"
          style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
        >
          Contáctanos directamente
        </a>
      </Reveal>
    </section>
  );
};

export default FAQ;

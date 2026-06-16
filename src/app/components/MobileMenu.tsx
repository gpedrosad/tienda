"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaTimes } from "react-icons/fa";
import { collectionNavLinks } from "@/lib/navigation";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  const contactUrl = buildWhatsAppUrl(
    buildGeneralWhatsAppMessage("menú móvil", [
      "Quiero revisar opciones de muebles, medidas y despacho.",
    ])
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}#catalogo`;
    }
  };

  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !menuRef.current) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const isActive = (href: string) => pathname === href;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[51] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-0 bg-white z-[55] lg:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div ref={menuRef} className="flex flex-col h-full px-6 pt-20 pb-8">
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="absolute top-5 right-5 z-[60] p-2 text-neutral-900 focus:outline-none"
            aria-label="Cerrar menú"
          >
            <FaTimes size={22} />
          </button>

          <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all duration-300"
              />
            </div>
          </form>

          <nav aria-label="Menú de navegación" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col items-center space-y-6">
              <li
                className={`w-full text-center transition-all duration-500 ${
                  isOpen && !prefersReducedMotion
                    ? "translate-y-0 opacity-100"
                    : prefersReducedMotion
                    ? "opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen && !prefersReducedMotion ? "100ms" : "0ms" }}
              >
                <Link
                  href="/"
                  onClick={onClose}
                  className={`block text-3xl md:text-4xl font-light hover:text-neutral-600 transition-colors duration-300 tracking-tight ${
                    isActive("/") ? "text-neutral-900" : "text-neutral-900"
                  }`}
                >
                  Inicio
                </Link>
              </li>

              <li
                className={`w-full text-center transition-all duration-500 ${
                  isOpen && !prefersReducedMotion
                    ? "translate-y-0 opacity-100"
                    : prefersReducedMotion
                    ? "opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen && !prefersReducedMotion ? "200ms" : "0ms" }}
              >
                <Link
                  href="/collections/todos-los-productos"
                  onClick={onClose}
                  className="block text-3xl md:text-4xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300 tracking-tight"
                >
                  Productos
                </Link>
              </li>

              <li
                className={`w-full text-center transition-all duration-500 ${
                  isOpen && !prefersReducedMotion
                    ? "translate-y-0 opacity-100"
                    : prefersReducedMotion
                    ? "opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen && !prefersReducedMotion ? "300ms" : "0ms" }}
              >
                <button
                  onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                  className="w-full flex items-center justify-center gap-2 text-3xl md:text-4xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300 tracking-tight"
                >
                  Colecciones
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      collectionsExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    collectionsExpanded ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 px-4">
                    {collectionNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="text-sm font-light text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li
                className={`w-full text-center transition-all duration-500 ${
                  isOpen && !prefersReducedMotion
                    ? "translate-y-0 opacity-100"
                    : prefersReducedMotion
                    ? "opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen && !prefersReducedMotion ? "400ms" : "0ms" }}
              >
                <Link
                  href="/ofertas"
                  onClick={onClose}
                  className="block text-3xl md:text-4xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300 tracking-tight"
                >
                  Destacados
                </Link>
              </li>

              <li
                className={`w-full text-center transition-all duration-500 ${
                  isOpen && !prefersReducedMotion
                    ? "translate-y-0 opacity-100"
                    : prefersReducedMotion
                    ? "opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen && !prefersReducedMotion ? "500ms" : "0ms" }}
              >
                <Link
                  href="/peldanos-a-medida"
                  onClick={onClose}
                  className="block text-3xl md:text-4xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300 tracking-tight"
                >
                  Peldaños a medida
                </Link>
              </li>

              <li
                className={`w-full text-center transition-all duration-500 ${
                  isOpen && !prefersReducedMotion
                    ? "translate-y-0 opacity-100"
                    : prefersReducedMotion
                    ? "opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen && !prefersReducedMotion ? "600ms" : "0ms" }}
              >
                <Link
                  href={contactUrl}
                  onClick={onClose}
                  className="block text-3xl md:text-4xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300 tracking-tight"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-center pt-6 border-t border-neutral-100">
            <p className="text-xs md:text-sm text-neutral-500 tracking-wider uppercase font-light mb-3">
              Artesanía en madera
            </p>
            <Link
              href={contactUrl}
              onClick={onClose}
              className="inline-block px-6 py-2 rounded-full bg-green-600 text-white text-sm font-light hover:bg-green-700 transition-colors duration-300"
            >
              Escríbenos por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

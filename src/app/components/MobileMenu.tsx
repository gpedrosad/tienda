"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaSearch, FaTimes } from "react-icons/fa";
import WhatsAppCTA, { WhatsAppAnchor } from "@/app/components/ui/WhatsAppCTA";
import { ALL_PRODUCTS_COLLECTION_PATH, KIT_PERGOLA_PATH, collectionNavLinks, customMadeNavLinks } from "@/lib/navigation";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const [customExpanded, setCustomExpanded] = useState(false);
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

  const revealClass = (delayMs: number) => {
    const visible = isOpen && !prefersReducedMotion;
    return {
      className: `w-full text-center transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : prefersReducedMotion
          ? "opacity-100"
          : "-translate-y-4 opacity-0"
      }`,
      style: { transitionDelay: visible ? `${delayMs}ms` : "0ms" } as const,
    };
  };

  const itemClass =
    "inline-flex min-h-11 items-center justify-center text-3xl md:text-4xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300 tracking-tight";

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
            className="absolute top-5 right-5 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
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
            <ul className="flex flex-col items-center space-y-4">
              <li {...revealClass(80)}>
                <Link
                  href={ALL_PRODUCTS_COLLECTION_PATH}
                  onClick={onClose}
                  aria-current={isActive(ALL_PRODUCTS_COLLECTION_PATH) ? "page" : undefined}
                  className={itemClass}
                >
                  Productos
                </Link>
              </li>

              <li {...revealClass(140)}>
                <button
                  type="button"
                  aria-expanded={collectionsExpanded}
                  aria-controls="mobile-nav-collections"
                  onClick={() => setCollectionsExpanded((open) => !open)}
                  className={`${itemClass} w-full gap-2`}
                >
                  Colecciones
                  <Chevron open={collectionsExpanded} />
                </button>
                <div
                  id="mobile-nav-collections"
                  className={`overflow-hidden transition-all duration-500 ${
                    collectionsExpanded ? "max-h-96 mt-3 opacity-100" : "pointer-events-none invisible max-h-0 opacity-0"
                  }`}
                >
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-4">
                    {collectionNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className="inline-flex min-h-11 items-center text-sm font-light text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li {...revealClass(200)}>
                <Link
                  href="/ofertas"
                  onClick={onClose}
                  aria-current={isActive("/ofertas") ? "page" : undefined}
                  className={itemClass}
                >
                  Destacados
                </Link>
              </li>

              <li {...revealClass(260)}>
                <button
                  type="button"
                  aria-expanded={customExpanded}
                  aria-controls="mobile-nav-medida"
                  onClick={() => setCustomExpanded((open) => !open)}
                  className={`${itemClass} w-full gap-2`}
                >
                  A medida
                  <Chevron open={customExpanded} />
                </button>
                <div
                  id="mobile-nav-medida"
                  className={`overflow-hidden transition-all duration-500 ${
                    customExpanded ? "max-h-[28rem] mt-3 opacity-100" : "pointer-events-none invisible max-h-0 opacity-0"
                  }`}
                >
                  <ul className="flex flex-col items-center">
                    {customMadeNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className="inline-flex min-h-11 items-center text-lg font-light text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li {...revealClass(320)}>
                <Link
                  href={KIT_PERGOLA_PATH}
                  onClick={onClose}
                  aria-current={isActive(KIT_PERGOLA_PATH) ? "page" : undefined}
                  className={itemClass}
                >
                  Kit pérgola
                </Link>
              </li>

              <li {...revealClass(380)}>
                <WhatsAppAnchor
                  href={contactUrl}
                  placement="mobile_nav"
                  productTitle="Contacto"
                  onClick={onClose}
                  className={itemClass}
                >
                  Contacto
                </WhatsAppAnchor>
              </li>
            </ul>
          </nav>

          <div className="text-center pt-6 border-t border-neutral-100">
            <p className="text-xs md:text-sm text-neutral-500 tracking-wider uppercase font-light mb-3">
              Artesanía en madera
            </p>
            <WhatsAppCTA
              href={contactUrl}
              label="Escríbenos por WhatsApp"
              placement="mobile_menu"
              productTitle="Menú móvil"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );
}

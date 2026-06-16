"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { ALL_PRODUCTS_COLLECTION_PATH, collectionNavLinks } from "@/lib/navigation";

const contactUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage("menú principal", [
    "Quiero revisar opciones de muebles, medidas y despacho.",
  ])
);

interface DesktopNavProps {
  isScrolled: boolean;
  isHomePage: boolean;
}

export default function DesktopNav({ isScrolled, isHomePage }: DesktopNavProps) {
  const pathname = usePathname();
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);

  const isTransparentHomeHeader = isHomePage && !isScrolled;
  const textColor = isTransparentHomeHeader || (!isHomePage) ? "text-white" : "text-neutral-900";
  const hoverColor = isTransparentHomeHeader || (!isHomePage) ? "hover:text-neutral-300" : "hover:text-neutral-600";
  const activeIndicator = isTransparentHomeHeader || (!isHomePage) ? "bg-white" : "bg-neutral-900";

  const isActive = (href: string) => pathname === href;

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setCollectionsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setCollectionsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: ALL_PRODUCTS_COLLECTION_PATH },
    { label: "Colecciones", href: null, hasDropdown: true },
    { label: "Destacados", href: "/ofertas" },
    { label: "Peldaños a medida", href: "/peldanos-a-medida" },
    { label: "Contacto", href: contactUrl, external: true },
  ];

  return (
    <nav className="hidden lg:flex items-center h-full">
      <ul className="flex items-center gap-0.5 h-full">
        {navItems.map((item) => (
          <li key={item.label} className="relative h-full flex items-center">
            {item.hasDropdown ? (
              <div
                ref={collectionsRef}
                className="h-full flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-2 py-2 text-xs font-light tracking-tight transition-colors duration-200 ${textColor} ${hoverColor}`}
                >
                  {item.label}
                  <FaChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    collectionsOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-lg shadow-lg border border-neutral-100 p-3 min-w-48">
                    <ul className="flex flex-col gap-0.5">
                      {collectionNavLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={`block px-3 py-1.5 text-xs font-light text-neutral-600 rounded-md transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-900 ${
                              isActive(link.href) ? "bg-neutral-50 text-neutral-900" : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : item.external ? (
              <a
                href={item.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-2 text-xs font-light tracking-tight transition-colors duration-200 ${textColor} ${hoverColor}`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href!}
                className={`relative px-2 py-2 text-xs font-light tracking-tight transition-colors duration-200 ${textColor} ${hoverColor}`}
              >
                {item.label}
                {isActive(item.href!) && (
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 ${activeIndicator} rounded-full`} />
                )}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

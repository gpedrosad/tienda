"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import DesktopNav from "@/app/components/DesktopNav";
import WhatsAppCTA from "@/app/components/ui/WhatsAppCTA";
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const headerContactUrl = buildWhatsAppUrl(
  buildGeneralWhatsAppMessage("menú principal", [
    "Quiero revisar opciones de muebles, medidas y despacho.",
  ])
);

const loadMobileMenu = () => import("@/app/components/MobileMenu");
const loadSearchModal = () => import("@/app/components/SearchModal");
const MobileMenu = dynamic(loadMobileMenu, { ssr: false });
const SearchModal = dynamic(loadSearchModal, { ssr: false });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasOpenedMenu, setHasOpenedMenu] = useState(false);
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // El logo es blanco: la barra es transparente sobre el hero de la home y carbón cálido en el resto.
  const isTransparentHeader = isHomePage && !isScrolled && !isMenuOpen;

  const headerBackgroundClass = isTransparentHeader
    ? "bg-transparent border-b border-transparent"
    : "bg-ink/95 backdrop-blur-md border-b border-white/10 shadow-sm";

  const iconButtonClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => {
    if (!isMenuOpen) setHasOpenedMenu(true);
    setIsMenuOpen((current) => !current);
  };
  const openSearch = () => {
    setHasOpenedSearch(true);
    setIsSearchOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setHasOpenedSearch(true);
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBackgroundClass}`}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-10">
          <div className="relative flex h-16 items-center justify-between gap-4 md:h-20 lg:gap-8">
            <button
              onClick={toggleMenu}
              onPointerEnter={() => void loadMobileMenu()}
              onFocus={() => void loadMobileMenu()}
              className={`lg:hidden ${iconButtonClass}`}
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <FaTimes size={22} className="md:w-6 md:h-6" />
              ) : (
                <FaBars size={22} className="md:w-6 md:h-6" />
              )}
            </button>

            <Link
              href="/"
              className="absolute left-1/2 block h-12 w-[4.625rem] shrink-0 -translate-x-1/2 transition-opacity duration-300 hover:opacity-80 md:h-14 md:w-[5.375rem] lg:static lg:translate-x-0"
            >
              <Image
                src="/logonegro.png"
                alt="Idea Madera"
                fill
                sizes="86px"
                className="object-contain object-center brightness-0 invert"
                priority
              />
            </Link>

            <DesktopNav />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={openSearch}
                onPointerEnter={() => void loadSearchModal()}
                onFocus={() => void loadSearchModal()}
                className={iconButtonClass}
                aria-label="Buscar"
              >
                <FaSearch size={18} />
              </button>
              <WhatsAppCTA
                href={headerContactUrl}
                label="Cotizar"
                placement="desktop_nav"
                productTitle="Contacto"
                size="sm"
                fullWidthMobile={false}
                className="hidden lg:inline-flex"
              />
            </div>
          </div>
        </div>
      </header>
      {hasOpenedMenu && <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />}
      {hasOpenedSearch && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}

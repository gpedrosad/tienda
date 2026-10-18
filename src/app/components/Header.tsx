"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import DesktopNav from "@/app/components/DesktopNav";

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
  const isSolidHeader = isScrolled || !isHomePage;

  const headerBackgroundClass = isSolidHeader
    ? isHomePage
      ? "bg-white/95 backdrop-blur-md shadow-sm"
      : "bg-black/90 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const isDarkInternalHeader = isSolidHeader && !isHomePage && !isMenuOpen;
  const isTransparentHomeHeader = isHomePage && !isScrolled;
  const headerTextColor = isTransparentHomeHeader || !isHomePage ? "text-white" : "text-neutral-900";

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
        <div className="mx-auto px-5 md:px-12 lg:px-20">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center h-16 md:h-20">
            <div className="flex min-w-0 items-center justify-start">
              <DesktopNav
                isScrolled={isScrolled}
                isHomePage={isHomePage}
              />
              <button
                onClick={toggleMenu}
                onPointerEnter={() => void loadMobileMenu()}
                onFocus={() => void loadMobileMenu()}
                className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition-colors duration-300 ${headerTextColor} ${isMenuOpen ? "text-neutral-900" : ""}`}
                aria-label="Menú"
              >
                {isMenuOpen ? (
                  <FaTimes size={22} className="md:w-6 md:h-6" />
                ) : (
                  <FaBars size={22} className="md:w-6 md:h-6" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="relative block h-12 w-[4.625rem] shrink-0 transition-opacity duration-300 hover:opacity-80 md:h-14 md:w-[5.375rem]"
              >
                <Image
                  src="/logonegro.png"
                  alt="Idea Madera"
                  fill
                  sizes="86px"
                  className={`object-contain object-center ${
                    isDarkInternalHeader || isTransparentHomeHeader ? "brightness-0 invert" : ""
                  }`}
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={openSearch}
                onPointerEnter={() => void loadSearchModal()}
                onFocus={() => void loadSearchModal()}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition-colors duration-300 ${headerTextColor}`}
                aria-label="Buscar"
              >
                <FaSearch size={18} />
              </button>
              <div className="w-[38px] md:w-[46px]"></div>
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

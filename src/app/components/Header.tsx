"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import DesktopNav from "@/app/components/DesktopNav";
import MobileMenu from "@/app/components/MobileMenu";
import SearchModal from "@/app/components/SearchModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            <div className="flex items-center justify-start">
              <DesktopNav
                isScrolled={isScrolled}
                isHomePage={isHomePage}
              />
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className={`lg:hidden p-2 -ml-2 focus:outline-none transition-colors duration-300 ${headerTextColor} ${isMenuOpen ? "text-neutral-900" : ""}`}
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
              <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
                <Image
                  src="/logonegro.png"
                  alt="Idea Madera"
                  width={80}
                  height={80}
                  className={`w-20 h-20 md:w-24 md:h-24 object-contain ${
                    isDarkInternalHeader || isTransparentHomeHeader ? "brightness-0 invert" : ""
                  }`}
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 focus:outline-none transition-colors duration-300 ${headerTextColor}`}
                aria-label="Buscar"
              >
                <FaSearch size={18} />
              </button>
              <div className="w-[38px] md:w-[46px]"></div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

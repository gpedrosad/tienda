"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isSolidHeader = isScrolled || !isHomePage;
  const headerBackgroundClass = isSolidHeader
    ? isHomePage
      ? "bg-white/95 backdrop-blur-md shadow-sm"
      : "bg-black/90 backdrop-blur-md shadow-sm"
    : "bg-transparent";
  const headerControlColorClass =
    isSolidHeader && !isHomePage ? "text-white" : "text-neutral-900";
  const isDarkInternalHeader = isSolidHeader && !isHomePage && !isMenuOpen;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevenir scroll cuando el menú está abierto
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBackgroundClass}`}
    >
      <div className="container mx-auto px-5 md:px-12 lg:px-20">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Botón de menú hamburguesa */}
          <button
            onClick={toggleMenu}
            className={`relative z-50 p-2 -ml-2 focus:outline-none transition-colors duration-300 ${
              isSolidHeader ? headerControlColorClass : "text-white"
            } ${isMenuOpen ? "text-neutral-900" : ""}`}
            aria-label="Menú"
          >
            {isMenuOpen ? (
              <FaTimes size={22} className="md:w-6 md:h-6" />
            ) : (
              <FaBars size={22} className="md:w-6 md:h-6" />
            )}
          </button>

          {/* Logo centrado */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 hover:opacity-80"
          >
            <Image
              src="/logonegro.png"
              alt="Idea Madera"
              width={80}
              height={80}
              className={`w-20 h-20 md:w-24 md:h-24 object-contain ${
                isDarkInternalHeader ? "brightness-0 invert" : ""
              }`}
              priority
            />
          </Link>

          {/* Espacio para mantener el layout centrado */}
          <div className="w-[38px] md:w-[46px]"></div>
        </div>
      </div>

      {/* Menú overlay full-screen */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav
          ref={menuRef}
          className="flex items-center justify-center h-full"
        >
          <ul className="flex flex-col items-center space-y-8 md:space-y-10">
            <li className="overflow-hidden">
              <Link
                href="/"
                onClick={closeMenu}
                className="block text-3xl md:text-5xl font-light text-neutral-900 hover:text-neutral-600 transition-all duration-300 tracking-tight"
              >
                Inicio
              </Link>
            </li>
            <li className="overflow-hidden">
              <Link
                href="/collections/todos-los-productos"
                onClick={closeMenu}
                className="block text-3xl md:text-5xl font-light text-neutral-900 hover:text-neutral-600 transition-all duration-300 tracking-tight"
              >
                Productos
              </Link>
            </li>
            <li className="overflow-hidden">
              <Link
                href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, quiero más información sobre sus productos"
                onClick={closeMenu}
                className="block text-3xl md:text-5xl font-light text-neutral-900 hover:text-neutral-600 transition-all duration-300 tracking-tight"
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Información adicional en el menú */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-xs md:text-sm text-neutral-500 tracking-wider uppercase font-light">
              Artesanía en madera
            </p>
          </div>
        </nav>
      </div>

      {/* Overlay oscuro cuando el menú está abierto */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>
    </header>
  );
}

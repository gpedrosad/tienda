"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

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

  return (
    <header className="bg-black text-white py-4 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <Link href="/">
          <Image
            src="/logonegro.png"
            alt="Logo MiEmpresa"
            width={100}
            height={100}
          />
        </Link>

        {/* Espacio para mantener el layout centrado */}
        <div className="w-7"></div>
      </div>

      {isMenuOpen && (
        <nav
          ref={menuRef}
          className="bg-black absolute left-0 right-0 top-full z-10"
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/" onClick={closeMenu} className="hover:text-gray-300 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, quiero más información sobre sus productos" onClick={closeMenu} className="hover:text-gray-300 transition-colors">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
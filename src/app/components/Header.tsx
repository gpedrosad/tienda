"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { cartCount, toggleCart } = useCart();

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

        <button
          onClick={toggleCart}
          className="relative text-white focus:outline-none"
        >
          <AiOutlineShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </button>
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
            {/* <li>
              <Link href="/products" onClick={closeMenu} className="hover:text-gray-300 transition-colors">
                Todos
              </Link>
            </li> */}
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
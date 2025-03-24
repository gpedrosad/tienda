// app/components/Header.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-black text-white py-4 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Hamburger Icon - Left */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Logo - Centrado */}
        <Link href="/">
          <Image
            src="/logonegro.png"
            alt="Logo MiEmpresa"
            width={100}
            height={100}
          />
        </Link>

        {/* Cart Button - Right */}
        <button onClick={toggleCart} className="relative text-white focus:outline-none">
          <AiOutlineShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="bg-black absolute left-0 right-0 top-full z-10">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a href="/" className="hover:text-gray-300 transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300 transition-colors">
                Nosotros
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-gray-300 transition-colors">
                Productos
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300 transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
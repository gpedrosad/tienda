'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className="bg-black text-white py-4 relative">
      <div className="container mx-auto px-4 flex justify-center items-center">
        {/* Clickable Logo */}
        <Link href="/">
          <Image 
            src="/logonegro.png" 
            alt="Logo MiEmpresa" 
            width={100} 
            height={100} 
          />
        </Link>
      </div>

      {/* Hamburger Icon - Right Centered */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Navigation (optional, you can remove this if you only want hamburger) */}
      {/* 
      <nav className="hidden md:flex absolute left-0 right-0 justify-center top-full mt-2">
        <ul className="flex space-x-6">
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
      */}

      {/* Navigation Menu (Mobile + Desktop) */}
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
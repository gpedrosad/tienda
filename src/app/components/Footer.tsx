'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="container mx-auto px-5 md:px-12 lg:px-20">
        {/* Contenido principal del footer */}
        <div className="py-12 md:py-16 lg:py-20">
          {/* Grid layout minimalista */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            
            {/* Logo y descripción - Ocupa más espacio en desktop */}
            <div className="lg:col-span-5 space-y-6">
              <Link href="/" className="inline-block">
                <Image 
                  src="/logonegro.png" 
                  alt="Idea Madera" 
                  width={100} 
                  height={100} 
                  className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-90 hover:opacity-100 transition-opacity" 
                />
              </Link>
              <div className="space-y-3 max-w-sm">
                <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-light">
                  Artesanía en madera
                </p>
                <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
                  31 años creando productos de madera con dedicación, calidad y diseño excepcional.
                </p>
              </div>
            </div>

            {/* Navegación rápida */}
            <div className="lg:col-span-2">
              <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-light mb-4 md:mb-6">
                Navegación
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors duration-300 font-light"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/collections/todos-los-productos" 
                    className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors duration-300 font-light"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="https://api.whatsapp.com/send?phone=56995497838&text=Hola, quiero más información sobre sus productos" 
                    className="text-sm md:text-base text-neutral-300 hover:text-white transition-colors duration-300 font-light"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="lg:col-span-3">
              <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-light mb-4 md:mb-6">
                Contacto
              </h3>
              <ul className="space-y-3 text-sm md:text-base text-neutral-400 font-light">
                <li>
                  <a 
                    href="mailto:hola@ideamadera.cl" 
                    className="hover:text-white transition-colors duration-300 block"
                  >
                    hola@ideamadera.cl
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/56995497838" 
                    className="hover:text-white transition-colors duration-300 block"
                  >
                    +569 9549 7838
                  </a>
                </li>
                <li className="pt-1">
                  <span className="text-neutral-500">
                    Boyén Sector 01<br />
                    Chillán, Chile
                  </span>
                </li>
              </ul>
            </div>

            {/* Redes sociales */}
            <div className="lg:col-span-2">
              <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-500 font-light mb-4 md:mb-6">
                Síguenos
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/ideamadera.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all duration-300"
                >
                  <FaFacebookF size={16} />
                </a>
                <a
                  href="https://instagram.com/ideamadera.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all duration-300"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://wa.me/56995497838"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Línea divisoria sutil */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-light">
            <p>© 2025 Idea Madera. Todos los derechos reservados.</p>
            <p className="tracking-wide">Hecho con dedicación en Chile</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client';

import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        {/* Centered Logo and Company Name */}
        <div className="flex flex-col items-center mb-10">
          <Image 
            src="/logonegro.png" 
            alt="Logo MiEmpresa" 
            width={120} 
            height={120} 
            className="mb-3" 
          />
        </div>
        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-300 hover:text-gray-100 transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-300 hover:text-gray-100 transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-gray-100 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-gray-100 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                Email:{' '}
                <a href="mailto:info@miempresa.com" className="hover:text-gray-100 transition-colors">
                  info@miempresa.com
                </a>
              </li>
              <li>
                Teléfono:{' '}
                <a href="tel:+1234567890" className="hover:text-gray-100 transition-colors">
                  +1 234 567 890
                </a>
              </li>
              <li>Dirección: Av. Principal 123, Ciudad, País</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-300 hover:text-white transition-colors text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-300 hover:text-white transition-colors text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-white transition-colors text-xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Additional Section (Optional) */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Acerca de</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Somos una empresa comprometida con la excelencia y la innovación, buscando siempre ofrecer lo mejor a nuestros clientes.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
          © 2024 MiEmpresa. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
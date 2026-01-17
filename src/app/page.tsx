"use client";

import React, { useState } from "react";
import FAQ from "@/app/components/FAQ";
import FabricaVideo from "@/app/components/FabricaVideo";
import HeroBanner from "@/app/components/HeroBanner";
import { products, Product } from "@/data/products";
import { AiOutlineWhatsApp } from "react-icons/ai";

// Componente principal Home
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  // Obtener categorías únicas
  const categories = ["Todas", ...Array.from(new Set(products.map(p => p.category)))];

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Formatear precio en formato chileno
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CL")}`;
  };

  // Generar URL de WhatsApp
  const getWhatsAppUrl = (productName: string) => {
    const message = `Consulta por ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/56995497838?text=${encodedMessage}`;
  };

  return (
    <>
      <HeroBanner />

      {/* Sección de Productos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-left md:text-center font-poppins">
          Nuestro Catálogo
        </h2>

        {/* Barra de búsqueda y filtros */}
        <div className="mb-8 space-y-4">
          {/* Búsqueda */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Filtro por categoría */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de productos */}
        <p className="text-gray-600 mb-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"} encontrados
        </p>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Imagen del producto */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center p-4">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Información del producto */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-4">
                  {formatPrice(product.price)}
                </p>

                {/* Botón de WhatsApp */}
                <a
                  href={getWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <AiOutlineWhatsApp size={24} />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </section>

      <FabricaVideo />
      <FAQ />
    </>
  );
}
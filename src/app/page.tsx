"use client";

import React, { useEffect, useMemo, useState } from "react";
import FAQ from "@/app/components/FAQ";
import FabricaVideo from "@/app/components/FabricaVideo";
import HeroBanner from "@/app/components/HeroBanner";
import ProductCard from "@/app/components/ProductCard";
import Reveal from "@/app/components/Reveal";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts, sortProductsForCatalog } from "@/lib/catalog";
import { buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

const homeWhatsAppMessage = buildGeneralWhatsAppMessage("inicio de Idea Madera", [
  "Estoy revisando el catálogo y quiero orientación para elegir un producto.",
]);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const visibleProducts = useMemo(() => getVisibleProducts(products), []);
  const categoryOptions = useMemo(() => getCategoryOptions(visibleProducts), [visibleProducts]);
  const sortedProducts = useMemo(() => sortProductsForCatalog(visibleProducts), [visibleProducts]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("cat");
    const categoryExists = categoryOptions.some((option) => option.category === categoryParam);

    if (categoryParam && categoryExists) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryOptions]);

  const filteredProducts = sortedProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    const nextUrl = new URL(window.location.href);
    if (category === "Todas") {
      nextUrl.searchParams.delete("cat");
    } else {
      nextUrl.searchParams.set("cat", category);
    }
    nextUrl.hash = "catalogo";
    window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  };

  return (
    <div className="pb-28 md:pb-32">
      <HeroBanner />

      <section id="catalogo" className="max-w-7xl mx-auto scroll-mt-24 px-4 py-12">
        <Reveal as="header" className="mb-8">
          <h2 className="text-4xl font-bold text-left md:text-center font-poppins tracking-[-0.02em] text-balance">
            Nuestro Catálogo
          </h2>
        </Reveal>

        <Reveal delay={80} className="mb-8 space-y-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-neutral-900"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("Todas")}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-semibold ${
                selectedCategory === "Todas"
                  ? "bg-black text-white shadow-sm"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Todas <span className="opacity-70">({visibleProducts.length})</span>
            </button>
            {categoryOptions.map(({ category, count }) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`filter-pill px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedCategory === category
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category} <span className="opacity-70">({count})</span>
              </button>
            ))}
          </div>
        </Reveal>

        <p
          key={`${selectedCategory}-${searchTerm}-${filteredProducts.length}`}
          className="count-animate text-gray-600 mb-6"
        >
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "producto" : "productos"} encontrados
        </p>

        <div
          key={`${selectedCategory}-${searchTerm}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-enter"
              style={{ "--i": Math.min(index, 11) } as React.CSSProperties}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Reveal className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </Reveal>
        )}
      </section>

      <FabricaVideo />
      <FAQ />

      <WhatsAppButton
        productTitle="Idea Madera"
        priceLabel="Atención directa · cotiza por WhatsApp"
        buttonLabel="Consultar por WhatsApp"
        prefilledMessage={homeWhatsAppMessage}
        alwaysVisible
      />
    </div>
  );
}

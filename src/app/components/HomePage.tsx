"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FAQ from "@/app/components/FAQ";
import FabricaVideo from "@/app/components/FabricaVideo";
import HeroBanner from "@/app/components/HeroBanner";
import ProductCard from "@/app/components/ProductCard";
import Reveal from "@/app/components/Reveal";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { buttonClasses } from "@/app/components/ui/Button";
import Chip, { chipRowClassName } from "@/app/components/ui/Chip";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts, sortProductsForCatalog } from "@/lib/catalog";
import { ALL_PRODUCTS_HANDLE } from "@/lib/collection-seo";
import { SINCE_FOUNDING } from "@/lib/founding";
import { buildGeneralWhatsAppMessage } from "@/lib/whatsapp";

const CATALOG_PREVIEW_LIMIT = 12;

const homeShortcuts = [
  {
    href: "/muebles-chillan",
    title: "Muebles en Chillán",
    line: "Mesas, sillas, bancas y piezas a medida.",
  },
  {
    href: "/puertas-a-medida",
    title: "Puertas a medida",
    line: "Interior o exterior, según tu vano.",
  },
  {
    href: "/kit-pergola",
    title: "Kit pérgola",
    line: "Herrajes para madera de 3×3. No incluye maderas.",
  },
  {
    href: "/cubiertas-a-medida",
    title: "Cubiertas a medida",
    line: "Mesones, barras y cubiertas de madera a medida.",
  },
] as const;

const homeWhatsAppMessage = buildGeneralWhatsAppMessage("inicio de Idea Madera", [
  "Estoy revisando el catálogo y quiero orientación para elegir un producto.",
]);

export default function HomePage() {
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
  const previewProducts = filteredProducts.slice(0, CATALOG_PREVIEW_LIMIT);
  const activeCategory = categoryOptions.find((option) => option.category === selectedCategory);
  const catalogHref = activeCategory
    ? `/collections/${activeCategory.handle}`
    : `/collections/${ALL_PRODUCTS_HANDLE}`;

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
    <main className="pb-24 md:pb-32">
      <HeroBanner />

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-4 md:grid-cols-4 md:gap-4 md:py-8">
          {homeShortcuts.map((shortcut) => (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="rounded-2xl border border-line bg-white p-4 transition-colors hover:border-wood/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <p className="font-display font-medium tracking-tight text-ink">{shortcut.title}</p>
              <p className="mt-1 text-sm leading-snug text-ink-muted">{shortcut.line}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="catalogo" className="max-w-7xl mx-auto scroll-mt-24 px-4 py-10">
        <Reveal as="header" className="mb-8">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink text-balance font-semibold">
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
              className="search-input w-full px-4 py-3 border border-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink/80 focus:border-ink"
            />
          </div>

          <div className={chipRowClassName} role="group" aria-label="Filtrar por categoría">
            <Chip active={selectedCategory === "Todas"} onClick={() => handleCategoryChange("Todas")}>
              Todas <span className="opacity-70">({visibleProducts.length})</span>
            </Chip>
            {categoryOptions.map(({ category, count }) => (
              <Chip
                key={category}
                active={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
              >
                {category} <span className="opacity-70">({count})</span>
              </Chip>
            ))}
          </div>
        </Reveal>

        <p
          key={`${selectedCategory}-${searchTerm}-${filteredProducts.length}`}
          className="count-animate text-ink-muted mb-6"
        >
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "producto" : "productos"} encontrados
        </p>

        <div
          key={`${selectedCategory}-${searchTerm}`}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6"
        >
          {previewProducts.map((product, index) => (
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
            <p className="text-ink-muted text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </Reveal>
        )}

        <div className="mt-8">
          <Link href={catalogHref} className={buttonClasses({ variant: "secondary" })}>
            Ver todo el catálogo
          </Link>
        </div>
      </section>

      <FabricaVideo />

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-8 md:px-12 md:py-14">
          <p className="text-sm leading-relaxed text-ink/80 md:text-base">
            Taller familiar en Chillán. Somos{" "}
            <Link href="/muebles-chillan" className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood">
              fábrica de muebles en Chillán
            </Link>{" "}
            {SINCE_FOUNDING}. Si buscas atención local desde Ñuble, entra a nuestra página de{" "}
            <Link href="/muebles-chillan" className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood">
              mueblería en Chillán
            </Link>. Encuentra{" "}
            <Link href="/collections/mesas" className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood">
              mesas de comedor de madera
            </Link>{" "}para 4, 6 u 8 personas,{" "}
            <Link href="/collections/sillas" className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood">
              sillas de madera para comedor
            </Link>{" "}y{" "}
            <Link href="/mesas-de-centro" className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood">
              mesas ratonas
            </Link>{" "}para el living.
          </p>
        </div>
      </section>

      <FAQ />

      <WhatsAppButton
        productTitle="Idea Madera"
        priceLabel="Atención directa · cotiza por WhatsApp"
        buttonLabel="Cotizar por WhatsApp"
        prefilledMessage={homeWhatsAppMessage}
        watchSelector="#inicio-hero"
      />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { buttonClasses } from "@/app/components/ui/Button";
import ProductCard, { CATALOG_GRID_SIZES } from "@/app/components/ProductCard";
import { getFeaturedProducts } from "@/lib/catalog";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildOpenGraphDefaults,
  buildTwitterDefaults,
  clampMetaDescription,
  documentTitle,
} from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

const pageTitle = documentTitle("Productos destacados");
const pageDescription = clampMetaDescription(
  "Selección de productos destacados de Idea Madera con fotografía disponible para revisar, comparar y cotizar por WhatsApp.",
);

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: "/ofertas",
  },
  openGraph: {
    ...buildOpenGraphDefaults(),
    title: pageTitle,
    description: pageDescription,
    url: "/ofertas",
  },
  twitter: {
    ...buildTwitterDefaults(),
    title: pageTitle,
    description: pageDescription,
  },
};

export default function OfertasPage() {
  const featuredProducts = getFeaturedProducts(12);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Productos destacados", path: "/ofertas" },
      ]),
      buildItemListSchema(
        "Productos destacados Idea Madera",
        featuredProducts.map((product) => ({
          name: product.name,
          url: getProductPath(product),
        })),
      ),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-ink">
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>
              <span className="mx-1.5">/</span>
              <span>Destacados</span>
            </nav>

            <div className="mt-6 max-w-3xl">
              <h1 className="font-display text-4xl tracking-tight md:text-6xl font-semibold">
                Productos destacados para cotizar
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                Reunimos piezas con buena referencia visual para que puedas comparar estilos,
                precios y pedir una cotización clara por WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-ink-muted">
                {featuredProducts.length} productos seleccionados
              </p>
            </div>
            <Link href="/#catalogo" className={buttonClasses({ variant: "secondary" })}>
              Ver catálogo completo
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} sizes={CATALOG_GRID_SIZES} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

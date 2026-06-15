import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { getFeaturedProducts } from "@/lib/catalog";

const pageTitle = "Productos destacados | Idea Madera";
const pageDescription =
  "Selección de productos destacados de Idea Madera con fotografía disponible para revisar, comparar y cotizar por WhatsApp.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/ofertas",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/ofertas",
    siteName: "Idea Madera",
    locale: "es_CL",
    type: "website",
  },
};

export default function OfertasPage() {
  const featuredProducts = getFeaturedProducts(12);

  return (
    <main className="bg-white text-neutral-900">
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
          <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span>Destacados</span>
          </nav>

          <div className="mt-6 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Selección actual
            </p>
            <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">
              Productos destacados para cotizar
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              Reunimos piezas con buena referencia visual para que puedas comparar estilos,
              precios y pedir una cotización clara por WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-neutral-600">
              {featuredProducts.length} productos seleccionados
            </p>
          </div>
          <Link
            href="/#catalogo"
            className="inline-flex w-fit rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

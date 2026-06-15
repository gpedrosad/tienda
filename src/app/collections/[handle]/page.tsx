import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/data/products";
import {
  getCategoryByHandle,
  getCategoryOptions,
  getVisibleProducts,
  slugifyCategory,
  sortProductsForCatalog,
} from "@/lib/catalog";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildOpenGraphDefaults,
  buildTwitterDefaults,
} from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

const ALL_PRODUCTS_HANDLE = "todos-los-productos";

function getCollection(handle: string) {
  const visibleProducts = getVisibleProducts(products);

  if (handle === ALL_PRODUCTS_HANDLE) {
    return {
      title: "Todos los productos",
      description: "Explora muebles de madera, piezas a medida y productos disponibles para cotizar.",
      products: sortProductsForCatalog(visibleProducts),
    };
  }

  const category = getCategoryByHandle(handle);
  if (!category) return null;

  return {
    title: category,
    description: `Productos de ${category.toLowerCase()} fabricados por Idea Madera para cotizar por WhatsApp.`,
    products: sortProductsForCatalog(
      visibleProducts.filter((product) => product.category === category),
    ),
  };
}

export function generateStaticParams() {
  return [
    { handle: ALL_PRODUCTS_HANDLE },
    ...getCategoryOptions().map((option) => ({ handle: option.handle })),
  ];
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);

  if (!collection) {
    return {
      title: "Colección no encontrada",
      description: "Catálogo de productos de Idea Madera.",
      robots: { index: false, follow: true },
    };
  }

  const ogDefaults = buildOpenGraphDefaults();

  return {
    title: collection.title,
    description: collection.description,
    alternates: {
      canonical: `/collections/${handle}`,
    },
    openGraph: {
      ...ogDefaults,
      title: collection.title,
      description: collection.description,
      url: `/collections/${handle}`,
    },
    twitter: {
      ...buildTwitterDefaults(),
      title: collection.title,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = getCollection(handle);

  if (!collection) notFound();

  const collectionPath = `/collections/${handle}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: collection.title, path: collectionPath },
      ]),
      buildItemListSchema(
        collection.title,
        collection.products.map((product) => ({
          name: product.name,
          url: getProductPath(product),
        })),
      ),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-neutral-900">
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
          <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span>{collection.title}</span>
          </nav>

          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Catálogo Idea Madera
              </p>
              <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">
                {collection.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
                {collection.description}
              </p>
            </div>
            <Link
              href="/#catalogo"
              className="inline-flex w-fit rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
            >
              Ver filtros
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href={`/collections/${ALL_PRODUCTS_HANDLE}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                handle === ALL_PRODUCTS_HANDLE
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              Todos
            </Link>
            {getCategoryOptions().map((option) => (
              <Link
                key={option.category}
                href={`/collections/${slugifyCategory(option.category)}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  handle === option.handle
                    ? "bg-neutral-900 text-white"
                    : "bg-white text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {option.category} <span className="opacity-70">({option.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <p className="mb-6 text-sm text-neutral-600">
          {collection.products.length}{" "}
          {collection.products.length === 1 ? "producto disponible" : "productos disponibles"}
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
    </>
  );
}

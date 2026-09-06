import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiOutlineWhatsApp } from "react-icons/ai";
import JsonLd from "@/app/components/JsonLd";
import ProductCard from "@/app/components/ProductCard";
import WhatsappButton from "@/app/components/WhatsAppButton";
import { products } from "@/data/products";
import {
  getCategoryByHandle,
  getCategoryOptions,
  getVisibleProducts,
  slugifyCategory,
  sortProductsForCatalog,
} from "@/lib/catalog";
import {
  ALL_PRODUCTS_HANDLE,
  getCollectionSeo,
} from "@/lib/collection-seo";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildItemListSchema,
  buildOpenGraphDefaults,
  buildTwitterDefaults,
  SITE_NAME,
} from "@/lib/seo";
import { buildWhatsAppUrl, getProductPath } from "@/lib/whatsapp";

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

function getCollection(handle: string) {
  const visibleProducts = getVisibleProducts(products);

  if (handle === ALL_PRODUCTS_HANDLE) {
    const seo = getCollectionSeo(handle);
    return {
      ...seo,
      category: undefined,
      products: sortProductsForCatalog(visibleProducts),
      isEmpty: false,
    };
  }

  const category = getCategoryByHandle(handle);
  if (!category) return null;

  const seo = getCollectionSeo(handle, category);
  const categoryProducts = sortProductsForCatalog(
    visibleProducts.filter((product) => product.category === category),
  );

  return {
    ...seo,
    category,
    products: categoryProducts,
    // SEO-03: una categoría conocida sin productos publicables no debe quedar
    // indexable accidentalmente (thin content con canonical propio).
    isEmpty: categoryProducts.length === 0,
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
  const fullTitle = `${collection.metadataTitle} | ${SITE_NAME}`;

  return {
    title: collection.metadataTitle,
    description: collection.description,
    alternates: {
      canonical: `/collections/${handle}`,
    },
    ...(collection.isEmpty
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      ...ogDefaults,
      title: fullTitle,
      description: collection.description,
      url: `/collections/${handle}`,
    },
    twitter: {
      ...buildTwitterDefaults(),
      title: fullTitle,
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
        { name: collection.h1, path: collectionPath },
      ]),
      // ItemList solo con elementos visibles (SEO-14): una colección vacía
      // no emite lista para no contradecir el contenido real de la página.
      ...(!collection.isEmpty
        ? [
            buildItemListSchema(
              `${collection.metadataTitle} | ${SITE_NAME}`,
              collection.products.map((product) => ({
                name: product.name,
                url: getProductPath(product),
              })),
            ),
          ]
        : []),
      ...(collection.faqs?.length ? [buildFaqPageSchema(collection.faqs)] : []),
    ],
  };

  const whatsappMessage = collection.whatsappLines
    ? ["Hola Idea Madera", ...collection.whatsappLines].join("\n")
    : null;
  const whatsappHref = whatsappMessage ? buildWhatsAppUrl(whatsappMessage) : null;

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
            <span>{collection.h1}</span>
          </nav>

          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Catálogo Idea Madera
              </p>
              <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">
                {collection.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
                {collection.intro ?? collection.description}
              </p>
              {collection.relatedLinks && collection.relatedLinks.length > 0 ? (
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-700">
                  {collection.relatedLinks.slice(0, 2).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="underline underline-offset-4 hover:text-neutral-900"
                    >
                      {link.title}
                    </Link>
                  ))}
                </p>
              ) : null}
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
        {collection.isEmpty ? (
          <div className="max-w-2xl">
            <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
              Por ahora no tenemos {collection.category?.toLowerCase()} con fotografías publicadas.
              Estamos preparando nuevos modelos: si te interesa esta categoría, escríbenos por
              WhatsApp y te contamos qué podemos fabricar a pedido.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              Mientras tanto, puedes revisar{" "}
              <Link
                href={`/collections/${ALL_PRODUCTS_HANDLE}`}
                className="underline underline-offset-4 hover:text-neutral-900"
              >
                todo el catálogo disponible
              </Link>{" "}
              o las{" "}
              <Link
                href="/collections/mesas"
                className="underline underline-offset-4 hover:text-neutral-900"
              >
                mesas de madera
              </Link>{" "}
              que sí tenemos publicadas.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-neutral-600">
              {collection.products.length}{" "}
              {collection.products.length === 1 ? "producto disponible" : "productos disponibles"}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collection.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      {collection.guideTitle && collection.guideParagraphs && !collection.isEmpty ? (
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
              {collection.guideTitle}
            </h2>
            {collection.guideParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {collection.faqs && collection.faqs.length > 0 && !collection.isEmpty ? (
        <section className="border-t border-neutral-200">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 border-t border-neutral-200">
              {collection.faqs.map((item) => (
                <article key={item.question} className="border-b border-neutral-200 py-5">
                  <h3 className="text-base font-medium text-neutral-900 md:text-lg">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {collection.relatedLinks && collection.relatedLinks.length > 0 && !collection.isEmpty ? (
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <h2 className="text-xl font-light tracking-tight text-neutral-900">
              También te puede interesar
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {collection.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-400"
                >
                  <p className="text-sm font-medium text-neutral-900">{link.title}</p>
                  <p className="mt-1 text-xs text-neutral-600">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {whatsappHref && collection.whatsappTitle && !collection.isEmpty ? (
        <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 text-white md:p-9">
            <h2 className="text-2xl font-light tracking-tight md:text-3xl">
              Cotiza tu mesa de madera
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              Escribe por WhatsApp el modelo o las medidas, la terminación y tu comuna.
              Confirmamos plazo de fabricación y despacho.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#1ebe57] md:text-base"
            >
              <AiOutlineWhatsApp size={22} />
              Cotizar {collection.whatsappTitle.toLowerCase()}
            </a>
          </div>
        </section>
      ) : null}
    </main>
    {whatsappMessage && collection.whatsappTitle ? (
      <WhatsappButton
        productTitle={collection.whatsappTitle}
        buttonLabel={`Cotizar ${collection.whatsappTitle.toLowerCase()}`}
        prefilledMessage={whatsappMessage}
        alwaysVisible
      />
    ) : null}
    </>
  );
}

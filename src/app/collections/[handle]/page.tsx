import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import WhatsAppCTA from "@/app/components/ui/WhatsAppCTA";
import Chip, { chipRowClassName } from "@/app/components/ui/Chip";
import ProductCard, { CATALOG_GRID_SIZES } from "@/app/components/ProductCard";
import WhatsappButton from "@/app/components/WhatsAppButton";
import { products } from "@/data/products";
import { faqAnswerText } from "@/lib/inline-link-text";
import { InlineLinkedText } from "@/lib/inline-links";
import {
  getCategoryByHandle,
  getCategoryOptions,
  getVisibleProducts,
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
  clampMetaDescription,
  documentTitle,
  SITE_NAME,
} from "@/lib/seo";
import { buildWhatsAppUrl, getProductPath } from "@/lib/whatsapp";

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

function splitFirstSentence(text: string) {
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char !== "." && char !== "!" && char !== "?") continue;
    if (char === "." && /\d/.test(text[index - 1] ?? "") && /\d/.test(text[index + 1] ?? "")) {
      continue;
    }
    return {
      lead: text.slice(0, index + 1).trim(),
      rest: text.slice(index + 1).trim(),
    };
  }

  return { lead: text.trim(), rest: "" };
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
  const fullTitle = documentTitle(collection.metadataTitle);
  const description = clampMetaDescription(collection.description);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: `/collections/${handle}`,
    },
    ...(collection.isEmpty
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      ...ogDefaults,
      title: fullTitle,
      description,
      url: `/collections/${handle}`,
    },
    twitter: {
      ...buildTwitterDefaults(),
      title: fullTitle,
      description,
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
      ...(collection.faqs?.length
        ? [
            buildFaqPageSchema(collection.faqs),
          ]
        : []),
    ],
  };

  const whatsappMessage = collection.whatsappLines
    ? ["Hola Idea Madera", ...collection.whatsappLines].join("\n")
    : null;
  const whatsappHref = whatsappMessage ? buildWhatsAppUrl(whatsappMessage) : null;
  const { lead: introLead, rest: introRest } = splitFirstSentence(
    collection.intro ?? collection.description,
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-ink">
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-20 md:pb-14 md:pt-32">
          <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span>{collection.h1}</span>
          </nav>

          <div className="mt-6">
            <div>
              <h1 className="font-display text-4xl tracking-tight md:text-6xl font-semibold">
                {collection.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                {introLead}
              </p>
            </div>
          </div>

          <nav aria-label="Categorías" className={`mt-7 ${chipRowClassName}`}>
            <Chip
              href={`/collections/${ALL_PRODUCTS_HANDLE}`}
              active={handle === ALL_PRODUCTS_HANDLE}
            >
              Todos
            </Chip>
            {getCategoryOptions().map((option) => (
              <Chip
                key={option.category}
                href={`/collections/${option.handle}`}
                active={handle === option.handle}
              >
                {option.category} <span className="opacity-70">({option.count})</span>
              </Chip>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        {collection.isEmpty ? (
          <div className="max-w-2xl">
            <p className="text-sm leading-relaxed text-ink-muted md:text-base">
              Por ahora no tenemos {collection.category?.toLowerCase()} con fotografías publicadas.
              Estamos preparando nuevos modelos: si te interesa esta categoría, escríbenos por
              WhatsApp y te contamos qué podemos fabricar a pedido.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              Mientras tanto, puedes revisar{" "}
              <Link
                href={`/collections/${ALL_PRODUCTS_HANDLE}`}
                className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood"
              >
                todo el catálogo disponible
              </Link>{" "}
              o las{" "}
              <Link
                href="/collections/mesas"
                className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood"
              >
                mesas de madera
              </Link>{" "}
              que sí tenemos publicadas.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-ink-muted">
              {collection.products.length}{" "}
              {collection.products.length === 1 ? "producto disponible" : "productos disponibles"}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collection.products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index === 0}
                  sizes={CATALOG_GRID_SIZES}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {introRest ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <p className="text-sm leading-relaxed text-ink-muted md:text-base">{introRest}</p>
          </div>
        </section>
      ) : null}

      {collection.guideTitle && collection.guideParagraphs && !collection.isEmpty ? (
        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl font-semibold">
              {collection.guideTitle}
            </h2>
            {collection.guideParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base"
              >
                <InlineLinkedText text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {collection.faqs && collection.faqs.length > 0 && !collection.isEmpty ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl font-semibold">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 border-t border-line">
              {collection.faqs.map((item, index) => (
                <details
                  key={item.question}
                  className="group border-b border-line py-5"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-sm text-base font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 md:text-lg [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base md:text-lg tracking-tight font-medium">{item.question}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-ink-muted transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                    {faqAnswerText(item.answer)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {collection.relatedLinks && collection.relatedLinks.length > 0 && !collection.isEmpty ? (
        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <h2 className="font-display text-xl tracking-tight text-ink font-medium">
              También te puede interesar
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {collection.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-line bg-white p-4 transition-colors hover:border-wood/40"
                >
                  <p className="text-sm font-medium text-ink">{link.title}</p>
                  <p className="mt-1 text-xs text-ink-muted">{link.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {whatsappHref && collection.whatsappTitle && !collection.isEmpty ? (
        <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-line bg-ink p-7 text-white md:p-9">
            <h2 className="font-display text-2xl tracking-tight md:text-3xl font-semibold">
              Cotiza {collection.whatsappTitle.toLowerCase()}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-canvas/70 md:text-base">
              Escribe por WhatsApp el modelo o las medidas, la terminación y tu comuna.
              Confirmamos plazo de fabricación y despacho.
            </p>
            <WhatsAppCTA
              href={whatsappHref}
              label={`Cotizar ${collection.whatsappTitle.toLowerCase()}`}
              placement="collection_cta"
              tone="dark"
              productTitle={collection.whatsappTitle}
              className="mt-7"
            />
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

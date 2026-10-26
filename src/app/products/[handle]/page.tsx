import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineEnvironment, AiOutlinePhone } from "react-icons/ai";
import { buttonClasses } from "@/app/components/ui/Button";
import Accordion from "@/app/components/Accordion";
import ProductGallery from "@/app/components/ProductGallery";
import RelatedProducts from "@/app/components/RelatedProducts";
import SocialProof from "@/app/components/SocialProof";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import WhatsAppInlineCTA from "@/app/components/WhatsAppInlineCTA";
import JsonLd from "@/app/components/JsonLd";
import { products, type Product } from "@/data/products";
import { hasProductImage, productImageAlt, slugifyCategory } from "@/lib/catalog";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildProductOfferSchema,
  clampMetaDescription,
  documentTitle,
  SITE_NAME,
  DEFAULT_PRODUCTION_DAYS,
  SITE_URL,
  WARRANTY_MONTHS,
} from "@/lib/seo";
import { faqAnswerText } from "@/lib/inline-link-text";
import { InlineLinkedText, plainTextFromInlineLinks } from "@/lib/inline-links";
import { isDiningTableId, showsCoffeeTableGuide } from "@/lib/mesa-groups";
import { galleryImagesForProduct } from "@/lib/product-gallery";
import { getProductSeo } from "@/lib/product-seo";
import {
  buildProductWhatsAppMessage,
  formatCLP,
  getProductPath,
  WHATSAPP_PHONE,
} from "@/lib/whatsapp";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

const quoteSteps = [
  {
    title: "Cuéntanos qué pieza te interesa",
    description: "El mensaje ya incluye producto, precio, link y referencia para acelerar la respuesta.",
  },
  {
    title: "Validamos medidas y terminación",
    description: "Te orientamos por WhatsApp sobre material, color, disponibilidad y despacho.",
  },
  {
    title: "Recibes una cotización clara",
    description: "Coordinamos pago, fabricación y envío según tu comuna o región.",
  },
];

const productFaqItems = [
  {
    question: "¿El precio publicado es final?",
    answer:
      "Es un precio de referencia del producto. La cotización final puede variar por medidas especiales, terminaciones, despacho o ajustes personalizados.",
  },
  {
    question: "¿Puedo pedir cambios de medida o color?",
    answer:
      "Sí. Al escribir por WhatsApp puedes contarnos las medidas, color o terminación que necesitas para revisar factibilidad y precio.",
  },
  {
    question: "¿Hacen envíos a todo Chile?",
    answer:
      "Sí. Fabricamos en Chillán y coordinamos envíos a todo Chile. Te indicamos opciones y tiempos según comuna o región al momento de cotizar.",
  },
  {
    question: "¿Qué garantía tiene el mueble?",
    answer: `Tiene ${WARRANTY_MONTHS} meses de garantía contra defectos de fabricación, desde la entrega.`,
  },
];

function findProduct(handle: string) {
  return products.find((item) => item.handle === handle || item.id === handle);
}

function getProductId(product: Product) {
  return product.handle || product.id;
}

function getGalleryImages(product: Product) {
  return galleryImagesForProduct(product);
}

function getProductDescription(product: Product) {
  return (
    product.description ??
    `${product.name} es una pieza de ${product.category.toLowerCase()} fabricada en madera, con foco en calidad, terminaciones cuidadas y durabilidad para uso diario.`
  );
}

function getShortPitch(product: Product) {
  return (
    product.shortPitch ??
    `Diseño en madera para sumar calidez, estructura y una terminación cuidada a tu espacio.`
  );
}

function dimensionToken(value: string) {
  return value.replace(/\s*cm\s*$/i, "").trim();
}

function getHeroSpecLine(product: Product) {
  const parts: string[] = [];
  if (product.material) parts.push(product.material);

  const width = product.dimensions?.width;
  const depth = product.dimensions?.depth;
  const height = product.dimensions?.height;
  const diameter = product.dimensions?.diameter;
  const axes = [width, depth, height].filter((value): value is string => Boolean(value));

  if (diameter && !width && !depth) {
    const bits = [`diámetro ${dimensionToken(diameter)}`];
    if (height) bits.push(`alto ${dimensionToken(height)}`);
    parts.push(`${bits.join(" × ")} cm`);
  } else if (axes.length > 0) {
    parts.push(`${axes.map(dimensionToken).join("×")} cm`);
  }

  if (product.finish) parts.push(product.finish);
  return parts.length > 0 ? parts.join(" · ") : null;
}

function getSpecRows(product: Product) {
  const rows: Array<{ label: string; value?: string }> = [
    { label: "Ancho", value: product.dimensions?.width },
    { label: "Fondo", value: product.dimensions?.depth },
    { label: "Alto", value: product.dimensions?.height },
    { label: "Diámetro", value: product.dimensions?.diameter },
    { label: "Material", value: product.material },
    { label: "Terminación", value: product.finish },
  ];

  return rows.filter((row): row is { label: string; value: string } => Boolean(row.value));
}

export function generateStaticParams() {
  const handles = new Set<string>();

  products.filter(hasProductImage).forEach((product) => {
    handles.add(getProductId(product));
  });

  return Array.from(handles).map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = findProduct(handle);

  if (!product || !hasProductImage(product)) {
    return {
      title: "Producto no encontrado",
      description: "Producto del catálogo de Idea Madera.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const primaryImage = galleryImagesForProduct(product)[0] ?? product.imageUrl;
  const shortPitch = getShortPitch(product);
  const seo = getProductSeo(product, shortPitch);
  const description = clampMetaDescription(seo.description);
  const canonicalPath = getProductPath(product);
  const fullTitle = documentTitle(seo.metadataTitle);
  const imageAlt = productImageAlt(product);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: "es_CL",
      type: "website",
      ...(primaryImage
        ? {
            images: [
              {
                url: primaryImage,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(primaryImage ? { images: [primaryImage] } : {}),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = findProduct(handle);

  if (!product || !hasProductImage(product)) {
    notFound();
  }

  const origin = SITE_URL;
  const productId = getProductId(product);
  const productPath = getProductPath(product);
  const canonicalUrl = `${origin}${productPath}`;
  const galleryImages = getGalleryImages(product);
  const primaryImage = galleryImages[0] ?? product.imageUrl;
  const productDescription = getProductDescription(product);
  const imageAlt = productImageAlt(product);
  const whatsappMessage = buildProductWhatsAppMessage(product, origin);
  const priceLabel = formatCLP(product.price);
  const specRows = getSpecRows(product);
  const productFeatures = product.features?.slice(0, 4) ?? [];
  const productionDays = product.productionDays ?? DEFAULT_PRODUCTION_DAYS;
  const heroSpecLine = getHeroSpecLine(product);
  const availability = product.inStock === false ? "https://schema.org/PreOrder" : "https://schema.org/InStock";
  const offer =
    Number.isFinite(product.price) && product.price > 0
      ? buildProductOfferSchema({
          url: canonicalUrl,
          price: product.price,
          availability,
          productionDays,
        })
      : undefined;

  const categoryHandle = slugifyCategory(product.category);
  const categoryPath = `/collections/${categoryHandle}`;

  const allProductImages = galleryImages
    .filter((img) => img)
    .map((img) => (img.startsWith("http") ? img : `${origin}${img}`));

  const productSchema = {
    "@type": "Product",
    name: product.name,
    ...(allProductImages.length > 0 ? { image: allProductImages } : {}),
    description: plainTextFromInlineLinks(productDescription),
    sku: productId,
    category: product.category,
    ...(product.material ? { material: product.material } : {}),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    ...(offer ? { offers: offer } : {}),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      productSchema,
      buildBreadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: product.category, path: categoryPath },
        { name: product.name, path: productPath },
      ]),
      buildFaqPageSchema(productFaqItems),
    ],
  };

  const trustItems = [
    "Retiro en taller (Chillán) o envío a todo Chile",
    `Fabricación ${productionDays} días hábiles en total`,
    "Cambios 30 días",
    "Pago tarjeta/transferencia",
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <main className="bg-white text-ink">
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-4 pt-20 md:pt-32 pb-10 md:pb-16">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-ink-muted">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Inicio
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={categoryPath} className="hover:text-ink">
                    {product.category}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-ink">{product.name}</li>
              </ol>
            </nav>

            <div className="mt-2 grid gap-2 md:mt-8 md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
              <div className="order-1">
                {galleryImages.length > 0 ? (
                  <ProductGallery images={galleryImages} productName={product.name} imageAlt={imageAlt} />
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-line bg-white">
                    <p className="text-ink-muted">Este producto todavía no tiene fotos cargadas.</p>
                  </div>
                )}
              </div>

              <div className="order-2 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-line bg-white p-4 shadow-sm md:p-8">
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-ink">
                    {product.name}
                  </h1>
                  {heroSpecLine ? (
                    <p className="mt-1.5 text-sm text-ink-muted">{heroSpecLine}</p>
                  ) : null}

                  <p className="mt-2 font-display text-3xl md:mt-6 md:text-4xl font-semibold tracking-tight text-ink">
                    {priceLabel}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">IVA incluido</p>

                  <div className="mt-2 md:mt-7">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto]">
                      <div id="product-hero-cta">
                        <WhatsAppInlineCTA
                          productTitle={product.name}
                          productId={productId}
                          productPrice={product.price}
                          placement="product_hero"
                          fullWidth
                          prefilledMessage={whatsappMessage}
                        />
                      </div>
                      <a
                        href={`tel:+${WHATSAPP_PHONE}`}
                        data-placement="product_hero_call"
                        className={buttonClasses({
                          variant: "secondary",
                          fullWidthMobile: false,
                          className: "hidden sm:inline-flex",
                        })}
                      >
                        <AiOutlinePhone size={20} aria-hidden="true" />
                        Llamar
                      </a>
                    </div>
                    <a
                      href={`tel:+${WHATSAPP_PHONE}`}
                      data-placement="product_hero_call_mobile"
                      className={buttonClasses({
                        variant: "ghost",
                        fullWidthMobile: false,
                        className: "mt-2 py-3 sm:hidden",
                      })}
                    >
                      o llámanos al +56 9 9549 7838
                    </a>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 md:mt-6 md:gap-2.5">
                    {trustItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-line bg-canvas px-3 py-2.5 text-xs text-ink/80 md:py-3 md:text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink/80 md:mt-4 md:text-lg">
                    {getShortPitch(product)}
                  </p>

                  {productFeatures.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {productFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/80">
                          <AiOutlineCheckCircle className="mt-0.5 shrink-0 text-wood" size={18} aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-canvas px-3 py-1.5 text-xs text-ink/80 md:text-sm">
                    <AiOutlineEnvironment className="text-wood" size={17} aria-hidden="true" />
                    <span>Fabricación en Chillán · Envío a todo Chile</span>
                  </div>

                  <p className="mt-4 text-xs text-ink-muted md:mt-5 md:text-sm">
                    {product.stockNote ?? "Fabricación a pedido · Te respondemos por WhatsApp en horario hábil."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Descripción y ficha técnica
            </h2>
          </div>
          <div className="space-y-8">
            <div className="border-t border-line pt-6">
              <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                Descripción
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink/80">
                <InlineLinkedText text={productDescription} />
              </p>
              {isDiningTableId(product.id) ? (
                <p className="mt-3 text-sm leading-relaxed">
                  <Link
                    href="/mesas-de-comedor-a-medida"
                    className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood"
                  >
                    ¿Necesitas otra medida? Mesas de comedor a medida
                  </Link>
                </p>
              ) : null}
              {showsCoffeeTableGuide(product.id) ? (
                <p className="mt-3 text-sm leading-relaxed">
                  <Link
                    href="/guias/medidas-mesa-de-centro"
                    className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood"
                  >
                    Cómo elegir la medida de una mesa de centro o mesa ratona
                  </Link>
                </p>
              ) : null}
              {product.id === "silla-milan-lenga" ? (
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  La Milán es de comedor. En el catálogo de{" "}
                  <Link
                    href="/collections/sillas"
                    className="text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood"
                  >
                    sillas de madera
                  </Link>{" "}
                  también está la Kentucky, que es de descanso y no de comedor.
                </p>
              ) : null}
            </div>

            {specRows.length > 0 && (
              <div className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                  Detalles del producto
                </h3>

                <dl className="mt-5 divide-y divide-line/70 rounded-2xl border border-line bg-white">
                  {specRows.map((row) => (
                    <div key={row.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                      <dt className="text-ink-muted">{row.label}</dt>
                      <dd className="text-right text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>

        <section className="bg-ink text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                De la idea a la cotización en 3 pasos
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {quoteSteps.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-wood font-display text-base text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-canvas/70">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <RelatedProducts currentProductId={product.id} category={product.category} />

        <section className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
          <div className="mb-6 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Envíos, pagos y fabricación
            </h2>
          </div>
          <Accordion productionDays={productionDays} />
        </section>

        <SocialProof productionDays={productionDays} />

        <section className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
          <div className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Antes de escribirnos
            </h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {productFaqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base md:text-lg font-medium tracking-tight text-ink">
                  {item.question}
                  <span className="text-wood transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm md:text-base leading-relaxed text-ink-muted">
                  {faqAnswerText(item.answer)}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:pb-28">
          <div className="rounded-3xl bg-ink p-7 text-white md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                  ¿Quieres confirmar medidas, despacho o terminación?
                </h2>
                <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-canvas/70">
                  Escríbenos por WhatsApp y te respondemos con la información necesaria para avanzar sin vueltas.
                </p>
              </div>
              <div id="product-closing-cta">
                <WhatsAppInlineCTA
                  productTitle={product.name}
                  productId={productId}
                  productPrice={product.price}
                  placement="banner"
                  label="Cotizar ahora"
                  prefilledMessage={whatsappMessage}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton
        productTitle={product.name}
        productId={productId}
        productPrice={product.price}
        priceLabel={priceLabel}
        imageUrl={primaryImage}
        prefilledMessage={whatsappMessage}
        watchSelector="#product-hero-cta, #product-closing-cta"
      />
    </>
  );
}

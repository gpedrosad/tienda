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
import { InlineLinkedText, plainTextFromInlineLinks } from "@/lib/inline-links";
import { isDiningTableId, showsCoffeeTableGuide } from "@/lib/mesa-groups";
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

const productImagesById: Record<string, string[]> = {
  "mesa-nordica": [
    "/images/mesa-nordica-1.jpg",
    "/images/mesa-nordica-2.jpg",
    "/images/mesa-nordica-3.jpg",
    "/images/mesa-nordica-4.jpg",
    "/images/mesa-nordica-5.jpg",
  ],
  "silla-kentucky": [
    "/images/silla-kentucky-1.jpg",
    "/images/silla-kentucky-2.jpg",
    "/images/silla-kentucky-3.jpg",
    "/images/silla-kentucky-4.jpg",
  ],
  "mesa-comedor-tripode": [
    "/images/mesa-tripode-1.jpg",
    "/images/mesa-tripode-2.jpg",
    "/images/mesa-tripode-3.jpg",
    "/images/mesa-tripode-4.jpg",
    "/images/mesa-tripode-5.jpg",
    "/images/mesa-tripode-6.jpg",
    "/images/mesa-tripode-7.jpg",
    "/images/mesa-tripode-8.jpg",
    "/images/mesa-tripode-9.jpg",
    "/images/mesa-tripode-10.jpg",
    "/images/mesa-tripode-11.jpg",
  ],
  "silla-milan-lenga": [
    "/images/silla-milan-lenga-main.jpg",
  ],
  "perchero-madera-verona": [
    "/images/perchero-verona-1.jpg",
    "/images/perchero-verona-2.png",
    "/images/perchero-verona-3.png",
    "/images/perchero-verona-4.jpg",
    "/images/perchero-verona-5.jpg",
  ],
  "mesa-comedor-redonda-ferrara": [
    "/images/mesa-ferrara-redonda-3.jpg",
    "/images/mesa-ferrara-redonda-2.jpg",
    "/images/mesa-ferrara-redonda-4.jpg",
  ],
  "arrimo-griego": ["/images/arrimo-griego-vista-1.jpg", "/images/arrimo-griego-vista-2.jpg"],
  "mesa-centro-roma": [
    "/images/mesa-centro-roma-vista-1.jpg",
    "/images/mesa-centro-roma-vista-2.jpg",
    "/images/mesa-centro-roma-vista-3.jpg",
    "/images/mesa-centro-roma-vista-4.jpg",
  ],
  "banca-capri": ["/images/banca-capri-vista-1.jpg", "/images/banca-capri-vista-2.jpg"],
  "banca-capri-negra": ["/images/banca-capri-negra-vista-1.jpg", "/images/banca-capri-negra-vista-2.jpg"],
  "mesa-tripode-redonda-negra": [
    "/images/mesa-roma-redonda-patas-negras-vista-1.jpg",
    "/images/mesa-roma-redonda-patas-negras-vista-2.jpg",
    "/images/mesa-roma-redonda-patas-negras-vista-3.jpg",
  ],
  "banca-griega": [
    "/images/banca-griega-vista-1.jpg",
    "/images/banca-griega-vista-2.jpg",
    "/images/banca-griega-vista-3.jpg",
    "/images/banca-griega-vista-4.jpg",
  ],
  "mesa-frida-redonda": [
    "/images/mesa-frida-redonda-vista-1.jpg",
    "/images/mesa-frida-redonda-vista-2.jpg",
    "/images/mesa-frida-redonda-vista-3.jpg",
  ],
  "mesa-tripode-ratona": [
    "/images/mesa-tripode-ratona-vista-1.jpg",
    "/images/mesa-tripode-ratona-vista-2.jpg",
    "/images/mesa-tripode-ratona-vista-3.jpg",
  ],
  "mesa-centro-ferrara": ["/images/mesa-centro-ferrara-vista-1.jpg", "/images/mesa-centro-ferrara-vista-2.jpg"],
  "mesa-comedor-tripode-redonda": [
    "/images/mesa-tripode-redonda-vista-1.jpg",
    "/images/mesa-tripode-redonda-vista-2.jpg",
    "/images/mesa-tripode-redonda-vista-3.jpg",
  ],
  "mesa-comedor-tripode-negra": [
    "/images/mesa-tripode-negra-2.jpg",
    "/images/mesa-tripode-negra-3.jpg",
    "/images/mesa-tripode-negra-4.jpg",
    "/images/mesa-tripode-negra-5.jpg",
  ],
  "mesa-comedor-roma-negra": ["/images/mesa-roma-negra-main.jpg"],
  "mesa-comedor-roma-natural": [
    "/images/mesa-comedor-roma-madera-main.jpg",
    "/images/mesa-roma-madera-2.webp",
  ],
  "mesa-comedor-cantabria": [
    "/images/mesa-comedor-madera-modelo-cantabria-main.jpg",
    "/images/mesa-cantabria-2.jpg",
    "/images/mesa-cantabria-3.jpg",
    "/images/mesa-cantabria-4.jpg",
    "/images/mesa-cantabria-5.jpg",
    "/images/mesa-cantabria-6.jpg",
  ],
  "mesa-comedor-redonda-novara": [
    "/images/mesa-comedor-redonda-modelo-novara-main.jpg",
    "/images/mesa-novara-2.jpg",
    "/images/mesa-novara-3.jpg",
    "/images/mesa-novara-4.jpg",
  ],
};

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
  const productId = getProductId(product);
  return productImagesById[productId] ?? (product.imageUrl ? [product.imageUrl] : []);
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

  const productId = getProductId(product);
  const primaryImage = productImagesById[productId]?.[0] ?? product.imageUrl;
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

      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-100 to-white">
          <div className="mx-auto max-w-7xl px-4 pt-20 md:pt-32 pb-10 md:pb-16">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-neutral-900">
                    Inicio
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={categoryPath} className="hover:text-neutral-900">
                    {product.category}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-neutral-900">{product.name}</li>
              </ol>
            </nav>

            <div className="mt-2 grid gap-2 md:mt-8 md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
              <div className="order-1">
                {galleryImages.length > 0 ? (
                  <ProductGallery images={galleryImages} productName={product.name} imageAlt={imageAlt} />
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-neutral-200 bg-white">
                    <p className="text-neutral-600">Este producto todavía no tiene fotos cargadas.</p>
                  </div>
                )}
              </div>

              <div className="order-2 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {product.category}
                  </p>
                  <h1 className="mt-1 text-3xl sm:text-4xl md:mt-3 md:text-5xl font-light tracking-tight leading-tight text-neutral-900">
                    {product.name}
                  </h1>
                  {heroSpecLine ? (
                    <p className="mt-1.5 text-sm text-neutral-600">{heroSpecLine}</p>
                  ) : null}

                  <p className="mt-2 text-3xl md:mt-6 md:text-4xl font-light tracking-tight text-neutral-900">
                    {priceLabel}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">IVA incluido</p>

                  <div className="mt-2 md:mt-7">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
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
                        className="rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-700 md:py-3 md:text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:mt-4 md:text-lg">
                    {getShortPitch(product)}
                  </p>

                  {productFeatures.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {productFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700">
                          <AiOutlineCheckCircle className="mt-0.5 shrink-0 text-[#25D366]" size={18} aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5 text-xs text-neutral-700 md:text-sm">
                    <AiOutlineEnvironment className="text-neutral-700" size={17} aria-hidden="true" />
                    <span>Fabricación en Chillán · Envío a todo Chile</span>
                  </div>

                  <p className="mt-4 text-xs text-neutral-500 md:mt-5 md:text-sm">
                    {product.stockNote ?? "Fabricación a pedido · Te respondemos por WhatsApp en horario hábil."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Detalles
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              Descripción y ficha técnica
            </h2>
          </div>
          <div className="space-y-8">
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-xl font-light tracking-tight text-neutral-900">
                Descripción
              </h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-700">
                <InlineLinkedText text={productDescription} />
              </p>
              {isDiningTableId(product.id) ? (
                <p className="mt-3 text-sm leading-relaxed">
                  <Link
                    href="/mesas-de-comedor-a-medida"
                    className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                  >
                    ¿Necesitas otra medida? Mesas de comedor a medida
                  </Link>
                </p>
              ) : null}
              {showsCoffeeTableGuide(product.id) ? (
                <p className="mt-3 text-sm leading-relaxed">
                  <Link
                    href="/guias/medidas-mesa-de-centro"
                    className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                  >
                    Cómo elegir la medida de una mesa de centro o mesa ratona
                  </Link>
                </p>
              ) : null}
            </div>

            {specRows.length > 0 && (
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-xl font-light tracking-tight text-neutral-900">
                  Detalles del producto
                </h3>

                <dl className="mt-5 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white">
                  {specRows.map((row) => (
                    <div key={row.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                      <dt className="text-neutral-500">{row.label}</dt>
                      <dd className="text-right text-neutral-900">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </section>

        <section className="bg-neutral-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                Cómo cotizar
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">
                De la idea a la cotización en 3 pasos
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {quoteSteps.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-medium text-neutral-950">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-light tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <RelatedProducts currentProductId={product.id} category={product.category} />

        <section className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Compra con claridad
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              Envíos, pagos y fabricación
            </h2>
          </div>
          <Accordion productionDays={productionDays} />
        </section>

        <SocialProof productionDays={productionDays} />

        <section className="mx-auto w-full max-w-4xl px-4 py-10 md:py-14">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              Antes de escribirnos
            </h2>
          </div>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {productFaqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base md:text-lg font-light tracking-tight text-neutral-900">
                  {item.question}
                  <span className="text-neutral-400 transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm md:text-base leading-relaxed text-neutral-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:pb-28">
          <div className="rounded-3xl bg-neutral-950 p-7 text-white md:p-10">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">
                  Cotización rápida
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">
                  ¿Quieres confirmar medidas, despacho o terminación?
                </h2>
                <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-300">
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

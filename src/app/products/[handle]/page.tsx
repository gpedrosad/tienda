import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlinePhone, AiOutlineStar } from "react-icons/ai";
import Accordion from "@/app/components/Accordion";
import ProductGallery from "@/app/components/ProductGallery";
import RelatedProducts from "@/app/components/RelatedProducts";
import SocialProof from "@/app/components/SocialProof";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import WhatsAppInlineCTA from "@/app/components/WhatsAppInlineCTA";
import { products, type Product } from "@/data/products";
import {
  buildProductWhatsAppMessage,
  DEFAULT_SITE_URL,
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
  "silla-milan-lenga": [
    "/images/sillamilan/1sillamilan.jpg",
    "/images/sillamilan/2sillamilan.jpg",
    "/images/sillamilan/3sillamilan.jpg",
    "/images/sillamilan/4sillamilan.jpg",
    "/images/sillamilan/5sillamilan.jpg",
    "/images/sillamilan/6sillamilan.jpg",
  ],
  "arrimo-griego": ["/images/1ARRMINOGRIEGO.jpg", "/images/2ARRMINOGRIEGO.jpg"],
  "mesa-centro-roma": [
    "/images/1MESACENTROROMA.jpg",
    "/images/2MESACENTROROMA.jpg",
    "/images/3MESACENTROROMA.jpg",
    "/images/4MESACENTROROMA.jpg",
  ],
  "banca-capri": ["/images/1BANCACAPRI.jpg", "/images/2BANCACAPRI.jpg"],
  "banca-capri-negra": ["/images/1BANCACAPRINEGRA.jpg", "/images/2BANCACAPRINEGRA.jpg"],
  "mesa-tripode-redonda-negra": [
    "/images/1MESAROMAREDONDAPATASNEGRAS.jpg",
    "/images/2MESAROMAREDONDAPATASNEGRAS.jpg",
    "/images/3MESAROMAREDONDAPATASNEGRAS.jpg",
  ],
  "banca-griega": [
    "/images/1BANCAGRIEGA.jpg",
    "/images/2BANCAGRIEGA.jpg",
    "/images/3BANCAGRIEGA.jpg",
    "/images/4BANCAGRIEGA.jpg",
  ],
  "mesa-frida-redonda": [
    "/images/1MESAFRIDAREDONDA.jpg",
    "/images/2MESAFRIDAREDONDA.jpg",
    "/images/3MESAFRIDAREDONDA.jpg",
  ],
  "mesa-tripode-ratona": [
    "/images/1MESATRIPODERATONA.jpg",
    "/images/2MESATRIPODERATONA.jpg",
    "/images/3MESATRIPODERATONA.jpg",
  ],
  "mesa-centro-ferrara": ["/images/1MESAFERRARACENTRO.jpg", "/images/2MESAFERRARACENTRO.jpg"],
  "mesa-comedor-tripode-redonda": [
    "/images/1MESATRIPODEREDONDAMADERA.jpg",
    "/images/2MESATRIPODEREDONDAMADERA.jpg",
    "/images/3MESATRIPODEREDONDAMADERA.jpg",
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
    question: "¿Hacen envíos fuera de Santiago?",
    answer:
      "Sí, coordinamos envíos a todo Chile. Te indicamos opciones y tiempos según comuna o región al momento de cotizar.",
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

async function getRequestOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") ?? "https";

  return host ? `${proto}://${host}` : DEFAULT_SITE_URL;
}

export function generateStaticParams() {
  const handles = new Set<string>();

  products.forEach((product) => {
    handles.add(product.id);
    if (product.handle) handles.add(product.handle);
  });

  return Array.from(handles).map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = findProduct(handle);

  if (!product) {
    return {
      title: `Producto ${handle} | Idea Madera`,
      description: "Producto del catálogo de Idea Madera.",
    };
  }

  const productId = getProductId(product);
  const primaryImage = productImagesById[productId]?.[0] ?? product.imageUrl;
  const description = getShortPitch(product) || getProductDescription(product);
  const canonicalPath = getProductPath(product);

  return {
    title: `${product.name} | Idea Madera`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${product.name} | Idea Madera`,
      description,
      url: canonicalPath,
      siteName: "Idea Madera",
      locale: "es_CL",
      type: "website",
      ...(primaryImage
        ? {
            images: [
              {
                url: primaryImage,
                alt: product.name,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Idea Madera`,
      description,
      ...(primaryImage ? { images: [primaryImage] } : {}),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = findProduct(handle);

  if (!product) {
    return (
      <main className="bg-white text-neutral-900">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-4 pt-24">
          <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
            <Link href="/" className="hover:text-neutral-900">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span>Producto no encontrado</span>
          </nav>
          <h1 className="mt-6 text-4xl font-light tracking-tight text-neutral-900">
            No encontramos este producto
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600">
            Puede que el enlace haya cambiado. Puedes volver al catálogo y buscar una alternativa.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex w-fit rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  const origin = await getRequestOrigin();
  const productId = getProductId(product);
  const productPath = getProductPath(product);
  const canonicalUrl = `${origin}${productPath}`;
  const galleryImages = getGalleryImages(product);
  const primaryImage = galleryImages[0] ?? product.imageUrl;
  const absolutePrimaryImage = primaryImage?.startsWith("http")
    ? primaryImage
    : primaryImage
      ? `${origin}${primaryImage}`
      : undefined;
  const productDescription = getProductDescription(product);
  const whatsappMessage = buildProductWhatsAppMessage(product, origin);
  const priceLabel = formatCLP(product.price);
  const specRows = getSpecRows(product);
  const productFeatures = product.features?.slice(0, 4) ?? [];
  const productionDays = product.productionDays ?? 15;
  const shouldShowDetails = productFeatures.length > 0 || specRows.length > 0;
  const availability = product.inStock === false ? "https://schema.org/PreOrder" : "https://schema.org/InStock";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: absolutePrimaryImage ? [absolutePrimaryImage] : undefined,
    description: productDescription,
    sku: productId,
    brand: {
      "@type": "Brand",
      name: "Idea Madera",
    },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "CLP",
      price: product.price,
      availability,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const trustItems = [
    "Envíos a todo Chile",
    `Fabricación ${productionDays} días hábiles`,
    "Cambios 30 días",
    "Pago tarjeta/transferencia",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

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
                  <Link
                    href={`/?cat=${encodeURIComponent(product.category)}`}
                    className="hover:text-neutral-900"
                  >
                    {product.category}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-neutral-900">{product.name}</li>
              </ol>
            </nav>

            <div className="mt-5 grid gap-5 md:mt-8 md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
              <div className="order-1">
                {galleryImages.length > 0 ? (
                  <ProductGallery images={galleryImages} productName={product.name} />
                ) : (
                  <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-neutral-200 bg-white">
                    <p className="text-neutral-600">Este producto todavía no tiene fotos cargadas.</p>
                  </div>
                )}
              </div>

              <div className="order-2 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm md:p-8">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {product.category}
                  </p>
                  <h1 className="mt-2 text-3xl sm:text-4xl md:mt-3 md:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-neutral-900">
                    {product.name}
                  </h1>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-50 px-3 py-1.5 text-xs text-neutral-700 md:mt-4 md:text-sm">
                    <AiOutlineStar className="text-[#25D366]" size={17} />
                    <span>4.9 · basado en clientes verificados</span>
                  </div>

                  <p className="mt-4 text-3xl md:mt-6 md:text-4xl font-light tracking-tight text-neutral-900">
                    {priceLabel}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 md:mt-4 md:text-lg">
                    {getShortPitch(product)}
                  </p>

                  {productFeatures.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {productFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-700">
                          <AiOutlineCheckCircle className="mt-0.5 shrink-0 text-[#25D366]" size={18} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] md:mt-7">
                    <WhatsAppInlineCTA
                      productTitle={product.name}
                      productId={productId}
                      productPrice={product.price}
                      placement="inline"
                      fullWidth
                      prefilledMessage={whatsappMessage}
                    />
                    <a
                      href={`tel:+${WHATSAPP_PHONE}`}
                      className="hidden items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm md:text-base font-medium tracking-wide text-neutral-900 transition-colors hover:border-neutral-900 sm:inline-flex"
                    >
                      <AiOutlinePhone size={20} />
                      Llamar
                    </a>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-2.5">
                    {trustItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-700 md:py-3 md:text-sm"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-neutral-500 md:mt-5 md:text-sm">
                    {product.stockNote ?? "Respondemos en menos de 1 hora hábil."}
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
                {productDescription}
              </p>
            </div>

            {shouldShowDetails && (
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-xl font-light tracking-tight text-neutral-900">
                  Detalles del producto
                </h3>

                {productFeatures.length > 0 && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {productFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-neutral-700">
                        <AiOutlineCheckCircle className="mt-0.5 shrink-0 text-[#25D366]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {specRows.length > 0 && (
                  <dl className="mt-5 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white">
                    {specRows.map((row) => (
                      <div key={row.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                        <dt className="text-neutral-500">{row.label}</dt>
                        <dd className="text-right text-neutral-900">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
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
          <Accordion />
        </section>

        <SocialProof />

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
        </section>
      </main>

      <WhatsAppButton
        productTitle={product.name}
        productId={productId}
        productPrice={product.price}
        priceLabel={priceLabel}
        imageUrl={primaryImage}
        prefilledMessage={whatsappMessage}
      />
    </>
  );
}

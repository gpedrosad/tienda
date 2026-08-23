import type { Metadata } from "next";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import JsonLd from "@/app/components/JsonLd";
import ProductCard from "@/app/components/ProductCard";
import WhatsappButton from "@/app/components/WhatsAppButton";
import { products } from "@/data/products";
import { hasProductImage } from "@/lib/catalog";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildItemListSchema,
  buildOpenGraphDefaults,
  buildTwitterDefaults,
  SITE_NAME,
} from "@/lib/seo";
import { buildWhatsAppUrl, getProductPath } from "@/lib/whatsapp";

const canonicalPath = "/mesas-de-centro";
const pageTitle = "Mesas de Centro y Ratonas de Madera | Living Chile | Idea Madera";
const pageDescription =
  "Mesas de centro y ratonas de madera maciza para living: modelos Tripode, Ferrara, Roma, Hairpin y mas. Fabricacion artesanal en Chile. Cotiza por WhatsApp.";

const MESA_CENTRO_IDS = [
  "mesa-tripode-ratona",
  "mesa-centro-roma",
  "mesa-centro-ferrara",
  "mesa-centro-hairpin",
  "mesa-centro-bali",
  "mesa-centro-seul",
  "mesa-centro-taipei",
];

const mesasCentro = products
  .filter((p) => MESA_CENTRO_IDS.includes(p.id) && hasProductImage(p));

const faqItems = [
  {
    question: "¿Que es una mesa ratona?",
    answer:
      "Una mesa ratona es una mesa baja de living, tambien conocida como mesa de centro. El termino es comun en Chile y Argentina para referirse a la pieza que se ubica frente al sofa.",
  },
  {
    question: "¿Que tamano de mesa de centro necesito?",
    answer:
      "Como referencia, la mesa de centro deberia medir entre la mitad y dos tercios del largo del sofa. La altura ideal esta entre 40 y 50 cm para acceder comodamente desde el asiento.",
  },
  {
    question: "¿De que madera son las mesas de centro?",
    answer:
      "Nuestras mesas de centro estan fabricadas en madera maciza seleccionada, con terminacion en barniz natural o a eleccion. Cada pieza se produce de forma artesanal en nuestro taller en Chile.",
  },
  {
    question: "¿Puedo pedir medidas personalizadas?",
    answer:
      "Si. Fabricamos a medida. Escribenos por WhatsApp con las dimensiones que necesitas y te cotizamos sin compromiso.",
  },
  {
    question: "¿Envian mesas de centro a todo Chile?",
    answer:
      "Si, despachamos a todo Chile. Cotiza por WhatsApp para confirmar plazos y costos de envio a tu comuna.",
  },
];

const whatsappMessage = [
  "Hola Idea Madera",
  "Vengo desde la pagina de mesas de centro.",
  "Quiero cotizar una mesa de centro o ratona de madera.",
].join("\n");

const whatsappHref = buildWhatsAppUrl(whatsappMessage);

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: canonicalPath },
  keywords: [
    "mesa ratona",
    "mesa de centro",
    "mesa ratona de madera",
    "mesita ratona",
    "mesa de centro madera",
    "mesas ratonas",
    "mesa ratonera",
    "mesa de centro para living",
  ],
  openGraph: {
    ...buildOpenGraphDefaults(),
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
  },
  twitter: {
    ...buildTwitterDefaults(),
    title: pageTitle,
    description: pageDescription,
  },
};

export default function MesasDeCentroPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Mesas de centro", path: canonicalPath },
      ]),
      buildItemListSchema(
        `Mesas de Centro y Ratonas | ${SITE_NAME}`,
        mesasCentro.map((product) => ({
          name: product.name,
          url: getProductPath(product),
        })),
      ),
      buildFaqPageSchema(faqItems),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
              <Link href="/" className="hover:text-neutral-900">
                Inicio
              </Link>
              <span className="mx-1.5">/</span>
              <span>Mesas de centro</span>
            </nav>

            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Living &middot; {SITE_NAME}
                </p>
                <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">
                  Mesas de centro y ratonas de madera
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
                  Mesas de centro y ratonas de madera maciza para tu living. Formatos bajos ideales
                  frente al sofa: tripode, hairpin, estilo clasico y contemporaneo. Cotiza medidas y
                  terminacion por WhatsApp con envio a todo Chile.
                </p>
              </div>
              <Link
                href="/collections/mesas"
                className="inline-flex w-fit rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-900"
              >
                Ver todas las mesas
              </Link>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <p className="mb-6 text-sm text-neutral-600">
            {mesasCentro.length}{" "}
            {mesasCentro.length === 1 ? "producto disponible" : "productos disponibles"}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mesasCentro.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="text-2xl font-light tracking-tight md:text-3xl">
              ¿Que diferencia hay entre una mesa ratona y una mesa de centro?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              Mesa ratona es el termino mas usado en Chile y Argentina para referirse a una mesa baja
              de living. Es exactamente lo mismo que una mesa de centro: una pieza de altura reducida
              (entre 40 y 50 cm) que se ubica frente al sofa para apoyar objetos, decoracion o
              bandejas. En nuestro catalogo encontraras ambos nombres porque fabricamos las mismas
              piezas que se buscan con cualquiera de los dos terminos.
            </p>

            <h2 className="mt-10 text-2xl font-light tracking-tight md:text-3xl">
              Como elegir tu mesa de centro
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              El tamano ideal depende de tu sofa: la mesa deberia medir entre la mitad y dos tercios
              de su largo. La altura recomendada esta entre 40 y 50 cm para acceder comodamente
              desde el asiento. En cuanto a materiales, la madera maciza ofrece durabilidad y calidez
              natural. Elige un estilo que complemente tu living: lineas rectas para espacios
              modernos, patas tripode para un toque organico, o hairpin para un look mid-century.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-neutral-200">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="text-2xl font-light tracking-tight md:text-3xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 border-t border-neutral-200">
              {faqItems.map((item) => (
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

        {/* Related links */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <h2 className="text-xl font-light tracking-tight text-neutral-900">También te puede interesar</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/comedores-nordicos" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Comedores nórdicos</p>
                <p className="mt-1 text-xs text-neutral-600">Arma tu comedor de estilo escandinavo con mesas, sillas y bancas.</p>
              </Link>
              <Link href="/collections/mesas" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Todas las mesas</p>
                <p className="mt-1 text-xs text-neutral-600">Catálogo completo de mesas de madera para comedor y living.</p>
              </Link>
              <Link href="/muebles-a-medida" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Muebles a medida</p>
                <p className="mt-1 text-xs text-neutral-600">Fabricamos piezas personalizadas según tus medidas.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 text-white md:p-9">
            <h2 className="text-2xl font-light tracking-tight md:text-3xl">
              Cotiza tu mesa de centro
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              Escribenos por WhatsApp para consultar precio, medidas, terminacion y despacho a tu
              comuna. Fabricamos en madera maciza con envio a todo Chile.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#1ebe57] md:text-base"
            >
              <AiOutlineWhatsApp size={22} />
              Cotizar por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <WhatsappButton
        productTitle="Mesas de centro y ratonas"
        buttonLabel="Cotizar mesa de centro"
        prefilledMessage={whatsappMessage}
        alwaysVisible
      />
    </>
  );
}

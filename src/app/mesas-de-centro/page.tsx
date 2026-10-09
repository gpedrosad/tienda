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
const pageTitle = "Mesas Ratonas de Madera para Living | Chile";
const pageDescription =
  "Mesas ratonas de madera maciza para living: altura recomendada 40-50 cm según sofá. Trípode, Roma, Ferrara, Hairpin. Cotiza por WhatsApp con envío a todo Chile.";

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
    question: "¿Qué es una mesa ratona?",
    answer:
      "Una mesa ratona es una mesa baja de living, también conocida como mesa de centro. El término es común en Chile y Argentina para referirse a la pieza que se ubica frente al sofá. La altura típica es 40-50 cm.",
  },
  {
    question: "¿Qué diferencia hay entre mesa ratona y mesa de centro?",
    answer:
      "No hay diferencia: son dos nombres para la misma pieza. En Chile se usa 'mesa ratona' con más frecuencia, mientras que 'mesa de centro' es más común en otros países hispanohablantes.",
  },
  {
    question: "¿Qué altura debe tener una mesa ratona?",
    answer:
      "La altura recomendada es 40-50 cm, lo que permite alcanzar cómodamente desde el sofá. Si tu sofá tiene cojines muy gruesos, prefiere una mesa de 45-50 cm; si el sofá es bajo o firme, una mesa de 40 cm funciona bien.",
  },
  {
    question: "¿Qué tamaño de mesa ratona necesito según mi sofá?",
    answer:
      "Como referencia, la mesa ratona debería medir entre la mitad y dos tercios del largo del sofá. Por ejemplo, para un sofá de 180 cm, una mesa de 90-120 cm de largo se ve equilibrada.",
  },
  {
    question: "¿De qué madera son las mesas ratonas?",
    answer:
      "Nuestras mesas ratonas están fabricadas en madera maciza seleccionada, con terminación en barniz natural o a elección. Cada pieza se produce de forma artesanal en nuestro taller en Chile.",
  },
  {
    question: "¿Puedo pedir una mesa ratona con medidas personalizadas?",
    answer:
      "Sí. Fabricamos a medida. Escríbenos por WhatsApp con las dimensiones que necesitas y te cotizamos sin compromiso.",
  },
  {
    question: "¿Envían mesas ratonas a todo Chile?",
    answer:
      "Sí, despachamos a todo Chile. Cotiza por WhatsApp para confirmar plazos y costos de envío a tu comuna.",
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
                  Mesas ratonas de madera para living
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
                  Mesas ratonas de madera maciza para living: piezas bajas ideales frente al sofá.
                  La altura recomendada es 40-50 cm para alcanzar cómodamente desde el asiento.
                  El ancho debe ser entre la mitad y dos tercios del largo del sofá. Cotiza medidas
                  y terminación por WhatsApp con envío a todo Chile.
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
            {mesasCentro.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index === 0} />
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
              Altura recomendada de una mesa ratona según el sofá
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              La altura ideal de una mesa ratona está entre 40 y 50 cm, lo que permite alcanzar
              cómodamente desde el sofá sin tener que agacharse. Si tu sofá tiene cojines gruesos o
              muy blandos, prefiere una mesa más alta (cercana a los 50 cm) para compensar el
              hundimiento del asiento. Si el sofá es bajo o firme, una mesa de 40 cm funciona bien.
            </p>

            <h2 className="mt-10 text-2xl font-light tracking-tight md:text-3xl">
              Tamaño de la mesa ratona según el largo del sofá
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
              Como referencia general, la mesa ratona debería medir entre la mitad y dos tercios del
              largo del sofá. Por ejemplo, si tu sofá mide 180 cm, una mesa de 90-120 cm de largo se
              ve equilibrada. Si el espacio es pequeño o hay mucha circulación, puedes optar por una
              mesa más angosta. En cuanto a materiales, la madera maciza ofrece durabilidad y calidez
              natural. Elige un estilo que complemente tu living: líneas rectas para espacios
              modernos, patas trípode para un toque orgánico, o hairpin para un look mid-century.
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
              <Link href="/guias/cuidado-muebles-madera" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Cuidado de muebles de madera</p>
                <p className="mt-1 text-xs text-neutral-600">Guía práctica para mantener tus mesas ratonas y muebles de madera.</p>
              </Link>
              <Link href="/comedores-nordicos" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Comedores nórdicos</p>
                <p className="mt-1 text-xs text-neutral-600">Arma tu comedor de estilo escandinavo con mesas, sillas y bancas.</p>
              </Link>
              <Link href="/collections/mesas" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Mesas ratonas de madera</p>
                <p className="mt-1 text-xs text-neutral-600">Explora todas las mesas ratonas y de comedor en el catálogo.</p>
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

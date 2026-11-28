import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import WhatsAppCTA from "@/app/components/ui/WhatsAppCTA";
import ProductCard, { CATALOG_GRID_SIZES } from "@/app/components/ProductCard";
import WhatsappButton from "@/app/components/WhatsAppButton";
import { products } from "@/data/products";
import { hasProductImage } from "@/lib/catalog";
import { faqAnswerText } from "@/lib/inline-link-text";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildItemListSchema,
  buildOpenGraphDefaults,
  buildTwitterDefaults,
  SITE_NAME,
} from "@/lib/seo";
import { buildWhatsAppUrl, getProductPath } from "@/lib/whatsapp";

const canonicalPath = "/mesas-de-comedor";
const pageTitle = "Mesas de Comedor de Madera | Fabricadas en Chillán";
const pageDescription =
  "Mesas de comedor de madera maciza, rectangulares y redondas, en natural o negro. Fabricadas en Chillán desde 1993, envío a todo Chile. Cotiza por WhatsApp.";

const MESA_COMEDOR_IDS = [
  "mesa-comedor-tripode",
  "mesa-comedor-tripode-negra",
  "mesa-comedor-tripode-redonda",
  "mesa-tripode-redonda-negra",
  "mesa-comedor-redonda-ferrara",
  "mesa-comedor-redonda-novara",
  "mesa-comedor-niza",
  "mesa-comedor-roma-natural",
  "mesa-comedor-roma-negra",
  "mesa-comedor-cantabria",
  "mesa-comedor-bolonia",
  "mesa-nordica",
];

const mesasComedor = products.filter(
  (p) => MESA_COMEDOR_IDS.includes(p.id) && hasProductImage(p),
);

const linkClass =
  "text-ink underline decoration-wood/40 underline-offset-4 hover:decoration-wood";

const MESAS_RECTANGULARES = [
  { id: "mesa-nordica", label: "Mesa Nórdica", detail: "160 × 90 × 75 cm, barniz a elección." },
  { id: "mesa-comedor-niza", label: "Mesa Comedor Niza", detail: "200 × 100 × 75 cm." },
  {
    id: "mesa-comedor-roma-negra",
    label: "Mesa Comedor Roma negra",
    detail: "200 × 100 cm, terminación negra.",
  },
  {
    id: "mesa-comedor-tripode",
    label: "Mesa de comedor Trípode",
    detail: "220 × 100 × 75 cm, patas inclinadas, para 6 a 8 comensales.",
  },
  {
    id: "mesa-comedor-cantabria",
    label: "Mesa Comedor Cantabria",
    detail: "240 × 110 × 75 cm, gran formato para reuniones grandes.",
  },
];

const MESAS_REDONDAS = [
  {
    id: "mesa-comedor-tripode-redonda",
    label: "Mesa de comedor Trípode redonda",
    detail: "Ø140 × 75 cm, tablero circular y patas inclinadas.",
  },
  {
    id: "mesa-comedor-redonda-ferrara",
    label: "Mesa de comedor redonda Ferrara",
    detail: "Ø140 × 75 cm, base estable.",
  },
  {
    id: "mesa-tripode-redonda-negra",
    label: "Mesa Trípode redonda negra",
    detail: "Ø150 × 75 cm, terminación negra.",
  },
  {
    id: "mesa-comedor-redonda-novara",
    label: "Mesa Comedor Redonda Novara",
    detail: "Ø150 cm, base robusta.",
  },
];

const RELATED_LINKS = [
  {
    href: "/collections/mesas",
    title: "Colección de mesas",
    description: "Mesas de comedor y mesas ratonas en un mismo catálogo.",
  },
  {
    href: "/mesas-de-comedor-a-medida",
    title: "Mesa de comedor a medida",
    description: "Largo o diámetro fuera del catálogo, cotizado por WhatsApp.",
  },
  {
    href: "/guias/medidas-mesa-comedor",
    title: "Guía de medidas de mesa de comedor",
    description: "Personas, altura y espacio para circular antes de elegir.",
  },
  {
    href: "/comedores-nordicos",
    title: "Comedores nórdicos",
    description: "Mesas, sillas y bancas de líneas simples.",
  },
  {
    href: "/mesas-de-centro",
    title: "Mesas de centro y ratonas",
    description: "Mesas bajas de living, distintas de una mesa de comedor.",
  },
  {
    href: "/guias/cuidado-muebles-madera",
    title: "Cuidado de muebles de madera",
    description: "Cómo mantener la cubierta de tu mesa con el uso diario.",
  },
];

const faqItems = [
  {
    question: "¿Qué mesas de comedor de madera tienen?",
    answer:
      "Rectangulares: Nórdica, Niza, Roma (natural y negra), Trípode (natural y negra), Bolonia y Cantabria. Redondas: Trípode redonda, Trípode redonda negra, Ferrara y Novara. Todas se fabrican en nuestro taller en Chillán y cada ficha muestra foto y precio vigente.",
  },
  {
    question: "¿Las mesas de comedor son de madera maciza?",
    answer:
      "Sí, trabajamos las mesas de comedor en madera maciza en nuestro taller de Chillán. Fichas como Ferrara, Cantabria y Bolonia lo indican en su descripción. La especie y la terminación de cada modelo se confirman al cotizar por WhatsApp.",
  },
  {
    question: "¿Tienen mesas de comedor de madera negra?",
    answer:
      "Sí. Hay tres mesas de comedor con terminación negra: la Roma negra, la Trípode negra y la Trípode redonda negra. Las tres tienen también su versión en madera natural en el catálogo.",
  },
  {
    question: "¿Me conviene una mesa de comedor rectangular o redonda?",
    answer:
      "Como referencia práctica, la rectangular aprovecha mejor un comedor largo y la redonda funciona bien en un comedor cuadrado, porque todos quedan a la vista. En el catálogo hay rectangulares de 160 a 240 cm de largo y redondas de Ø140 y Ø150 cm.",
  },
  {
    question: "¿Para cuántas personas es cada mesa de comedor?",
    answer:
      "Depende del largo o el diámetro y del espacio para circular. La Trípode rectangular de 220 × 100 × 75 cm figura para 6 a 8 comensales, y la Trípode redonda de Ø140 cm toma la referencia de 6-8 personas de la guía de medidas de mesa de comedor. Para el resto, revisa esa guía antes de elegir.",
  },
  {
    question: "¿Cuánto cuesta una mesa de comedor de madera?",
    answer:
      "Cada ficha de producto muestra el precio vigente del modelo. Si necesitas una medida especial o una terminación distinta, se cotiza por WhatsApp y el precio llega en la respuesta.",
  },
  {
    question: "¿Puedo pedir una mesa de comedor con otra medida?",
    answer:
      "Sí. Si ninguna ficha calza con tu comedor, la fabricamos a medida: envía por WhatsApp el largo o el diámetro, cuántas personas se sientan, la terminación y tu comuna. El encargo está en la página de mesa de comedor a medida.",
  },
  {
    question: "¿Envían mesas de comedor a todo Chile?",
    answer:
      "Sí. Fabricamos en Chillán y despachamos a todo Chile. El costo y el plazo de envío a tu comuna se confirman al cotizar por WhatsApp.",
  },
];

const whatsappMessage = [
  "Hola Idea Madera",
  "Vengo desde la pagina de mesas de comedor.",
  "Quiero cotizar una mesa de comedor de madera.",
].join("\n");

const whatsappHref = buildWhatsAppUrl(whatsappMessage);

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: canonicalPath },
  keywords: [
    "mesas de comedor de madera",
    "mesa de comedor de madera",
    "mesas de comedor",
    "mesa comedor madera",
    "mesa comedor madera maciza",
    "mesa comedor madera negra",
    "mesas de madera para comedor",
    "mesas de comedor de madera chile",
    "mesa de comedor redonda de madera",
    "comedor madera",
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

export default function MesasDeComedorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Mesas de comedor", path: canonicalPath },
      ]),
      buildItemListSchema(
        `Mesas de Comedor de Madera | ${SITE_NAME}`,
        mesasComedor.map((product) => ({
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
      <main className="bg-white text-ink">
        {/* Hero */}
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>
              <span className="mx-1.5">/</span>
              <span>Mesas de comedor</span>
            </nav>

            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h1 className="font-display text-4xl tracking-tight md:text-6xl font-semibold">
                  Mesas de comedor de madera
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                  Mesas de comedor de madera maciza fabricadas en nuestro taller propio en Chillán desde
                  1993: rectangulares y redondas, en terminación natural o negra. Cada ficha muestra foto y
                  precio vigente. Despachamos a todo Chile y por WhatsApp te cotizamos la terminación, el
                  envío a tu comuna o una medida especial.
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  <Link href="/guias/medidas-mesa-comedor" className={linkClass}>
                    Guía de medidas de mesa de comedor
                  </Link>
                  <span className="mx-2">·</span>
                  <Link href="/mesas-de-comedor-a-medida" className={linkClass}>
                    Mesa de comedor a medida
                  </Link>
                </p>
              </div>
              <WhatsAppCTA
                href={whatsappHref}
                label="Cotizar mesa de comedor"
                placement="mesas_comedor_hero"
                productTitle="Mesas de comedor de madera"
                fullWidthMobile={false}
              />
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <p className="mb-6 text-sm text-ink-muted">
            {mesasComedor.length}{" "}
            {mesasComedor.length === 1 ? "producto disponible" : "productos disponibles"}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mesasComedor.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index === 0}
                sizes={CATALOG_GRID_SIZES}
              />
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="font-display text-2xl tracking-tight md:text-3xl font-semibold">
              Mesas de comedor rectangulares o redondas
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              Como referencia práctica, una mesa rectangular aprovecha mejor un comedor largo y una redonda
              funciona bien en un comedor cuadrado, porque todos quedan a la vista y la conversación es más
              fácil. Estas son las mesas de comedor de madera del catálogo con medidas publicadas.
            </p>

            <h3 className="font-display mt-8 text-lg tracking-tight text-ink md:text-xl font-medium">
              Rectangulares
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted md:text-base">
              {MESAS_RECTANGULARES.map((item) => (
                <li key={item.id}>
                  <Link href={`/products/${item.id}`} className={linkClass}>
                    {item.label}
                  </Link>
                  : {item.detail}
                </li>
              ))}
            </ul>

            <h3 className="font-display mt-8 text-lg tracking-tight text-ink md:text-xl font-medium">
              Redondas
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted md:text-base">
              {MESAS_REDONDAS.map((item) => (
                <li key={item.id}>
                  <Link href={`/products/${item.id}`} className={linkClass}>
                    {item.label}
                  </Link>
                  : {item.detail}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              La{" "}
              <Link href="/products/mesa-comedor-roma-natural" className={linkClass}>
                Roma en madera natural
              </Link>
              , la{" "}
              <Link href="/products/mesa-comedor-bolonia" className={linkClass}>
                Bolonia
              </Link>{" "}
              y la{" "}
              <Link href="/products/mesa-comedor-tripode-negra" className={linkClass}>
                Trípode negra
              </Link>{" "}
              también están en el catálogo. Revisa su ficha y, si necesitas confirmar la medida, pregúntanos
              al cotizar por WhatsApp.
            </p>

            <h2 className="font-display mt-10 text-2xl tracking-tight md:text-3xl font-semibold">
              Terminación natural o negra
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              Tres modelos tienen versión en madera natural y versión negra. La Trípode rectangular está en{" "}
              <Link href="/products/mesa-comedor-tripode" className={linkClass}>
                natural
              </Link>{" "}
              y en{" "}
              <Link href="/products/mesa-comedor-tripode-negra" className={linkClass}>
                negro
              </Link>
              . La Trípode redonda figura en natural con Ø140 × 75 cm y la{" "}
              <Link href="/products/mesa-tripode-redonda-negra" className={linkClass}>
                Trípode redonda negra
              </Link>{" "}
              con Ø150 × 75 cm. La Roma está en{" "}
              <Link href="/products/mesa-comedor-roma-natural" className={linkClass}>
                madera natural
              </Link>{" "}
              y en{" "}
              <Link href="/products/mesa-comedor-roma-negra" className={linkClass}>
                madera negra
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              La madera natural deja ver la veta y da un comedor cálido; la terminación negra se ve más
              sobria en espacios contemporáneos. La Mesa Nórdica figura con barniz a elección. Si quieres
              otra terminación en un modelo, consúltala por WhatsApp.
            </p>

            <h2 className="font-display mt-10 text-2xl tracking-tight md:text-3xl font-semibold">
              ¿Para cuántas personas?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              La cantidad de personas depende del largo o el diámetro de la mesa y del espacio que queda para
              circular alrededor. Las referencias completas están en la{" "}
              <Link href="/guias/medidas-mesa-comedor" className={linkClass}>
                guía de medidas de mesa de comedor
              </Link>
              . En las fichas, la Trípode rectangular de 220 × 100 × 75 cm figura para 6 a 8 comensales, y la
              Trípode redonda de Ø140 cm toma la referencia de 6-8 personas de esa guía.
            </p>

            <h2 className="font-display mt-10 text-2xl tracking-tight md:text-3xl font-semibold">
              Completa el comedor
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              La mesa no incluye sillas. La silla de comedor del catálogo es la Milán Lenga, en la{" "}
              <Link href="/collections/sillas" className={linkClass}>
                colección de sillas
              </Link>
              ; las Kentucky de esa colección son de descanso y no van en la mesa. Para un lado del comedor
              también puedes revisar las{" "}
              <Link href="/collections/bancas" className={linkClass}>
                bancas de madera
              </Link>
              . Si buscas mesa, sillas y bancas de línea coordinada, mira los{" "}
              <Link href="/comedores-nordicos" className={linkClass}>
                comedores nórdicos
              </Link>
              .
            </p>

            <h2 className="font-display mt-10 text-2xl tracking-tight md:text-3xl font-semibold">
              ¿Necesitas otra medida?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
              Si ninguna ficha cabe en tu comedor, fabricamos una{" "}
              <Link href="/mesas-de-comedor-a-medida" className={linkClass}>
                mesa de comedor a medida
              </Link>{" "}
              en madera maciza. Envía por WhatsApp el largo y ancho, o el diámetro, cuántas personas se
              sientan, la terminación y tu comuna. Antes de medir, la{" "}
              <Link href="/guias/medidas-mesa-comedor" className={linkClass}>
                guía de medidas
              </Link>{" "}
              te ayuda a definir el tamaño según tu espacio.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
            <h2 className="font-display text-2xl tracking-tight md:text-3xl font-semibold">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 border-t border-line">
              {faqItems.map((item) => (
                <article key={item.question} className="border-b border-line py-5">
                  <h3 className="font-display text-base text-ink md:text-lg tracking-tight font-medium">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                    {faqAnswerText(item.answer)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <h2 className="font-display text-xl tracking-tight text-ink font-medium">También te puede interesar</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {RELATED_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-line bg-white p-4 shadow-sm hover:border-wood/40 transition-colors"
                >
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="mt-1 text-xs text-ink-muted">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <div className="rounded-2xl border border-line bg-ink p-7 text-white md:p-9">
            <h2 className="font-display text-2xl tracking-tight md:text-3xl font-semibold">
              Cotiza tu mesa de comedor
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-canvas/70 md:text-base">
              Escríbenos por WhatsApp con el modelo que te gusta, la terminación y tu comuna. Fabricamos en
              madera maciza en nuestro taller de Chillán y despachamos a todo Chile.
            </p>
            <WhatsAppCTA
              href={whatsappHref}
              label="Cotizar por WhatsApp"
              placement="mesas_comedor_cta"
              tone="dark"
              productTitle="Mesas de comedor de madera"
              className="mt-7"
            />
          </div>
        </section>
      </main>

      <WhatsappButton
        productTitle="Mesas de comedor de madera"
        buttonLabel="Cotizar por WhatsApp"
        prefilledMessage={whatsappMessage}
        alwaysVisible
      />
    </>
  );
}

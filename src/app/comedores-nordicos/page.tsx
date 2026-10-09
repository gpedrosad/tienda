import type { Metadata } from "next";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import JsonLd from "@/app/components/JsonLd";
import ProductCard from "@/app/components/ProductCard";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import { products } from "@/data/products";
import { hasProductImage } from "@/lib/catalog";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  SITE_NAME,
} from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const canonicalPath = "/comedores-nordicos";
const pageTitle = "Comedores Nórdicos: Mesas y Sillas de Madera | Chile";
const pageDescription =
  "Arma tu comedor nórdico completo: mesas, sillas y bancas de madera maciza con diseño escandinavo. Fabricación chilena. Cotiza por WhatsApp.";

const keywords = [
  "comedores nordicos",
  "comedor nordico",
  "comedor estilo nordico",
  "mesa nordica",
  "comedor escandinavo",
  "muebles nordicos madera",
];

const NORDIC_PRODUCT_IDS = [
  "mesa-nordica",
  "silla-milan-lenga",
  "silla-kentucky",
  "banca-capri",
  "banca-capri-negra",
  "banca-griega",
  "mesa-comedor-niza",
  "mesa-comedor-bolonia",
  "futon-noruega",
];

const nordicProducts = products
  .filter((p) => NORDIC_PRODUCT_IDS.includes(p.id))
  .filter(hasProductImage);

const whatsappMessage = [
  "Hola Idea Madera",
  "Me interesa armar un comedor de estilo nórdico.",
  "Quiero cotizar mesas, sillas y/o bancas de la línea nórdica.",
].join("\n");
const whatsappHref = buildWhatsAppUrl(whatsappMessage);

const faqItems = [
  {
    question: "¿Qué es un comedor nórdico?",
    answer:
      "Un comedor nórdico combina líneas simples, madera natural y funcionalidad. Se inspira en el diseño escandinavo: piezas livianas visualmente, tonos claros y una estética cálida que prioriza el uso diario sobre la ornamentación.",
  },
  {
    question: "¿Puedo armar un comedor nórdico completo en Idea Madera?",
    answer:
      "Sí. Puedes combinar una mesa nórdica con sillas y bancas de la línea para armar tu comedor completo. Te orientamos por WhatsApp para elegir las piezas según tu espacio y cantidad de comensales.",
  },
  {
    question: "¿Cómo elijo el tamaño de mesa según los comensales?",
    answer:
      "Para 4 personas una mesa de 120-140 cm de largo es suficiente; para 6 personas recomendamos 160-180 cm; y para 8 comensales lo ideal es 200 cm o más. Revisa nuestra guía de medidas de mesa de comedor para más detalles sobre proporciones y espacios.",
  },
  {
    question: "¿Qué sillas combinan mejor con una mesa nórdica?",
    answer:
      "Las sillas con líneas simples, respaldo bajo o medio y sin brazos son las que mejor combinan con el estilo nórdico. Busca modelos en madera clara o con terminación barnizada natural. En nuestra guía de sillas de comedor explicamos alturas recomendadas y cuántas sillas necesitas según tu mesa.",
  },
  {
    question: "¿Las mesas nórdicas se pueden pedir en medidas especiales?",
    answer:
      "Sí. Fabricamos a pedido y podemos ajustar dimensiones según tu comedor. Escríbenos por WhatsApp con las medidas que necesitas para cotizar.",
  },
  {
    question: "¿Qué madera usan para los comedores nórdicos?",
    answer:
      "Trabajamos con madera maciza seleccionada, incluyendo lenga austral y pino premium. Cada pieza se fabrica con terminación cuidada para resaltar la veta natural de la madera.",
  },
  {
    question: "¿Envían comedores nórdicos a todo Chile?",
    answer:
      "Sí. Coordinamos envíos a todo Chile. Al cotizar por WhatsApp te indicamos opciones de despacho y tiempos estimados según tu comuna.",
  },
  {
    question: "¿Puedo combinar sillas y bancas en el mismo comedor?",
    answer:
      "Por supuesto. La combinación de sillas en un lado y una banca en el otro es una propuesta muy nórdica que optimiza espacio y aporta un carácter más informal y acogedor al comedor.",
  },
  {
    question: "¿Un comedor nórdico es solo de madera clara?",
    answer:
      "No necesariamente. Si bien el estilo escandinavo clásico usa maderas claras como el pino o el roble natural, también puedes optar por maderas con veta marcada o terminaciones que resalten el tono natural sin pinturas. Lo importante es mantener las líneas limpias y la funcionalidad del diseño.",
  },
];

const heroHighlights = [
  {
    title: "Líneas limpias",
    description: "Diseño escandinavo sin excesos: formas simples que envejecen bien.",
  },
  {
    title: "Madera natural",
    description: "Maciza, seleccionada y con terminación que resalta la veta.",
  },
  {
    title: "Combinaciones a medida",
    description: "Arma tu comedor eligiendo mesa, sillas y bancas a tu gusto.",
  },
];

const featureCards = [
  {
    title: "Mesas con presencia",
    description:
      "Mesas de comedor con líneas rectas, tablero amplio y estructura sólida. Diseñadas para reunir y durar en el uso diario.",
  },
  {
    title: "Sillas funcionales",
    description:
      "Livianas, resistentes y con respaldo cómodo. Pensadas para acompañar largas sobremesas sin sacrificar estilo.",
  },
  {
    title: "Bancas como complemento",
    description:
      "Suman asientos sin recargar el espacio. Ideales para un lado del comedor o como pieza extra en el recibidor.",
  },
];

const steps = [
  {
    title: "Elige tu mesa",
    description:
      "Revisa las mesas nórdicas del catálogo y define el tamaño según tu comedor y cantidad de comensales.",
  },
  {
    title: "Combina sillas o bancas",
    description:
      "Selecciona sillas, bancas o una mezcla de ambas. Te orientamos para que las proporciones funcionen.",
  },
  {
    title: "Cotiza y personaliza",
    description:
      "Escríbenos por WhatsApp con tu selección. Confirmamos medidas, terminación, precio y despacho.",
  },
];

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords,
  alternates: { canonical: canonicalPath },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
    siteName: SITE_NAME,
    locale: "es_CL",
    type: "website",
    images: [{ url: "/logonegro.png", width: 800, height: 800, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/logonegro.png", width: 800, height: 800, alt: SITE_NAME }],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  description: pageDescription,
  url: absoluteUrl(canonicalPath),
  inLanguage: "es-CL",
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
};

const structuredData = [
  webPageSchema,
  buildBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Comedores nórdicos", path: canonicalPath },
  ]),
  buildFaqPageSchema(faqItems),
];

export default function ComedoresNordicosPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <main className="bg-white text-neutral-900">
        {/* Hero */}
        <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-100 to-white">
          <div className="mx-auto max-w-6xl px-4 pt-24 pb-12 md:pt-32 md:pb-16">
            <p className="text-[11px] md:text-sm uppercase tracking-[0.18em] text-neutral-600">
              Estilo nórdico en madera
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Comedores nórdicos: mesas y sillas de madera
            </h1>
            <p className="mt-5 max-w-3xl text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed">
              Arma tu comedor nórdico completo con mesas amplias, sillas livianas y bancas de madera maciza.
              Diseño escandinavo funcional fabricado en Chile: líneas simples, madera natural y terminación
              cuidada para que tu comedor sea cálido y duradero. Cotiza tu combinación por WhatsApp.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {["Diseño escandinavo", "Fabricación en Chile", "Envíos a todo Chile"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700"
                  >
                    {badge}
                  </span>
                ),
              )}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-7 py-3.5 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-800 transition-colors"
              >
                <AiOutlineWhatsApp className="mr-2 text-emerald-400" size={20} />
                Cotizar comedor nórdico por WhatsApp
              </a>
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="border border-neutral-200 rounded-xl p-4 bg-white shadow-sm"
                >
                  <p className="text-sm font-medium text-neutral-900">{item.title}</p>
                  <p className="mt-1 text-xs text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Qué define un comedor nórdico
          </h2>
          <p className="mt-5 max-w-4xl text-neutral-700 leading-relaxed">
            El estilo nórdico aplicado al comedor busca equilibrio entre forma y función.
            Madera clara o con veta visible, líneas rectas sin adornos y piezas que se sienten
            livianas aunque sean robustas. Un comedor escandinavo invita a sentarse, compartir
            y quedarse. En Idea Madera fabricamos cada pieza con ese criterio: diseño que no
            pasa de moda y construcción que resiste el uso real.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="border border-neutral-200 rounded-2xl p-5 shadow-sm"
              >
                <h3 className="text-lg font-medium text-neutral-900">{card.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <h3 className="mt-12 text-2xl md:text-3xl font-light tracking-tight">
            Cómo elegir tu comedor nórdico según espacio y comensales
          </h3>
          <p className="mt-4 max-w-4xl text-neutral-700 leading-relaxed">
            Un comedor nórdico bien dimensionado depende de la cantidad de personas que suelan reunirse.
            Para 4 personas una mesa de 120-140 cm de largo es suficiente; para 6 personas recomendamos
            160-180 cm; y para 8 comensales lo ideal es 200 cm o más. Si tu comedor es compacto, considera
            una banca en un lado en lugar de dos sillas: optimizas espacio sin perder asientos.
          </p>
          <p className="mt-4 max-w-4xl text-neutral-700 leading-relaxed">
            Para más detalles sobre proporciones, revisa nuestra{" "}
            <Link href="/guias/medidas-mesa-comedor" className="underline hover:text-neutral-900">
              guía de medidas de mesa de comedor
            </Link>
            . Si necesitas orientación sobre qué sillas combinan mejor con tu mesa, consulta la{" "}
            <Link href="/guias/elegir-sillas-madera-comedor" className="underline hover:text-neutral-900">
              guía de sillas de comedor
            </Link>{" "}
            donde explicamos alturas, anchos y cuántas sillas se recomiendan según el largo de tu mesa.
          </p>
        </section>

        {/* Grilla de productos */}
        <section className="bg-neutral-50 border-y border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Nuestras piezas de estilo nórdico
            </h2>
            <p className="mt-3 max-w-3xl text-neutral-700 leading-relaxed">
              Mesas, sillas y bancas de madera maciza con diseño escandinavo. Cada pieza se
              puede combinar para armar tu comedor nórdico completo.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nordicProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Pasos */}
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Cómo armar tu comedor nórdico
          </h2>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Paso {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-medium text-neutral-900">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="bg-neutral-50 border-y border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Preguntas frecuentes
            </h2>
            <div className="mt-8 border-t border-neutral-200">
              {faqItems.map((item) => (
                <article key={item.question} className="border-b border-neutral-200 py-5">
                  <h3 className="text-lg font-medium text-neutral-900">{item.question}</h3>
                  <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
            <h2 className="text-xl font-light tracking-tight text-neutral-900">También te puede interesar</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Link href="/guias/medidas-mesa-comedor" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Guía de medidas de mesa</p>
                <p className="mt-1 text-xs text-neutral-600">Cómo elegir el tamaño correcto según cantidad de personas.</p>
              </Link>
              <Link href="/guias/elegir-sillas-madera-comedor" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Guía de sillas de comedor</p>
                <p className="mt-1 text-xs text-neutral-600">Altura ideal, cuántas sillas por mesa y cómo elegirlas.</p>
              </Link>
              <Link href="/mesas-de-centro" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:border-neutral-400 transition-colors">
                <p className="text-sm font-medium text-neutral-900">Mesas ratonas para living</p>
                <p className="mt-1 text-xs text-neutral-600">Complementa tu living con una mesa ratona de madera maciza.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-6xl px-4 pt-14 pb-32 md:pt-16 md:pb-36">
          <div className="rounded-2xl bg-neutral-900 p-7 md:p-9 text-white">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              Cotiza tu comedor nórdico por WhatsApp
            </h2>
            <p className="mt-3 max-w-3xl text-neutral-200 leading-relaxed">
              Escríbenos con las piezas que te interesan o cuéntanos tu espacio y te ayudamos
              a armar la combinación ideal. Confirmamos precios, medidas, terminación y despacho.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-200">
              <li>Mesas, sillas y bancas de estilo nórdico.</li>
              <li>Fabricación artesanal en Chile.</li>
              <li>Envíos a todo Chile.</li>
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-7 py-3 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-100 transition-colors"
            >
              <AiOutlineWhatsApp className="mr-2 text-neutral-900" size={20} />
              Cotizar comedor nórdico por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <WhatsAppButton
        productTitle="Comedor nórdico"
        prefilledMessage={whatsappMessage}
        buttonLabel="Cotizar comedor nórdico"
      />
    </>
  );
}

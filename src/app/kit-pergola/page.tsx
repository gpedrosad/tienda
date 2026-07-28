import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import JsonLd from "@/app/components/JsonLd";
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildServiceOfferSchema,
  SITE_NAME,
} from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const canonicalPath = "/kit-pergola";
const pageTitle = "Kit Pérgola Modular | Uniones Metálicas 3×3 | Idea Madera";
const pageDescription =
  "Kit de uniones metálicas para armar una pérgola modular sobre suelo. Para madera 3×3 pulgadas (75×75 mm). No incluye maderas. Bases para atornillar o cementar. Cotiza en Chile por WhatsApp.";

const keywords = [
  "kit pérgola",
  "kit pergola modular",
  "uniones metálicas pérgola",
  "armar pérgola madera",
  "pérgola sobre suelo",
  "bases pérgola atornillar",
  "bases pérgola cementar",
  "pérgola 3x3 pulgadas",
  "kit uniones metálicas Chile",
];

const whatsappMessage = [
  "Hola Idea Madera",
  "Vengo desde la landing del Kit Pérgola Modular.",
  "Quiero cotizar el kit de uniones metálicas (1 módulo, sobre suelo, sin maderas).",
  "Me interesa saber precio, tipo de base (atornillar o cementar) y plazos.",
].join("\n");

const whatsappHref = buildWhatsAppUrl(whatsappMessage);

const kitIncludes = [
  {
    title: "4 bases",
    description: "Soportes metálicos para anclar los postes al suelo.",
  },
  {
    title: "4 codos a 90°",
    description: "Uniones metálicas para conectar postes y vigas en esquina.",
  },
  {
    title: "Tornillos y tapas plásticas",
    description: "Tornillería para madera e embellecedores para un terminado limpio.",
  },
  {
    title: "25 tarugos y tirafondos 10 mm",
    description: "Anclaje reforzado para una fijación firme.",
  },
];

const baseOptions = [
  {
    title: "Base para atornillar",
    description:
      "Se adapta a suelos firmes y lisos. Ideal para terrazas y superficies ya preparadas.",
  },
  {
    title: "Base para cementar",
    description:
      "Apta para distintos tipos de suelo. Requiere una perforación de 30 cm y relleno con cemento.",
  },
];

const assemblySteps = [
  {
    title: "Elige el tipo de base",
    description:
      "Define si tu suelo permite atornillar (terraza o superficie firme) o si necesitas bases para cementar con perforación de 30 cm.",
  },
  {
    title: "Consigue la madera 3×3",
    description:
      "El kit no incluye maderas. Compra o cotiza postes y vigas de 3×3 pulgadas (75×75 mm) en el largo que necesites.",
  },
  {
    title: "Arma el módulo",
    description:
      "Monta las 4 bases, une postes y vigas con los codos a 90° y fija con la tornillería incluida. Puedes sumar más módulos después.",
  },
];

const faqItems = [
  {
    question: "¿El kit incluye las maderas?",
    answer:
      "No. Este kit incluye solo las uniones metálicas y la fijación (bases, codos, tornillos, tapas, tarugos y tirafondos). Las maderas de 3×3 pulgadas (75×75 mm) se consiguen o cotizan aparte según el tamaño de pérgola que quieras armar.",
  },
  {
    question: "¿Para qué medida de madera está pensado?",
    answer:
      "El sistema está pensado para maderas de 3×3 pulgadas, equivalentes a 75×75 mm. Tú eliges el largo de cada pieza según el espacio disponible.",
  },
  {
    question: "¿Qué diferencia hay entre base para atornillar y base para cementar?",
    answer:
      "La base para atornillar sirve en suelos firmes y lisos, como terrazas. La base para cementar sirve en más tipos de suelo: hay que hacer una perforación de 30 cm y rellenarla con cemento.",
  },
  {
    question: "¿Puedo ampliar la pérgola después?",
    answer:
      "Sí. Los módulos son combinables entre sí. Puedes empezar con 1 módulo sobre suelo y sumar más kits para agrandar la estructura sin límite práctico.",
  },
  {
    question: "¿Necesito experiencia o herramientas especiales?",
    answer:
      "No. El kit está pensado para armarse con pocos conocimientos y herramientas básicas. Recomendamos revisar las fotos del sistema antes de comprar para entender el montaje.",
  },
  {
    question: "¿Envían a todo Chile?",
    answer:
      "Sí. Cotiza por WhatsApp el kit de uniones metálicas, el tipo de base y el despacho a tu comuna. Si también necesitas las maderas, te orientamos aparte.",
  },
];

const heroImage = "/images/kit-pergola-instalada.png";
const systemImage = "/images/kit-pergola-sistema.png";

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
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 800,
        alt: "Pérgola modular armada con kit de uniones metálicas sobre suelo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [heroImage],
  },
};

// Cotización por WhatsApp: no usar Product (Google exige price en offers).
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kit de uniones metálicas para pérgola modular — 1 módulo sobre suelo",
  serviceType: "Kit de uniones metálicas para pérgola",
  description: pageDescription,
  image: [absoluteUrl(heroImage), absoluteUrl(systemImage)],
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
  areaServed: {
    "@type": "Country",
    name: "Chile",
  },
  audience: [
    { "@type": "Audience", audienceType: "Particulares" },
    { "@type": "Audience", audienceType: "Empresas" },
  ],
  offers: buildServiceOfferSchema(),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Cómo armar una pérgola modular con kit de uniones metálicas",
  description:
    "Pasos para armar 1 módulo de pérgola sobre suelo con uniones metálicas para madera 3×3 pulgadas. El kit no incluye maderas.",
  image: absoluteUrl(systemImage),
  totalTime: "PT4H",
  supply: [
    { "@type": "HowToSupply", name: "Kit de uniones metálicas (bases, codos, tornillería)" },
    { "@type": "HowToSupply", name: "Madera 3×3 pulgadas (75×75 mm) en el largo deseado" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Taladro / destornillador" },
    { "@type": "HowToTool", name: "Nivel y cinta métrica" },
  ],
  step: assemblySteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
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
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: absoluteUrl(heroImage),
  },
};

const structuredData = [
  webPageSchema,
  serviceSchema,
  howToSchema,
  buildBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Kit pérgola modular", path: canonicalPath },
  ]),
  buildFaqPageSchema(faqItems),
];

export default function KitPergolaPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <div className="min-h-screen bg-[#111111] text-white">
        <header className="border-b border-white/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
            <Link href="/" className="group">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#d4a017] group-hover:text-[#e0b020]">
                Idea Madera
              </p>
              <p className="mt-1 text-sm text-neutral-300">Kit uniones metálicas para pérgola</p>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-[#1ebe57]"
            >
              <AiOutlineWhatsApp size={18} />
              WhatsApp
            </a>
          </div>
        </header>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Pérgola modular de madera armada sobre suelo con kit de uniones metálicas"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#111111]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4a017]">
              1 módulo · Sobre suelo · No incluye maderas
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-light tracking-tight text-white md:text-6xl">
              Kit de uniones metálicas para pérgola
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg">
              Construye tu propia pérgola modular con un kit de uniones metálicas pensado para
              madera de 3×3 pulgadas (75×75 mm). Armado simple, módulos combinables y dos tipos de
              base para el suelo. No incluye maderas; cotiza en Chile por WhatsApp.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Para madera 3×3 pulgadas (75×75 mm)",
                "Módulos combinables",
                "No incluye maderas",
                "Envío a Chile",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-neutral-200"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#1ebe57] md:text-base"
              >
                <AiOutlineWhatsApp size={22} />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#161616]">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-light tracking-tight text-white">
                Cómo funciona el kit pérgola
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
                El kit está pensado para maderas de{" "}
                <strong className="font-medium text-white">3×3 pulgadas (75×75 mm)</strong>. Tú
                eliges el largo de las piezas según el tamaño de pérgola que quieras. Los módulos se
                pueden combinar entre sí, así que no tienes límite para ampliar la estructura.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400 md:text-base">
                Importante: este kit{" "}
                <strong className="font-medium text-neutral-200">no incluye las maderas</strong>.
                Solo trae las uniones metálicas y la fijación para armar 1 módulo sobre suelo.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-16">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-white">
                Qué incluye el kit de uniones metálicas
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
                Uniones y fijaciones para armar 1 módulo de pérgola sobre suelo. La madera se
                cotiza o consigue aparte según tus medidas.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image
                  src={systemImage}
                  alt="Kit de uniones metálicas para pérgola: 4 bases, 4 codos a 90 grados y tornillería"
                  width={900}
                  height={700}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <ul className="grid content-start gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {kitIncludes.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-medium text-[#d4a017]">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
          <h2 className="text-3xl font-light tracking-tight">Bases para pérgola sobre suelo</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
            Al cotizar puedes elegir entre dos tipos de base para el suelo:
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {baseOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-medium text-[#d4a017]">{option.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">{option.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#161616]">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <h2 className="text-3xl font-light tracking-tight">Cómo armar tu pérgola</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
              Tres pasos para pasar del kit a un espacio techado con madera a tu medida.
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {assemblySteps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[#d4a017]">
                    Paso {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <h2 className="text-3xl font-light tracking-tight">Ventajas del sistema modular</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-medium text-white">Armado simple</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  Pensado para armar con mínimos conocimientos y herramientas básicas.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-medium text-white">A tu medida</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  Combina maderas de distintos largos y adapta la pérgola a tu espacio.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-lg font-medium text-white">Módulos combinables</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  Puedes sumar módulos y ampliar la estructura sin límites.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#161616]">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <h2 className="text-3xl font-light tracking-tight">Preguntas frecuentes</h2>
            <div className="mt-8 border-t border-white/10">
              {faqItems.map((item) => (
                <article key={item.question} className="border-b border-white/10 py-5">
                  <h3 className="text-lg font-medium text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300 md:text-base">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0c0c0c]">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
            <div className="rounded-3xl border border-[#d4a017]/30 bg-gradient-to-br from-[#1a1608] to-[#111111] p-7 md:p-10">
              <h2 className="text-2xl font-light tracking-tight md:text-3xl">
                Cotiza tu kit pérgola por WhatsApp
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 md:text-base">
                Escríbenos para confirmar precio, tipo de base (atornillar o cementar),
                disponibilidad y despacho a tu comuna. Si también necesitas las maderas de 3×3, te
                ayudamos a cotizarlas aparte.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-[#1ebe57] md:text-base"
              >
                <AiOutlineWhatsApp size={22} />
                Contactar por WhatsApp
              </a>
            </div>

            <nav
              aria-label="Enlaces relacionados"
              className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-neutral-500"
            >
              <Link href="/" className="hover:text-neutral-300">
                Inicio
              </Link>
              <Link href="/cubiertas-a-medida" className="hover:text-neutral-300">
                Cubiertas a medida
              </Link>
              <Link href="/contacto" className="hover:text-neutral-300">
                Contacto
              </Link>
              <Link href="/quienes-somos" className="hover:text-neutral-300">
                Quiénes somos
              </Link>
            </nav>

            <p className="mt-6 text-center text-xs text-neutral-500">
              Kit pérgola modular · Idea Madera · Chile
            </p>
          </div>
        </section>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cotizar kit pérgola por WhatsApp"
          className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-neutral-950 shadow-lg shadow-black/40 transition hover:scale-105 hover:bg-[#1ebe57] md:bottom-8 md:right-8"
        >
          <AiOutlineWhatsApp size={28} />
        </a>
      </div>
    </>
  );
}

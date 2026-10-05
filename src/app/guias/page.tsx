import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { buildBreadcrumbSchema, buildOpenGraphDefaults, buildTwitterDefaults, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Guías de Muebles de Madera | Idea Madera" },
  description:
    "Guías prácticas sobre muebles de madera: cuidado y mantención, cómo elegir medidas de mesa, cómo cotizar a medida y más consejos útiles.",
  alternates: { canonical: "/guias" },
  keywords: [
    "guías muebles madera",
    "consejos muebles madera",
    "cuidado madera",
    "elegir mesa comedor",
    "cotizar muebles a medida",
  ],
  openGraph: {
    ...buildOpenGraphDefaults(),
    title: "Guías de Muebles de Madera | Idea Madera",
    description:
      "Guías prácticas sobre muebles de madera: cuidado y mantención, cómo elegir medidas de mesa, cómo cotizar a medida y más consejos útiles.",
    url: "/guias",
  },
  twitter: {
    ...buildTwitterDefaults(),
    title: "Guías de Muebles de Madera | Idea Madera",
    description:
      "Guías prácticas sobre muebles de madera: cuidado y mantención, cómo elegir medidas de mesa, cómo cotizar a medida y más consejos útiles.",
  },
};

const guides = [
  {
    title: "Cómo cuidar y mantener tus muebles de madera maciza",
    description:
      "Guía práctica para limpiar, proteger y mantener tus muebles de madera: limpieza diaria, barniz, manchas y protección para que duren años.",
    href: "/guias/cuidado-muebles-madera",
    category: "Mantención",
  },
  {
    title: "Cómo elegir las medidas de tu mesa de comedor",
    description:
      "Aprende a calcular el tamaño ideal de mesa según la cantidad de personas, el espacio disponible y la circulación del comedor.",
    href: "/guias/medidas-mesa-comedor",
    category: "Medidas",
  },
  {
    title: "Cómo cotizar un mueble a medida por WhatsApp",
    description:
      "Guía rápida para cotizar muebles de madera a medida: qué información enviar, cómo describir tu proyecto y qué esperar en la respuesta.",
    href: "/guias/cotizar-muebles-a-medida",
    category: "Cotización",
  },
];

export default function GuiasPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Guías", path: "/guias" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-neutral-500">
              <Link href="/" className="hover:text-neutral-900">
                Inicio
              </Link>
              <span className="mx-1.5">/</span>
              <span>Guías</span>
            </nav>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Aprende con Idea Madera
              </p>
              <h1 className="mt-3 text-4xl font-light tracking-tight md:text-5xl lg:text-6xl">
                Guías de muebles de madera
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg">
                Guías prácticas para cuidar, elegir y cotizar muebles de madera con información útil, consejos reales y experiencia de taller. Todo en español y pensado para compradores en Chile.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-400 hover:shadow-sm"
              >
                <div className="mb-3 inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
                  {guide.category}
                </div>
                <h2 className="text-xl font-light tracking-tight text-neutral-900 group-hover:text-neutral-700">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {guide.description}
                </p>
                <div className="mt-4 text-sm font-medium text-neutral-900 group-hover:underline">
                  Leer guía →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 md:text-3xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 md:text-lg">
              Escríbenos por WhatsApp y te ayudamos con tu consulta sobre muebles de madera, medidas, mantención o cotización.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-block rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 md:text-base"
            >
              Ir a contacto
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

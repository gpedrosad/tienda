import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { buttonClasses } from "@/app/components/ui/Button";
import { buildBreadcrumbSchema, buildOpenGraphDefaults, buildTwitterDefaults } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Guías de Muebles de Madera | Idea Madera" },
  description:
    "Guías prácticas sobre muebles de madera: cuidado, medidas de mesa, cómo elegir sillas de comedor, cotizar a medida y más consejos útiles.",
  alternates: { canonical: "/guias" },
  keywords: [
    "guías muebles madera",
    "consejos muebles madera",
    "cuidado madera",
    "elegir mesa comedor",
    "elegir sillas comedor",
    "cotizar muebles a medida",
  ],
  openGraph: {
    ...buildOpenGraphDefaults(),
    title: "Guías de Muebles de Madera | Idea Madera",
    description:
      "Guías prácticas sobre muebles de madera: cuidado, medidas de mesa, cómo elegir sillas de comedor, cotizar a medida y más consejos útiles.",
    url: "/guias",
  },
  twitter: {
    ...buildTwitterDefaults(),
    title: "Guías de Muebles de Madera | Idea Madera",
    description:
      "Guías prácticas sobre muebles de madera: cuidado, medidas de mesa, cómo elegir sillas de comedor, cotizar a medida y más consejos útiles.",
  },
};

const guides = [
  {
    title: "Cómo medir la huella y la contrahuella",
    description:
      "Referencia general de confort para peldaños: huella, contrahuella y qué medidas enviar para cotizar las huellas de madera.",
    href: "/guias/medidas-peldanos-escalera",
    category: "Peldaños",
  },
  {
    title: "Cómo elegir la madera de un peldaño",
    description:
      "Tránsito, espesor y terminación. Lenga austral o pino premium se confirman al cotizar las huellas.",
    href: "/guias/elegir-madera-peldanos",
    category: "Peldaños",
  },
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
    title: "Cómo elegir las medidas de una mesa de centro",
    description:
      "Largo respecto al sofá, altura del asiento y las medidas del catálogo: Roma, Ferrara, Hairpin y Trípode ratona.",
    href: "/guias/medidas-mesa-de-centro",
    category: "Medidas",
  },
  {
    title: "Qué madera usar en un mesón de quincho",
    description:
      "Lenga austral o pino premium, secos en cámara, y cómo cambia el acabado si el mesón va bajo techo o al aire.",
    href: "/guias/madera-para-meson-quincho",
    category: "Cubiertas",
  },
  {
    title: "Cómo elegir sillas de madera para el comedor",
    description:
      "Guía para elegir sillas de comedor: altura ideal, ancho, cuántas sillas por mesa, tipos de madera y mantención.",
    href: "/guias/elegir-sillas-madera-comedor",
    category: "Selección",
  },
  {
    title: "Cómo cotizar un mueble a medida por WhatsApp",
    description:
      "Guía rápida para cotizar muebles de madera a medida: qué información enviar, cómo describir tu proyecto y qué esperar en la respuesta.",
    href: "/guias/cotizar-muebles-a-medida",
    category: "Cotización",
  },
  {
    title: "Medidas estándar de puertas y cómo elegir la madera",
    description:
      "Medidas habituales de hoja en Chile, diferencia entre vano y hoja, y cómo pensar la madera de una puerta interior o de entrada.",
    href: "/guias/medidas-y-madera-puertas",
    category: "Puertas",
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
      <main className="bg-white text-ink">
        <section className="border-b border-line bg-canvas">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 md:pb-14 md:pt-32">
            <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>
              <span className="mx-1.5">/</span>
              <span>Guías</span>
            </nav>

            <div className="mt-6">
              <h1 className="font-display text-4xl tracking-tight md:text-5xl lg:text-6xl font-semibold">
                Guías de muebles de madera
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
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
                className="group rounded-2xl border border-line bg-white p-6 transition-all hover:border-wood/40 hover:shadow-sm"
              >
                <div className="mb-3 inline-block rounded-full bg-canvas-deep px-3 py-1 text-xs font-medium text-ink-muted">
                  {guide.category}
                </div>
                <h2 className="font-display text-xl tracking-tight text-ink group-hover:text-wood font-medium">
                  {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {guide.description}
                </p>
                <div className="mt-4 text-sm font-medium text-ink group-hover:underline">
                  Leer guía →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-canvas">
          <div className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
            <h2 className="font-display text-2xl tracking-tight text-ink md:text-3xl font-semibold">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">
              Escríbenos por WhatsApp y te ayudamos con tu consulta sobre muebles de madera, medidas, mantención o cotización.
            </p>
            <Link
              href="/contacto"
              className={buttonClasses({ variant: "primary", className: "mt-6" })}
            >
              Ir a contacto
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

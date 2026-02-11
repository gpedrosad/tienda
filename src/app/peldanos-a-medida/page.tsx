import type { Metadata } from "next";
import {
  AiOutlineWhatsApp,
} from "react-icons/ai";
import WhatsAppButton from "@/app/components/WhatsAppButton";

const pageTitle = "Peldaños a Medida en Madera | Cotiza por WhatsApp | Idea Madera";
const pageDescription =
  "Fabricamos peldaños a medida en madera para escaleras y proyectos personalizados. Atención a empresas y particulares con envíos a todo Chile. Cotiza por WhatsApp.";
const canonicalPath = "/peldanos-a-medida";
const whatsappMessage = "Hola, quiero cotizar peldaños a medida para mi proyecto.";
const whatsappHref = `https://wa.me/56995497838?text=${encodeURIComponent(whatsappMessage)}`;

const faqItems = [
  {
    question: "¿Hacen peldaños a medida según mis dimensiones?",
    answer:
      "Sí. Fabricamos cada peldaño en base a las medidas de tu proyecto para lograr un ajuste preciso y una terminación prolija.",
  },
  {
    question: "¿Qué tipo de madera recomiendan para peldaños?",
    answer:
      "Trabajamos opciones de madera seleccionada según uso, estilo y terminación. La recomendación final depende del tránsito y del diseño de la escalera.",
  },
  {
    question: "¿Cómo puedo cotizar peldaños a medida?",
    answer:
      "Puedes cotizar por WhatsApp enviando cantidad de peldaños, largo, ancho, espesor, comuna y una foto referencial de la escalera o proyecto.",
  },
  {
    question: "¿Cuánto demora la fabricación de peldaños a medida?",
    answer:
      "Los plazos varían según cantidad, complejidad y terminaciones. Te confirmamos tiempo estimado al validar medidas y requerimientos.",
  },
  {
    question: "¿Realizan envíos a todo Chile?",
    answer:
      "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones de despacho según comuna o región.",
  },
  {
    question: "¿Atienden proyectos para empresas y particulares?",
    answer:
      "Sí. Trabajamos tanto con clientes particulares como con empresas, constructoras, arquitectos y diseñadores.",
  },
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Peldaños a medida en madera",
      serviceType: "Fabricación de peldaños a medida",
      provider: {
        "@type": "Organization",
        name: "Idea Madera",
        url: canonicalPath,
      },
      areaServed: {
        "@type": "Country",
        name: "Chile",
      },
      description: pageDescription,
      audience: [
        { "@type": "Audience", audienceType: "Particulares" },
        { "@type": "Audience", audienceType: "Empresas" },
      ],
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "CLP",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peldaños a medida",
          item: canonicalPath,
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalPath,
  },
  keywords: [
    "peldaños a medida",
    "peldaños de madera a medida",
    "escalones de madera a medida",
    "peldaños para escalera",
    "cotizar peldaños a medida",
    "peldaños a medidas",
    "envíos a todo chile",
    "peldaños para empresas",
    "peldaños para particulares",
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalPath,
    siteName: "Idea Madera",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/logonegro.png",
        width: 800,
        height: 800,
        alt: "Idea Madera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/logonegro.png"],
  },
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
};

export default function PeldanosAMedidaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <main className="bg-white text-neutral-900">
        <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-100 to-white">
          <div className="max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
            <p className="text-[11px] md:text-sm uppercase tracking-[0.18em] text-neutral-600">
              Peldaños a medida en madera
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Peldaños a medida para escaleras
            </h1>
            <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl">
              Diseñamos y fabricamos peldaños a medida en madera, adaptados a tu proyecto. Si estás
              buscando peldaños de madera a medida con terminaciones limpias y estructura resistente,
              te ayudamos a cotizar rápido con asesoría directa para empresas y particulares.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs md:text-sm text-neutral-700">
                Envíos a todo Chile
              </span>
              <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs md:text-sm text-neutral-700">
                Empresas y particulares
              </span>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-7 py-3.5 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-800 transition-colors"
              >
                <AiOutlineWhatsApp className="mr-2 text-emerald-400" size={20} />
                Cotizar peldaños por WhatsApp
              </a>
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-sm">
                <p className="mt-3 text-sm font-medium text-neutral-900">Medidas exactas por proyecto</p>
                <p className="mt-1 text-xs text-neutral-600">
                  Fabricación personalizada para ajuste preciso.
                </p>
              </div>
              <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-sm">
                <p className="mt-3 text-sm font-medium text-neutral-900">Empresas y particulares</p>
                <p className="mt-1 text-xs text-neutral-600">
                  Atendemos desde una obra pequeña hasta proyectos grandes.
                </p>
              </div>
              <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-sm">
                <p className="mt-3 text-sm font-medium text-neutral-900">Envíos a todo Chile</p>
                <p className="mt-1 text-xs text-neutral-600">
                  Coordinación de despacho según comuna o región.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">
            Peldaños de madera a medida para cada espacio
          </h2>
          <p className="mt-5 text-neutral-700 leading-relaxed max-w-4xl">
            Fabricamos peldaños para escaleras nuevas o remodelaciones, considerando diseño, uso y
            durabilidad. Cada solicitud de peldaños a medida se trabaja en detalle para lograr una
            solución funcional y estética. También atendemos búsquedas comunes como peldaños a
            medidas, escalones de madera a medida y peldaños para escalera de madera.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900">Peldaños rectos</h3>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                Ideal para escaleras lineales o proyectos de renovación donde se requiere precisión
                en largo, ancho y espesor.
              </p>
            </article>
            <article className="border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900">Peldaños con terminación</h3>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                Opciones de acabado según estilo del proyecto: natural, oscuro o personalizado en
                base a referencia.
              </p>
            </article>
            <article className="border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900">Proyectos a pedido</h3>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                Si tu escalera tiene medidas especiales o detalles no estándar, te ayudamos con una
                propuesta ajustada a tu caso.
              </p>
            </article>
          </div>
        </section>

        <section className="bg-neutral-50 border-y border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
            <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">
              Cómo cotizar tus peldaños a medida
            </h2>
            <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <li className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500">Paso 1</p>
                <h3 className="mt-2 text-lg font-medium text-neutral-900">Envíanos tus medidas</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  Comparte largo, ancho, espesor y cantidad de peldaños. Si tienes planos o fotos,
                  mejor aún.
                </p>
              </li>
              <li className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500">Paso 2</p>
                <h3 className="mt-2 text-lg font-medium text-neutral-900">Definimos material y acabado</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  Te orientamos en la mejor alternativa según estilo, uso y presupuesto para tus
                  peldaños de madera a medida.
                </p>
              </li>
              <li className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-500">Paso 3</p>
                <h3 className="mt-2 text-lg font-medium text-neutral-900">Recibes tu cotización</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                  Te enviamos una propuesta clara por WhatsApp con tiempos estimados y detalles del
                  pedido.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-4 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="mt-3 text-xl md:text-2xl font-light tracking-tight text-neutral-900">
                Envíos a todo Chile
              </h2>
              <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">
                Despachamos peldaños a medida a todo Chile. Te indicamos opciones y tiempos de envío
                según tu comuna o región al momento de cotizar.
              </p>
            </article>
            <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="mt-3 text-xl md:text-2xl font-light tracking-tight text-neutral-900">
                Empresas y particulares
              </h2>
              <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">
                Atendemos proyectos de clientes particulares y también de empresas, constructoras,
                arquitectos y diseñadores que requieren fabricación a medida.
              </p>
            </article>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
          <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-8 border-t border-neutral-200">
            {faqItems.map((item) => (
              <article key={item.question} className="border-b border-neutral-200 py-5">
                <h3 className="text-lg font-medium text-neutral-900">{item.question}</h3>
                <p className="mt-2 text-sm md:text-base text-neutral-700 leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pt-0 pb-32 md:pb-36">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 md:p-9 text-white">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">
              Cotiza hoy tus peldaños a medida
            </h2>
            <p className="mt-3 text-neutral-200 leading-relaxed max-w-3xl">
              Escribe por WhatsApp y cuéntanos tu proyecto. Mientras más detalles compartas, más
              precisa será la cotización.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-neutral-200">
              <li className="inline-flex items-center gap-2">
                Atención para empresas y particulares.
              </li>
              <li className="inline-flex items-center gap-2">
                Envíos a todo Chile.
              </li>
              <li className="inline-flex items-center gap-2">
                Respuesta rápida para cotización.
              </li>
            </ul>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-neutral-900 px-7 py-3 text-sm md:text-base font-medium tracking-wide hover:bg-neutral-100 transition-colors"
            >
              <AiOutlineWhatsApp className="mr-2 text-neutral-900" size={20} />
              Cotizar directo por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <WhatsAppButton
        productTitle="Peldaños a medida"
        prefilledMessage={whatsappMessage}
        buttonLabel="Cotizar peldaños por WhatsApp"
      />
    </>
  );
}

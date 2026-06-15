import { DEFAULT_SITE_URL } from "@/lib/whatsapp";

export const SITE_NAME = "Idea Madera";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
export const SITE_LOCALE = "es_CL";
export const DEFAULT_OG_IMAGE = "/logonegro.png";
export const SITE_PHONE = "+56995497838";

export const HOME_TITLE = "Muebles de madera a medida en Chile | Idea Madera";
export const HOME_DESCRIPTION =
  "Fabricamos muebles de madera con diseño elegante y calidad excepcional. Mesas, sillas, bancas y piezas a medida con envío a todo Chile. Cotiza por WhatsApp.";

export const homeFaqItems = [
  {
    question: "¿Cuánto tarda el envío?",
    answer:
      "El envío usualmente tarda 15 días hábiles, dependiendo de la ubicación y la disponibilidad del producto. Además, recibirás un número de seguimiento para estar al tanto de la entrega.",
  },
  {
    question: "¿Se puede pagar en cuotas?",
    answer:
      "Sí, ofrecemos diversas opciones de pago, incluyendo la posibilidad de abonar en cuotas mediante tarjetas de crédito y otros métodos de financiamiento.",
  },
  {
    question: "¿Qué garantía tienen los muebles?",
    answer:
      "Nuestros muebles cuentan con una garantía de 12 meses contra defectos de fabricación. Si presentás algún inconveniente, te asistiremos para resolverlo a la brevedad.",
  },
  {
    question: "¿Puedo pedir medidas especiales?",
    answer:
      "Claro, realizamos muebles a medida. Comunicate con nuestro equipo para asesorarte y coordinar las especificaciones de tu pedido personalizado.",
  },
  {
    question: "¿Qué pasa si llega dañado?",
    answer:
      "En caso de recibir un mueble dañado, te pedimos que nos contactes de inmediato para gestionar el reemplazo o la reparación, conforme a nuestras políticas de garantía.",
  },
];

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOpenGraphDefaults() {
  return {
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website" as const,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: `${SITE_NAME} — muebles de madera en Chile`,
      },
    ],
  };
}

export function buildTwitterDefaults() {
  return {
    card: "summary_large_image" as const,
    images: [DEFAULT_OG_IMAGE],
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description: HOME_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE,
      contactType: "customer service",
      availableLanguage: ["Spanish", "es"],
      areaServed: "CL",
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: HOME_DESCRIPTION,
    inLanguage: "es-CL",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: absoluteUrl(DEFAULT_OG_IMAGE),
    },
  };
}

export function buildFaqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildItemListSchema(
  name: string,
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

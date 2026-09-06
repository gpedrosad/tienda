import { DEFAULT_SITE_URL } from "@/lib/whatsapp";

export const SITE_NAME = "Idea Madera";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
export const SITE_LOCALE = "es_CL";
export const DEFAULT_OG_IMAGE = "/logonegro.png";
export const SITE_PHONE = "+56995497838";
export const MERCHANT_RETURN_DAYS = 30;
export const WARRANTY_MONTHS = 2;
export const DEFAULT_PRODUCTION_DAYS = 15;
export const DEFAULT_TRANSIT_DAYS = { min: 3, max: 10 } as const;
// Nota (SEO-13): se retiraron las constantes PRODUCT_AGGREGATE_RATING ("4.9"/"200")
// y productReviewSnippets (testimonios genéricos) por no tener procedencia verificable.
// No publicar ratings ni reseñas hasta contar con fuente real y autorización del negocio.

export const HOME_TITLE = "Muebles de Madera en Chillán y Chile | Idea Madera";
export const HOME_DESCRIPTION =
  "Muebles de madera fabricados en Chillán y enviados a todo Chile: mesas, sillas, bancas y piezas a medida con diseño cuidado. Cotiza por WhatsApp.";

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
      `Nuestros muebles tienen ${WARRANTY_MONTHS} meses de garantía contra defectos de fabricación. Si hay un inconveniente, te ayudamos a resolverlo.`,
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
    "@type": "FurnitureStore",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: HOME_DESCRIPTION,
    telephone: SITE_PHONE,
    email: "hola@ideamadera.cl",
    foundingDate: "2001",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Boyén Sector 01",
      addressLocality: "Chillán",
      addressRegion: "Ñuble",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -36.6066,
      longitude: -72.1034,
    },
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: ["https://instagram.com/ideamadera.cl"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE,
      contactType: "customer service",
      availableLanguage: ["Spanish", "es"],
      areaServed: "CL",
    },
    priceRange: "$$",
    currenciesAccepted: "CLP",
    paymentAccepted: "Transferencia, Tarjeta de crédito, Tarjeta de débito",
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

export function buildMerchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "CL",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: MERCHANT_RETURN_DAYS,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnShippingFees",
  };
}

export function buildShippingDetails(productionDays = DEFAULT_PRODUCTION_DAYS) {
  return {
    "@type": "OfferShippingDetails",
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "CL",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: productionDays,
        maxValue: productionDays,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: DEFAULT_TRANSIT_DAYS.min,
        maxValue: DEFAULT_TRANSIT_DAYS.max,
        unitCode: "DAY",
      },
    },
  };
}

export function buildProductOfferSchema(options: {
  url: string;
  price: number;
  availability: string;
  productionDays?: number;
}) {
  const productionDays = options.productionDays ?? DEFAULT_PRODUCTION_DAYS;

  return {
    "@type": "Offer",
    url: options.url,
    priceCurrency: "CLP",
    price: options.price,
    availability: options.availability,
    itemCondition: "https://schema.org/NewCondition",
    hasMerchantReturnPolicy: buildMerchantReturnPolicy(),
    shippingDetails: buildShippingDetails(productionDays),
  };
}

export function buildServiceOfferSchema(options?: { productionDays?: number }) {
  return {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "CLP",
    hasMerchantReturnPolicy: buildMerchantReturnPolicy(),
    shippingDetails: buildShippingDetails(options?.productionDays),
  };
}


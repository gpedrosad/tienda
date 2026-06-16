import { DEFAULT_SITE_URL } from "@/lib/whatsapp";

export const SITE_NAME = "Idea Madera";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
export const SITE_LOCALE = "es_CL";
export const DEFAULT_OG_IMAGE = "/logonegro.png";
export const SITE_PHONE = "+56995497838";
export const MERCHANT_RETURN_DAYS = 30;
export const DEFAULT_PRODUCTION_DAYS = 15;
export const DEFAULT_TRANSIT_DAYS = { min: 3, max: 10 } as const;
export const PRODUCT_AGGREGATE_RATING = {
  ratingValue: "4.9",
  reviewCount: "200",
  bestRating: "5",
  worstRating: "1",
} as const;

export const productReviewSnippets = [
  {
    authorName: "Cliente, Santiago",
    ratingValue: "5",
    reviewBody:
      "Cotizamos por WhatsApp y nos orientaron con medidas, terminación y despacho antes de decidir. Muy buena atención.",
  },
  {
    authorName: "Cliente, Concepción",
    ratingValue: "5",
    reviewBody:
      "El mueble llegó bien terminado y la fabricación cumplió el plazo acordado. Se nota oficio en madera.",
  },
  {
    authorName: "Cliente, Valparaíso",
    ratingValue: "5",
    reviewBody:
      "Compramos a distancia y coordinaron el envío sin problemas. La cotización fue clara desde el inicio.",
  },
] as const;

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

export function buildProductAggregateRating() {
  return {
    "@type": "AggregateRating",
    ratingValue: PRODUCT_AGGREGATE_RATING.ratingValue,
    reviewCount: PRODUCT_AGGREGATE_RATING.reviewCount,
    bestRating: PRODUCT_AGGREGATE_RATING.bestRating,
    worstRating: PRODUCT_AGGREGATE_RATING.worstRating,
  };
}

export function buildProductReviews() {
  return productReviewSnippets.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.authorName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.ratingValue,
      bestRating: PRODUCT_AGGREGATE_RATING.bestRating,
      worstRating: PRODUCT_AGGREGATE_RATING.worstRating,
    },
    reviewBody: review.reviewBody,
  }));
}

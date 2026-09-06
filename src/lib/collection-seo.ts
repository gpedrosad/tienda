export type CollectionFaq = {
  question: string;
  answer: string;
};

export type CollectionRelatedLink = {
  href: string;
  title: string;
  description: string;
};

export type CollectionSeo = {
  h1: string;
  metadataTitle: string;
  description: string;
  intro?: string;
  guideTitle?: string;
  guideParagraphs?: string[];
  faqs?: CollectionFaq[];
  relatedLinks?: CollectionRelatedLink[];
  whatsappTitle?: string;
  whatsappLines?: string[];
};

export const ALL_PRODUCTS_HANDLE = "todos-los-productos";

export const collectionSeoByHandle: Record<string, CollectionSeo> = {
  [ALL_PRODUCTS_HANDLE]: {
    h1: "Todos los productos",
    metadataTitle: "Muebles de Madera en Chile | Catálogo Online",
    description:
      "Catálogo online de muebles de madera en Chile: mesas, sillas, bancas, veladores, percheros y futones. Cotiza por WhatsApp con envío nacional.",
  },
  mesas: {
    h1: "Mesas de madera",
    metadataTitle: "Mesas de madera para comedor y living",
    description:
      "Explora mesas de madera para comedor y living. Compara modelos y cotiza medidas, terminaciones y despacho con Idea Madera.",
    intro:
      "Fabricamos mesas de madera en Chillán para comedor y living: redondas, rectangulares, trípode y ratonas. Aquí ves los modelos con foto, precio vigente y ficha. Si buscas una mesa baja para el sofá, entra a mesas de centro; si quieres un conjunto de estilo nórdico, usa esa guía. Cotizamos medidas, terminación y despacho por WhatsApp. El precio más bajo publicado hoy es $159.990.",
    guideTitle: "Cómo elegir y cotizar",
    guideParagraphs: [
      "Primero define el uso: comedor o living. Las mesas de comedor van más altas; las ratonas y de centro son bajas, frente al sofá. Luego la forma: rectangular o redonda, según el espacio.",
      "No asignamos un número de comensales si el modelo no tiene medidas publicadas. Para cotizar, escribe el largo o diámetro que necesitas, la terminación y tu comuna. Confirmamos plazo de fabricación y envío antes de que pagues.",
    ],
    faqs: [
      {
        question: "¿Qué mesas de madera fabrican?",
        answer:
          "Mesas de comedor, ratonas y de centro en madera, con foto y precio en esta colección. También cotizamos medidas o terminación distinta si el modelo lo permite.",
      },
      {
        question: "¿Puedo pedir una mesa a medida?",
        answer:
          "Sí. Indica largo o diámetro, alto si aplica, terminación y comuna. Te respondemos por WhatsApp con plazo y despacho.",
      },
      {
        question: "¿Qué diferencia hay entre mesa de comedor y mesa ratona?",
        answer:
          "La de comedor es para sentarse a comer. La ratona o de centro es baja, para el living. En Chile se usan ambos nombres para la mesa frente al sofá.",
      },
      {
        question: "¿Hacen envío a todo Chile?",
        answer:
          "Sí. Al cotizar te confirmamos costo y plazo de despacho según comuna.",
      },
    ],
    relatedLinks: [
      {
        href: "/mesas-de-centro",
        title: "Mesas de centro y ratonas",
        description: "Formatos bajos para living: trípode, Roma, Hairpin y Ferrara.",
      },
      {
        href: "/comedores-nordicos",
        title: "Comedores nórdicos",
        description: "Mesas, sillas y bancas de líneas simples para armar el comedor.",
      },
      {
        href: "/muebles-a-medida",
        title: "Muebles a medida",
        description: "Si ninguna ficha calza, cotiza medidas y terminación desde el taller.",
      },
    ],
    whatsappTitle: "Mesas de madera",
    whatsappLines: [
      "Vengo desde la colección de mesas.",
      "Quiero cotizar una mesa de madera para comedor o living.",
    ],
  },
  sillas: {
    h1: "Sillas de comedor",
    metadataTitle: "Sillas de Madera para Comedor | Chile",
    description:
      "Sillas de madera para comedor y espacios interiores. Modelos Kentucky y Milán con terminación artesanal. Cotiza por WhatsApp con envío a todo Chile.",
  },
  bancas: {
    h1: "Bancas de madera",
    metadataTitle: "Bancas de Madera para Comedor e Interior",
    description:
      "Bancas de madera maciza para comedor, recibidor y living. Diseños clásicos y contemporáneos fabricados en Chile. Cotiza medidas y terminación por WhatsApp.",
  },
  veladores: {
    h1: "Veladores",
    metadataTitle: "Veladores de Madera para Dormitorio",
    description:
      "Veladores de madera para dormitorio con diseño limpio y terminación artesanal. Superficie de apoyo funcional para tu habitación. Cotiza por WhatsApp con envío a todo Chile.",
  },
  sitiales: {
    h1: "Sitiales",
    metadataTitle: "Sitiales y Sillones de Madera | Living Chile",
    description:
      "Sitiales y sillones de madera para living, comedor y espacios de estar. Estructura sólida, fabricación chilena y cotización directa por WhatsApp.",
  },
  percheros: {
    h1: "Percheros de madera",
    metadataTitle: "Percheros de Madera para Hogar",
    description:
      "Percheros de madera para recibidor y dormitorio. Diseño funcional con terminación artesanal. Cotiza por WhatsApp con envíos a todo Chile.",
  },
  pisos: {
    h1: "Pisos y asientos altos de madera",
    metadataTitle: "Pisos de Madera para Barra y Mesada",
    description:
      "Pisos y asientos altos de madera para barras de cocina y mesadas. Fabricación artesanal en Chile. Cotiza cantidad y terminación por WhatsApp con envío a todo el país.",
  },
  futon: {
    h1: "Futones",
    metadataTitle: "Futones de Madera para Living y Dormitorio",
    description:
      "Futones con estructura de madera para living o dormitorio de visitas. Diseño funcional con estética cálida. Cotiza medidas y terminación por WhatsApp.",
  },
};

export function getCollectionSeo(handle: string, category?: string): CollectionSeo {
  const configured = collectionSeoByHandle[handle];
  if (configured) return configured;

  if (category) {
    return {
      h1: category,
      metadataTitle: `${category} de Madera en Chile`,
      description: `${category} de madera fabricados por Idea Madera en Chile. Cotiza por WhatsApp con envío a todo el país.`,
    };
  }

  return {
    h1: "Catálogo",
    metadataTitle: "Catálogo de Muebles de Madera",
    description: "Catálogo de muebles de madera Idea Madera. Cotiza por WhatsApp con envío a todo Chile.",
  };
}

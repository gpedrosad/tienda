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
    h1: "Mesas de madera para comedor y living",
    metadataTitle: "Mesas de Madera: Comedor, Ratonas y Living | Chile",
    description:
      "Mesas de madera maciza para comedor y living: rectangulares, redondas y mesas ratonas. Desde $159.990. Cotiza por WhatsApp con envío a todo Chile.",
    intro:
      "Catálogo de mesas de madera maciza fabricadas en Chillán: mesas de comedor rectangulares y redondas, mesas ratonas para living y mesas de centro. Cada modelo incluye foto, precio vigente y medidas. Si buscas una mesa baja para el sofá, aquí encontrarás mesas ratonas y de centro; si quieres armar un comedor completo, revisa los comedores nórdicos. Cotizamos medidas especiales, terminaciones y despacho por WhatsApp. Precio desde $159.990.",
    guideTitle: "Cómo elegir tu mesa de madera",
    guideParagraphs: [
      "Primero define el uso: mesa de comedor (alta, para comer) o mesa ratona (baja, para el living frente al sofá). Las mesas ratonas también se llaman mesas de centro en Chile. Luego elige la forma: rectangular o redonda, según el espacio y la cantidad de personas.",
      "Para cotizar una mesa a medida, escribe por WhatsApp el largo o diámetro que necesitas, la terminación preferida y tu comuna. Te confirmamos plazo de fabricación, precio y opciones de envío antes de que pagues.",
    ],
    faqs: [
      {
        question: "¿Qué tipos de mesas de madera fabrican?",
        answer:
          "Fabricamos mesas de comedor altas (para sentarse a comer), mesas ratonas bajas (para el living), mesas de centro y mesas redondas. Todas en madera maciza, con foto y precio en esta colección. También cotizamos medidas especiales.",
      },
      {
        question: "¿Qué es una mesa ratona?",
        answer:
          "Una mesa ratona es una mesa baja para el living, que va frente al sofá. En Chile se usan los nombres 'mesa ratona' y 'mesa de centro' indistintamente para referirse a la misma pieza.",
      },
      {
        question: "¿Puedo pedir una mesa de comedor a medida?",
        answer:
          "Sí. Indica largo o diámetro, alto si aplica, terminación y comuna por WhatsApp. Te respondemos con plazo de fabricación, precio y opciones de despacho.",
      },
      {
        question: "¿Cuánto cuesta una mesa de madera?",
        answer:
          "Los precios parten desde $159.990 según modelo y medidas. Cada ficha de producto incluye el precio vigente. Para mesas a medida, cotizamos por WhatsApp con tus especificaciones.",
      },
      {
        question: "¿Hacen envío de mesas a todo Chile?",
        answer:
          "Sí. Al cotizar te confirmamos costo y plazo de despacho según tu comuna o región.",
      },
    ],
    relatedLinks: [
      {
        href: "/guias/medidas-mesa-comedor",
        title: "Guía de medidas de mesa",
        description: "Cómo elegir el tamaño correcto según cantidad de personas.",
      },
      {
        href: "/mesas-de-centro",
        title: "Mesas ratonas y de centro",
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
      "Quiero cotizar una mesa de madera (comedor, ratona o centro).",
    ],
  },
  sillas: {
    h1: "Sillas de madera para comedor",
    metadataTitle: "Sillas de Comedor de Madera | Chile",
    description:
      "Sillas de comedor en madera maciza: Kentucky, Milán y más modelos. Fabricación artesanal en Chile. Cotiza por WhatsApp con envío nacional.",
  },
  bancas: {
    h1: "Bancas de madera",
    metadataTitle: "Bancas de Madera para Comedor e Interior",
    description:
      "Bancas de madera maciza para comedor, recibidor y living. Diseños clásicos y contemporáneos fabricados en Chile. Cotiza medidas y terminación por WhatsApp.",
  },
  veladores: {
    h1: "Veladores de madera",
    metadataTitle: "Veladores de Madera para Dormitorio | Chile",
    description:
      "Veladores de madera maciza para dormitorio: diseño limpio y funcional. Fabricados en Chile. Cotiza por WhatsApp con envío nacional.",
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
      "Pisos y asientos altos de madera para barras de cocina. Fabricación en Chile. Cotiza por WhatsApp con envío nacional.",
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

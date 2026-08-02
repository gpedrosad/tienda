export type CollectionSeo = {
  h1: string;
  metadataTitle: string;
  description: string;
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
    metadataTitle: "Mesas de Madera para Comedor y Living",
    description:
      "Mesas de madera para comedor y living: nórdicas, redondas, trípode y ratonas. Fabricación en Chile, cotización por WhatsApp y envío nacional.",
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
    h1: "Pisos de madera",
    metadataTitle: "Pisos de Madera para Interior",
    description:
      "Pisos de madera para living, dormitorios y espacios interiores. Calidez natural y diseño contemporáneo. Cotiza metros y terminación por WhatsApp con envío a todo Chile.",
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

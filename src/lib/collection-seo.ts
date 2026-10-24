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
  /** Fecha ISO de la última edición del texto de la colección. */
  updatedAt?: string;
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
    updatedAt: "2026-10-14",
    h1: "Todos los productos",
    metadataTitle: "Catálogo de Muebles de Madera en Chile",
    description:
      "Catálogo de muebles de madera fabricados en Chillán: mesas, sillas, bancas, veladores y más. Cotiza por WhatsApp con envío a todo Chile.",
  },
  mesas: {
    updatedAt: "2026-10-24",
    h1: "Mesas de comedor de madera y ratonas para living",
    metadataTitle: "Mesas de Comedor de Madera y Ratonas | Chile",
    description:
      "Mesas de comedor de madera maciza para 4, 6 u 8 personas. También mesas ratonas para living. Fabricación en Chile, desde $159.990. Cotiza por WhatsApp.",
    intro:
      "Catálogo de mesas de madera maciza fabricadas en Chillán: mesas de comedor rectangulares y redondas para 4, 6 u 8 personas, y mesas ratonas bajas para el sofá del living. Si buscas una mesa de comedor de madera, aquí encuentras opciones con distintos estilos y medidas. También ofrecemos mesas ratonas (también llamadas mesas de centro) para el living. Cada modelo incluye foto, precio vigente y medidas. Cotizamos medidas especiales, terminaciones y despacho por WhatsApp. Precio desde $159.990.",
    guideTitle: "Cómo elegir tu mesa de comedor de madera",
    guideParagraphs: [
      "Primero define el uso: mesa de comedor (alta, para comer) o mesa ratona (baja, para el living frente al sofá). Para mesas de comedor de madera, calcula el tamaño según cuántas personas comen: mesa de 160×90 cm para 4-6 personas, mesa de 200×100 cm para 6-8 personas. Si el comedor es cuadrado, considera una mesa redonda para optimizar el espacio visual y la conversación.",
      "Revisa nuestra [guía de medidas de mesa de comedor](/guias/medidas-mesa-comedor) para calcular el tamaño ideal según tu espacio y cantidad de personas. Si la mesa es baja, la [guía de medidas de mesa de centro](/guias/medidas-mesa-de-centro) ordena el largo respecto al sofá, la altura respecto al asiento y el espacio para caminar. Si buscas armar un comedor completo de estilo coordinado, revisa [comedores nórdicos](/comedores-nordicos) con mesas, sillas y bancas.",
      "Para cotizar una [mesa de comedor a medida](/mesas-de-comedor-a-medida), escribe por WhatsApp el largo o diámetro que necesitas, la terminación preferida y tu comuna. Te confirmamos plazo de fabricación, precio y opciones de envío antes de que pagues.",
    ],
    faqs: [
      {
        question: "¿Qué tipos de mesas de madera fabrican?",
        answer:
          "Fabricamos mesas de comedor altas (para sentarse a comer), mesas ratonas bajas (para el living), mesas de centro y mesas redondas. Todas en madera maciza, con foto y precio en esta colección. También cotizamos medidas especiales.",
      },
      {
        question: "¿Qué medidas de mesa de comedor recomiendan?",
        answer:
          "Para 4-6 personas: mesa de 160×90 cm. Para 6-8 personas: mesa de 200×100 cm. Para 8-10 personas: mesa de 240×100 cm. Si tienes dudas, revisa nuestra [guía de medidas de mesa de comedor](/guias/medidas-mesa-comedor) o escribe por WhatsApp con las medidas de tu comedor.",
      },
      {
        question: "¿Qué es una mesa ratona?",
        answer:
          "Una mesa ratona es una mesa baja para el living, que va frente al sofá. En Chile se usan los nombres 'mesa ratona' y 'mesa de centro' indistintamente para referirse a la misma pieza. El largo respecto al sofá, la altura respecto al asiento y el espacio para caminar están en la [guía de medidas de mesa de centro](/guias/medidas-mesa-de-centro).",
      },
      {
        question: "¿Puedo pedir una mesa de comedor a medida?",
        answer:
          "Sí. Indica largo o diámetro, alto si aplica, terminación y comuna por WhatsApp. Te respondemos con plazo de fabricación, precio y opciones de despacho. El encargo está en [mesas de comedor a medida](/mesas-de-comedor-a-medida).",
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
        href: "/guias/medidas-mesa-de-centro",
        title: "Medidas de mesa de centro y ratona",
        description:
          "El largo respecto al sofá, la altura respecto al asiento y el espacio para caminar.",
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
        href: "/mesas-de-comedor-a-medida",
        title: "Mesa de comedor a medida",
        description: "Largo o diámetro fuera del catálogo. El precio se cotiza por WhatsApp.",
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
    updatedAt: "2026-10-18",
    h1: "Sillas de madera para comedor",
    metadataTitle: "Sillas de Madera para Comedor | Chile",
    description:
      "Sillas de comedor (Milán Lenga, en lenga) y Kentucky, silla de descanso reclinada de listones. Fabricadas en Chile. Cotiza por WhatsApp.",
    intro:
      "El catálogo incluye sillas de comedor y una silla de descanso. La Silla Milán Lenga es de madera de lenga, contemporánea y liviana, para el comedor diario, fabricada en Chile. La Silla Kentucky es una silla de descanso reclinada, de listones de madera maciza, fabricada en Chillán, con barniz natural o negro. Cotiza cantidad, terminación y despacho por WhatsApp.",
    guideTitle: "Cómo elegir sillas de madera para tu comedor",
    guideParagraphs: [
      "Al elegir sillas de comedor de madera, considera la altura del asiento (debe permitir que tus piernas queden en ángulo de 90° con los pies apoyados), el ancho (mínimo 45 cm para comodidad) y la coordinación con la mesa (altura de mesa estándar: 75 cm; altura de asiento: 45-48 cm).",
      "Revisa cuántas sillas necesitas según el largo de la mesa: para mesa de 160 cm caben 4-6 sillas; para mesa de 200 cm caben 6-8 sillas. Si tienes dudas sobre medidas, revisa nuestra guía de medidas de mesa de comedor.",
    ],
    faqs: [
      {
        question: "¿Qué altura debe tener una silla de comedor?",
        answer:
          "La altura de asiento estándar es 45-48 cm desde el piso, compatible con mesas de comedor de 75 cm de alto. Esto permite sentarse cómodamente con las piernas en ángulo de 90°.",
      },
      {
        question: "¿Cuántas sillas necesito para mi mesa de comedor?",
        answer:
          "Depende del largo de la mesa. Para una mesa de 160 cm caben 4-6 sillas; para una de 200 cm caben 6-8 sillas. Deja al menos 60 cm de ancho por persona.",
      },
      {
        question: "¿Las sillas de madera son cómodas para uso diario?",
        answer:
          "Sí. Las sillas de madera maciza con diseño ergonómico son cómodas para comidas diarias. Si las usas para largas sobremesas, considera modelos con respaldo más alto o agrega cojines.",
      },
      {
        question: "¿Puedo pedir sillas de madera a medida?",
        answer:
          "Sí. Cotiza por WhatsApp indicando altura de asiento, ancho, estilo preferido y cantidad. Te confirmamos plazo de fabricación y precio.",
      },
      {
        question: "¿Las sillas vienen barnizadas?",
        answer:
          "Sí. Todas las sillas de este catálogo incluyen terminación barnizada lista para usar. Si prefieres otro acabado, indícalo al cotizar.",
      },
    ],
    relatedLinks: [
      {
        href: "/collections/mesas",
        title: "Mesas de madera",
        description: "Mesas de comedor para coordinar con tus sillas.",
      },
      {
        href: "/comedores-nordicos",
        title: "Comedores nórdicos completos",
        description: "Conjuntos de mesa + sillas con diseño coordinado.",
      },
      {
        href: "/guias/elegir-sillas-madera-comedor",
        title: "Guía: Cómo elegir sillas de madera",
        description: "Altura, ancho, cantidad y medidas según tu mesa.",
      },
      {
        href: "/guias/medidas-mesa-comedor",
        title: "Guía de medidas de mesa",
        description: "Cuántas personas caben según el tamaño de tu mesa.",
      },
    ],
    whatsappTitle: "Sillas de madera",
    whatsappLines: [
      "Vengo desde la colección de sillas de madera.",
      "Quiero cotizar sillas de comedor (modelo, cantidad, comuna).",
    ],
  },
  bancas: {
    updatedAt: "2026-06-24",
    h1: "Bancas de madera",
    metadataTitle: "Bancas de Madera para Comedor e Interior",
    description:
      "Bancas de madera maciza para comedor, recibidor y living. Diseños clásicos y contemporáneos fabricados en Chile. Cotiza medidas y terminación por WhatsApp.",
  },
  veladores: {
    updatedAt: "2026-10-16",
    h1: "Veladores de madera para dormitorio",
    metadataTitle: "Veladores de Madera para Dormitorio | Chillán",
    description:
      "Veladores de madera para dormitorio en Chillán. Fabricación artesanal, altura 50-70 cm ideal para cama. Cotiza por WhatsApp con envío a todo Chile.",
    intro:
      "Veladores de madera maciza para dormitorio fabricados a medida en Chillán: mesitas de noche funcionales con diseño limpio y terminación artesanal. Un velador bien elegido suma orden, calidez y equilibrio visual al costado de la cama. Fabricamos veladores con medidas personalizadas según tu espacio y preferencias. Cada modelo incluye foto, precio y medidas. Cotiza medidas especiales, terminaciones y despacho por WhatsApp.",
    guideTitle: "Cómo elegir el velador ideal para tu dormitorio",
    guideParagraphs: [
      "La altura del velador debe permitir alcanzar cómodamente desde la cama: lo ideal es que quede a la misma altura del colchón o hasta 10 cm más arriba. Para una cama de 60 cm de alto, un velador de 50-70 cm funciona bien. Si la cama tiene colchón más grueso, suma esos centímetros.",
      "El ancho y la profundidad dependen del espacio disponible. Si el velador va entre la cama y la pared, deja al menos 10-15 cm de pasillo. Si tienes espacio limitado, un velador angosto de 30-35 cm de ancho es suficiente para apoyar lámpara, celular y un vaso de agua. Si tienes más espacio, un velador de 40-50 cm da mayor superficie útil.",
      "Los veladores de madera maciza son duraderos y fáciles de mantener. Cotiza por WhatsApp si necesitas un velador con medidas especiales o una terminación específica.",
    ],
    faqs: [
      {
        question: "¿Qué altura debe tener un velador?",
        answer:
          "La altura ideal de un velador es entre 50 y 70 cm, a la misma altura del colchón o hasta 10 cm más arriba. Esto permite alcanzar cómodamente desde la cama sin tener que agacharse o estirarse.",
      },
      {
        question: "¿Qué tamaño de velador necesito para mi dormitorio?",
        answer:
          "Depende del espacio disponible. Un velador de 30-35 cm de ancho es funcional para espacios ajustados; un velador de 40-50 cm da mayor superficie útil si tienes espacio. La profundidad típica es 30-40 cm.",
      },
      {
        question: "¿Puedo pedir un velador a medida?",
        answer:
          "Sí. Fabricamos veladores con medidas personalizadas. Escríbenos por WhatsApp con alto, ancho y profundidad que necesitas, más tu comuna.",
      },
      {
        question: "¿Qué terminación tienen los veladores?",
        answer:
          "Los veladores de este catálogo tienen terminación barnizada lista para usar. Si necesitas una terminación específica o sin barniz, indícalo al cotizar y te confirmamos disponibilidad.",
      },
      {
        question: "¿Hacen envío de veladores a todo Chile?",
        answer:
          "Sí. Al cotizar te confirmamos costo y plazo de despacho según tu comuna o región.",
      },
    ],
    relatedLinks: [
      {
        href: "/guias/cuidado-muebles-madera",
        title: "Guía de cuidado de madera",
        description: "Cómo mantener tus muebles de madera como nuevos.",
      },
      {
        href: "/collections/mesas",
        title: "Mesas de madera",
        description: "Mesas de comedor y living en distintos tamaños.",
      },
      {
        href: "/muebles-a-medida",
        title: "Muebles a medida",
        description: "Cotiza muebles con medidas personalizadas.",
      },
    ],
    whatsappTitle: "Veladores de madera",
    whatsappLines: [
      "Vengo desde la colección de veladores.",
      "Quiero cotizar un velador de madera para dormitorio.",
    ],
  },
  sitiales: {
    updatedAt: "2026-08-02",
    h1: "Sitiales",
    metadataTitle: "Sitiales y Sillones de Madera | Living Chile",
    description:
      "Sitiales y sillones de madera para living, comedor y espacios de estar. Estructura sólida, fabricación chilena y cotización directa por WhatsApp.",
  },
  percheros: {
    updatedAt: "2026-06-24",
    h1: "Percheros de madera",
    metadataTitle: "Percheros de Madera para Hogar",
    description:
      "Percheros de madera para recibidor y dormitorio. Diseño funcional con terminación artesanal. Cotiza por WhatsApp con envíos a todo Chile.",
  },
  pisos: {
    updatedAt: "2026-10-05",
    h1: "Pisos y asientos altos de madera",
    metadataTitle: "Pisos de Madera para Barra y Mesada",
    description:
      "Pisos y asientos altos de madera para barras de cocina. Fabricación en Chile. Cotiza por WhatsApp con envío nacional.",
  },
  futon: {
    updatedAt: "2026-06-24",
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

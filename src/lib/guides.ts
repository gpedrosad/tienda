import type { Metadata } from "next";
import { absoluteUrl, buildServiceOfferSchema, SITE_NAME } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type GuideFaq = { question: string; answer: string };
export type GuideRelatedLink = { href: string; title: string; description: string };

export type GuideConfig = {
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  keywords?: string[];
  eyebrow: string;
  h1: string;
  intro: string;
  updatedDate?: string;
  sections: Array<{
    title: string;
    content: string[];
    bullets?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
  }>;
  faqs?: GuideFaq[];
  relatedLinks?: GuideRelatedLink[];
  ctaTitle?: string;
  ctaParagraph?: string;
  whatsappLines?: string[];
};

export function buildGuideWhatsAppMessage(lines: string[]) {
  return ["Hola Idea Madera", ...lines].join("\n");
}

export function buildGuideWhatsAppHref(lines: string[]) {
  return buildWhatsAppUrl(buildGuideWhatsAppMessage(lines));
}

export function buildGuideMetadata(config: GuideConfig): Metadata {
  return {
    title: { absolute: config.pageTitle },
    description: config.pageDescription,
    alternates: { canonical: config.canonicalPath },
    ...(config.keywords ? { keywords: config.keywords } : {}),
    openGraph: {
      title: config.pageTitle,
      description: config.pageDescription,
      url: config.canonicalPath,
      siteName: SITE_NAME,
      locale: "es_CL",
      type: "article",
      images: [{ url: "/logonegro.png", width: 800, height: 800, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.pageTitle,
      description: config.pageDescription,
      images: [{ url: "/logonegro.png", width: 800, height: 800, alt: SITE_NAME }],
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
}

export function buildGuideSchemaGraph(config: GuideConfig) {
  const breadcrumbName = config.h1;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Guías", item: absoluteUrl("/guias") },
        {
          "@type": "ListItem",
          position: 3,
          name: breadcrumbName,
          item: absoluteUrl(config.canonicalPath),
        },
      ],
    },
    {
      "@type": "Article",
      headline: config.h1,
      description: config.pageDescription,
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logonegro.png"),
        },
      },
      datePublished: config.updatedDate || new Date().toISOString().split("T")[0],
      dateModified: config.updatedDate || new Date().toISOString().split("T")[0],
      inLanguage: "es-CL",
    },
  ];

  if (config.faqs && config.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: config.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export const guidePaths = [
  "/guias/cuidado-muebles-madera",
  "/guias/medidas-mesa-comedor",
  "/guias/cotizar-muebles-a-medida",
] as const;

export const cuidadoMueblesGuideConfig: GuideConfig = {
  canonicalPath: "/guias/cuidado-muebles-madera",
  pageTitle: "Cuidado y Mantención de Muebles de Madera Maciza | Chile",
  pageDescription:
    "Guía práctica para cuidar y mantener muebles de madera maciza en Chile: limpieza, barniz, manchas y protección para que duren años.",
  keywords: [
    "cuidado muebles de madera",
    "mantención madera maciza",
    "cómo limpiar muebles de madera",
    "proteger muebles de madera",
    "mantención barniz madera",
  ],
  eyebrow: "Guía práctica",
  h1: "Cómo cuidar y mantener tus muebles de madera maciza",
  intro:
    "Los muebles de madera maciza pueden durar décadas con el cuidado correcto. Esta guía te enseña a limpiar, proteger y mantener tu mesa, silla, banca o mueble de comedor para que conserve su belleza y resistencia con el paso del tiempo.",
  updatedDate: "2026-10-05",
  sections: [
    {
      title: "Limpieza diaria y semanal",
      content: [
        "Para el uso diario, limpia la superficie con un paño seco o levemente húmedo. Evita empapar la madera: el exceso de agua puede mancharla o levantar la veta.",
        "Una vez por semana, usa un paño limpio con una gota de jabón neutro diluido en agua tibia. Pasa el paño, seca inmediatamente con otro paño seco y deja que la pieza termine de secar al aire.",
      ],
      bullets: [
        "Paño seco o levemente húmedo para limpieza diaria",
        "Jabón neutro diluido una vez por semana",
        "Secar siempre después de limpiar con agua",
        "No usar esponjas abrasivas ni productos con amoníaco",
      ],
    },
    {
      title: "Manchas y derrames",
      content: [
        "Si derramas líquido sobre la mesa, límpialo de inmediato con papel absorbente o un paño seco. Cuanto más rápido actúes, menos probabilidad hay de que la madera absorba el líquido y quede una mancha.",
        "Para manchas secas, prueba con un paño húmedo y jabón neutro. Si la mancha persiste, puede que el barniz se haya desgastado en ese punto; en ese caso, considera aplicar un retoque de barniz o consulta con el fabricante.",
      ],
    },
    {
      title: "Protección y barniz",
      content: [
        "El barniz es la capa que protege la madera del agua, las manchas y el desgaste diario. Con el tiempo, el barniz puede desgastarse en las zonas de mayor roce.",
        "Si notas que el agua ya no forma gotas sobre la superficie (sino que se absorbe), es señal de que el barniz está débil. Puedes aplicar una mano nueva de barniz a base de agua para renovar la protección. Si no te sientes cómodo haciéndolo, escríbenos y te orientamos.",
      ],
    },
    {
      title: "Exposición al sol y humedad",
      content: [
        "La madera es un material natural que reacciona al clima. El sol directo puede oscurecerla con el tiempo; la humedad excesiva puede hincharla; el aire muy seco puede contraerla o agrietarla.",
        "Dentro de lo posible, coloca tus muebles lejos de ventanas con sol directo durante todo el día, y mantén una humedad ambiente equilibrada (especialmente en invierno si usas calefacción intensa).",
      ],
    },
    {
      title: "Uso de individuales y protectores",
      content: [
        "Para evitar marcas de platos calientes, vasos con condensación o utensilios que rayan, usa individuales, posavasos y manteles cuando sea necesario.",
        "Estos accesorios simples extienden la vida del barniz y mantienen la superficie impecable por más tiempo.",
      ],
    },
  ],
  faqs: [
    {
      question: "¿Cada cuánto debo aplicar barniz a mis muebles de madera?",
      answer:
        "Depende del uso. Para una mesa de comedor de uso diario, revisar el barniz cada 1-2 años. Si el agua se absorbe en lugar de formar gotas, es momento de renovar la capa protectora.",
    },
    {
      question: "¿Puedo usar productos de limpieza multiuso en madera?",
      answer:
        "No se recomienda. Muchos limpiadores contienen alcohol o amoníaco que pueden dañar el barniz. Usa jabón neutro diluido y seca bien.",
    },
    {
      question: "¿Qué hago si mi mesa de madera se raya?",
      answer:
        "Rayas superficiales se pueden disimular con retoque de barniz o cera para madera. Si la raya es profunda, consulta con el fabricante para una reparación adecuada.",
    },
    {
      question: "¿Los muebles de madera maciza se pueden usar en exterior?",
      answer:
        "Solo si fueron fabricados y tratados para intemperie. La madera de interior expuesta a lluvia y sol directo se deteriora rápido. Consulta al fabricante antes de ubicar un mueble afuera.",
    },
  ],
  relatedLinks: [
    {
      href: "/collections/mesas",
      title: "Mesas de madera",
      description: "Explora mesas de comedor y living con barniz de fábrica listo para usar.",
    },
    {
      href: "/muebles-a-medida",
      title: "Muebles a medida",
      description: "Cotiza muebles con terminación y protección según tu proyecto.",
    },
    {
      href: "/contacto",
      title: "Contacto",
      description: "Consulta por mantención o barnizado de tus muebles de madera.",
    },
  ],
  ctaTitle: "¿Tienes dudas sobre el cuidado de tus muebles?",
  ctaParagraph:
    "Escríbenos por WhatsApp y te orientamos con productos, terminaciones o mantención de tus muebles de madera.",
  whatsappLines: [
    "Vengo desde la guía de cuidado de muebles de madera.",
    "Tengo una consulta sobre mantención o protección de mis muebles.",
  ],
};

export const medidasMesaGuideConfig: GuideConfig = {
  canonicalPath: "/guias/medidas-mesa-comedor",
  pageTitle: "Medidas de Mesa de Comedor según Cantidad de Personas | Chile",
  pageDescription:
    "Guía práctica para elegir el tamaño de mesa de comedor según cuántas personas comen: medidas recomendadas, espacio por persona y circulación.",
  keywords: [
    "medidas mesa comedor",
    "tamaño mesa comedor",
    "mesa comedor 4 personas",
    "mesa comedor 6 personas",
    "mesa comedor 8 personas",
    "cuánto mide una mesa de comedor",
  ],
  eyebrow: "Guía práctica",
  h1: "Cómo elegir las medidas de tu mesa de comedor",
  intro:
    "La mesa de comedor es el centro de reunión de la casa. Elegir el tamaño correcto asegura que todos coman cómodos y que el espacio fluya sin apreturas. Esta guía te ayuda a calcular las medidas ideales según la cantidad de personas y el espacio disponible.",
  updatedDate: "2026-10-05",
  sections: [
    {
      title: "Espacio mínimo por persona",
      content: [
        "Cada comensal necesita al menos 60 cm de ancho y 40 cm de fondo para sentarse y usar cubiertos sin chocar con el vecino. Este es el mínimo funcional; 70 cm de ancho por persona es más cómodo para cenas largas o con varios platos.",
        "En mesas rectangulares, suma 60-70 cm por persona en el largo. En mesas redondas, el diámetro define cuántos caben sin apreturas.",
      ],
    },
    {
      title: "Medidas recomendadas por cantidad de personas",
      content: [
        "Estas son las medidas de referencia para mesas rectangulares y redondas según la cantidad de comensales:",
      ],
      table: {
        headers: ["Personas", "Mesa rectangular", "Mesa redonda"],
        rows: [
          ["2-4", "120 × 80 cm", "Ø 90-100 cm"],
          ["4-6", "160 × 90 cm", "Ø 120 cm"],
          ["6-8", "200 × 100 cm", "Ø 140 cm"],
          ["8-10", "240 × 100 cm", "Ø 160 cm"],
        ],
      },
    },
    {
      title: "Circulación alrededor de la mesa",
      content: [
        "Además del tamaño de la mesa, necesitas espacio para que las personas se sienten y se levanten sin golpear la pared o los muebles.",
        "Deja al menos 80 cm libres entre el borde de la mesa y la pared o mueble más cercano. Si el pasillo es de circulación frecuente (por ejemplo, entre comedor y cocina), considera 100-120 cm para mayor comodidad.",
      ],
    },
    {
      title: "Mesas redondas vs. rectangulares",
      content: [
        "Las mesas redondas favorecen la conversación y optimizan el espacio visual, pero ocupan un diámetro fijo. Son ideales para comedores cuadrados o integrados donde quieres que todos se vean.",
        "Las mesas rectangulares son más versátiles para espacios alargados y permiten agregar más comensales en los extremos cuando recibes visitas.",
      ],
    },
    {
      title: "Mesas a medida para espacios únicos",
      content: [
        "Si tu comedor tiene medidas especiales, una mesa a medida puede aprovechar mejor el espacio. Envíanos las medidas del comedor (largo, ancho y ubicación de puertas) y te proponemos un tamaño óptimo.",
        "También podemos fabricar mesas más largas o más angostas según tu necesidad: por ejemplo, 180 × 85 cm para un comedor estrecho, o 220 × 100 cm si recibes seguido.",
      ],
    },
  ],
  faqs: [
    {
      question: "¿Cuánto debe medir una mesa para 6 personas?",
      answer:
        "Para 6 personas cómodas, una mesa rectangular de 160 × 90 cm o una mesa redonda de Ø 120 cm son medidas estándar. Si el espacio lo permite, 180 × 90 cm da aún más comodidad.",
    },
    {
      question: "¿Una mesa redonda o rectangular ocupa más espacio?",
      answer:
        "Depende del comedor. Una mesa redonda de Ø 120 cm necesita al menos 280 × 280 cm de comedor libre (120 cm de mesa + 80 cm de circulación por lado). Una rectangular de 160 × 90 puede caber en un comedor de 320 × 250 cm. Mide tu espacio antes de decidir.",
    },
    {
      question: "¿Puedo pedir una mesa de comedor con medidas personalizadas?",
      answer:
        "Sí. Cotiza por WhatsApp con el largo, ancho y cantidad de personas. Te orientamos en el formato y la madera según tu proyecto.",
    },
    {
      question: "¿Qué pasa si mi comedor es muy pequeño?",
      answer:
        "Considera una mesa de 120 × 80 cm para 4 personas, o una mesa extensible que se agranda cuando recibes visitas. También puedes consultar por una mesa ratona alta para usar con bancos en lugar de sillas tradicionales.",
    },
  ],
  relatedLinks: [
    {
      href: "/collections/mesas",
      title: "Mesas de madera",
      description: "Explora mesas de comedor en distintos tamaños y formatos.",
    },
    {
      href: "/comedores-nordicos",
      title: "Comedores nórdicos",
      description: "Conjuntos de mesa + sillas con medidas balanceadas.",
    },
    {
      href: "/muebles-a-medida",
      title: "Muebles a medida",
      description: "Cotiza una mesa con las medidas exactas de tu comedor.",
    },
  ],
  ctaTitle: "¿No sabes qué medida de mesa elegir?",
  ctaParagraph:
    "Envíanos las medidas de tu comedor por WhatsApp y te recomendamos el tamaño ideal de mesa según la cantidad de personas y el espacio disponible.",
  whatsappLines: [
    "Vengo desde la guía de medidas de mesa de comedor.",
    "Quiero ayuda para elegir el tamaño correcto de mi mesa.",
    "Puedo enviar las medidas del comedor y cuántas personas somos.",
  ],
};

export const cotizarMueblesGuideConfig: GuideConfig = {
  canonicalPath: "/guias/cotizar-muebles-a-medida",
  pageTitle: "Cómo Cotizar un Mueble a Medida por WhatsApp | Idea Madera",
  pageDescription:
    "Guía rápida para cotizar muebles de madera a medida: qué información enviar, cómo describir tu proyecto y qué esperar en la respuesta.",
  keywords: [
    "cotizar muebles a medida",
    "cómo pedir muebles a medida",
    "cotización muebles madera",
    "pedir presupuesto muebles",
    "muebles personalizados chile",
  ],
  eyebrow: "Guía práctica",
  h1: "Cómo cotizar un mueble a medida por WhatsApp",
  intro:
    "Cotizar un mueble a medida es más fácil de lo que parece. Con la información correcta, podemos darte una propuesta clara en pocas horas. Esta guía te explica qué datos enviar para que tu cotización sea precisa y rápida.",
  updatedDate: "2026-10-05",
  sections: [
    {
      title: "Qué información necesitamos",
      content: [
        "Para cotizar un mueble a medida con precisión, nos ayuda muchísimo recibir estos datos desde el primer mensaje:",
      ],
      bullets: [
        "Tipo de pieza: mesa, cubierta, puerta, peldaño, moldura, mueble de cocina, etc.",
        "Medidas: largo, ancho, alto, espesor o diámetro según aplique (en centímetros)",
        "Uso: interior, exterior, comedor, quincho, barra, etc.",
        "Comuna de entrega (para calcular despacho)",
        "Fotos o croquis: si tienes una referencia visual, ayuda a entender el estilo",
      ],
    },
    {
      title: "Cómo describir tu proyecto",
      content: [
        "No necesitas ser técnico. Escribe de forma natural: por ejemplo, 'Quiero una cubierta para el mesón del quincho, 250 cm de largo × 70 cm de ancho, va bajo techo'. Eso nos da contexto para recomendar madera y acabado.",
        "Si no tienes todas las medidas exactas, no te preocupes: con medidas aproximadas y fotos del espacio podemos orientarte antes de que confirmes.",
      ],
    },
    {
      title: "Qué esperar en la respuesta",
      content: [
        "Respondemos en horario hábil, usualmente en pocas horas. La respuesta incluye:",
      ],
      bullets: [
        "Confirmación de si es factible fabricar lo que pides",
        "Opciones de madera y terminación según el uso",
        "Precio referencial (puede variar según ajustes finales)",
        "Plazo de fabricación estimado",
        "Costo o modalidad de despacho a tu comuna",
      ],
    },
    {
      title: "Ajustes y cambios antes de fabricar",
      content: [
        "Si después de la primera cotización quieres ajustar medidas, terminación o cantidad, no hay problema. Confirmamos los cambios y actualizamos la cotización antes de que pagues.",
        "El objetivo es que tengas claridad total de lo que vas a recibir: medidas, material, color, plazo y despacho.",
      ],
    },
    {
      title: "Pago y fabricación",
      content: [
        "Una vez que confirmas, coordinamos el pago (transferencia o tarjeta según el caso). Después iniciamos la fabricación con el plazo acordado.",
        "Te mantenemos al tanto del avance y te avisamos cuando la pieza esté lista para despachar o retirar.",
      ],
    },
  ],
  faqs: [
    {
      question: "¿Cuánto demora una cotización?",
      answer:
        "Respondemos en horario hábil, usualmente en pocas horas. Si el proyecto es complejo, puede tomar un día revisar opciones y confirmar factibilidad.",
    },
    {
      question: "¿Puedo pedir cambios después de cotizar?",
      answer:
        "Sí. Antes de pagar, puedes ajustar medidas, terminación o cantidad. Actualizamos la cotización y te confirmamos el nuevo precio y plazo.",
    },
    {
      question: "¿Qué pasa si no tengo las medidas exactas?",
      answer:
        "No hay problema. Con medidas aproximadas y fotos del espacio podemos darte una cotización inicial. Luego confirmas las medidas finales antes de fabricar.",
    },
    {
      question: "¿Hacen muebles para proyectos comerciales?",
      answer:
        "Sí. Atendemos particulares, arquitectos, diseñadores y empresas. Si necesitas varias piezas iguales o un proyecto grande, coméntalo al cotizar para ajustar plazos.",
    },
  ],
  relatedLinks: [
    {
      href: "/muebles-a-medida",
      title: "Muebles a medida",
      description: "Descubre qué piezas fabricamos a medida y sus características.",
    },
    {
      href: "/cubiertas-a-medida",
      title: "Cubiertas a medida",
      description: "Cotiza mesones, tablones y cubiertas de madera según tu proyecto.",
    },
    {
      href: "/contacto",
      title: "Contacto",
      description: "Escríbenos por WhatsApp o correo para cotizar.",
    },
  ],
  ctaTitle: "¿Listo para cotizar tu mueble a medida?",
  ctaParagraph:
    "Escríbenos por WhatsApp con las medidas, el uso y tu comuna. Te respondemos con una propuesta clara y completa.",
  whatsappLines: [
    "Vengo desde la guía de cómo cotizar muebles a medida.",
    "Quiero cotizar un proyecto personalizado en madera.",
    "Puedo enviar tipo de pieza, medidas, uso, comuna y fotos de referencia.",
  ],
};

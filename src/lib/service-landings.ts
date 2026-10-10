import type { Metadata } from "next";
import { absoluteUrl, buildServiceOfferSchema, SITE_NAME } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type LandingHighlight = { title: string; description: string };
export type LandingStep = { title: string; description: string };
export type LandingFaq = { question: string; answer: string };
export type LandingStat = { value: string; label: string };

export type LandingRelatedLink = { href: string; title: string; description: string };

export type ServiceLandingConfig = {
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  keywords?: string[];
  eyebrow: string;
  h1: string;
  heroParagraph: string;
  badges: string[];
  whatsappButtonLabel: string;
  whatsappProductTitle: string;
  whatsappLines: string[];
  heroHighlights: LandingHighlight[];
  sectionTitle: string;
  sectionParagraph: string;
  featureCards: LandingHighlight[];
  stepsTitle: string;
  steps: LandingStep[];
  bottomHighlights?: LandingHighlight[];
  relatedLinks?: LandingRelatedLink[];
  extraSections?: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqItems: LandingFaq[];
  ctaTitle: string;
  ctaParagraph: string;
  ctaBullets: string[];
  schemaType: "Service" | "AboutPage" | "ContactPage";
  serviceName?: string;
  serviceType?: string;
  stats?: LandingStat[];
  contactDetails?: {
    phone: string;
    email: string;
    address: string;
    instagramHandle?: string;
  };
};

export function buildLandingWhatsAppMessage(config: ServiceLandingConfig) {
  return ["Hola Idea Madera", ...config.whatsappLines].join("\n");
}

export function buildLandingWhatsAppHref(config: ServiceLandingConfig) {
  return buildWhatsAppUrl(buildLandingWhatsAppMessage(config));
}

export function buildLandingMetadata(config: ServiceLandingConfig): Metadata {
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
      type: "website",
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

export function buildLandingSchemaGraph(config: ServiceLandingConfig) {
  const breadcrumbName = config.canonicalPath.replace(/^\//, "").replace(/-/g, " ");
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: breadcrumbName,
          item: absoluteUrl(config.canonicalPath),
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: config.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  if (config.schemaType === "Service") {
    graph.unshift({
      "@type": "Service",
      name: config.serviceName,
      serviceType: config.serviceType,
      provider: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
      areaServed: { "@type": "Country", name: "Chile" },
      description: config.pageDescription,
      audience: [
        { "@type": "Audience", audienceType: "Particulares" },
        { "@type": "Audience", audienceType: "Empresas" },
      ],
      offers: buildServiceOfferSchema(),
    });
  }

  if (config.schemaType === "AboutPage") {
    graph.unshift({
      "@type": "AboutPage",
      name: config.pageTitle,
      description: config.pageDescription,
      url: absoluteUrl(config.canonicalPath),
      mainEntity: {
        "@type": "Organization",
        name: SITE_NAME,
        url: absoluteUrl("/"),
        foundingDate: "2001",
        description: config.pageDescription,
        areaServed: { "@type": "Country", name: "Chile" },
      },
    });
  }

  if (config.schemaType === "ContactPage") {
    graph.unshift({
      "@type": "ContactPage",
      name: config.pageTitle,
      description: config.pageDescription,
      url: absoluteUrl(config.canonicalPath),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

const sharedCtaBullets = [
  "Atención para empresas y particulares.",
  "Envíos a todo Chile.",
  "Respuesta rápida para cotización.",
];

export const peldanosLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/peldanos-a-medida",
  pageTitle: "Peldaños de Madera para Escalera a Medida | Chile",
  pageDescription:
    "Peldaños y huellas de madera para escalera a medida. Cotiza largo, ancho, espesor y cantidad por WhatsApp. Envíos a todo Chile.",
  keywords: [
    "peldaños a medida",
    "peldaños de madera a medida",
    "escalones de madera a medida",
    "peldaños para escalera",
    "cotizar peldaños a medida",
    "peldaños de madera para escalera",
    "huellas de madera para escalera",
    "huellas de escalera a medida",
  ],
  eyebrow: "Peldaños a medida en madera",
  h1: "Peldaños a medida para escaleras",
  heroParagraph:
    "Fabricamos peldaños (huellas) a medida en madera para escaleras nuevas o remodelaciones. Cotizamos con largo, ancho, espesor y cantidad. No incluye la estructura de la escalera ni el montaje, salvo que lo confirmemos al cotizar.",
  badges: ["Envíos a todo Chile", "Empresas y particulares"],
  whatsappButtonLabel: "Cotizar peldaños por WhatsApp",
  whatsappProductTitle: "Peldaños a medida",
  whatsappLines: [
    "Vengo desde la página de peldaños a medida.",
    "Quiero cotizar peldaños para mi proyecto.",
    "Puedo enviar cantidad, largo, ancho, espesor, comuna y foto/plano de referencia.",
  ],
  heroHighlights: [
    { title: "Medidas exactas por proyecto", description: "Fabricación personalizada para ajuste preciso." },
    { title: "Empresas y particulares", description: "Desde una obra pequeña hasta proyectos grandes." },
    { title: "Envíos a todo Chile", description: "Coordinación de despacho según comuna o región." },
  ],
  sectionTitle: "Peldaños de madera a medida para cada espacio",
  sectionParagraph:
    "Fabricamos peldaños para escaleras nuevas o remodelaciones, considerando diseño, uso y durabilidad. También atendemos búsquedas como peldaños a medidas, escalones de madera a medida y peldaños para escalera de madera.",
  featureCards: [
    {
      title: "Peldaños rectos",
      description:
        "Ideal para escaleras lineales o proyectos de renovación donde se requiere precisión en largo, ancho y espesor.",
    },
    {
      title: "Peldaños con terminación",
      description:
        "Opciones de acabado según estilo del proyecto: natural, oscuro o personalizado en base a referencia.",
    },
    {
      title: "Proyectos a pedido",
      description:
        "Si tu escalera tiene medidas especiales o detalles no estándar, te ayudamos con una propuesta ajustada a tu caso.",
    },
  ],
  stepsTitle: "Cómo cotizar tus peldaños a medida",
  steps: [
    {
      title: "Envíanos tus medidas",
      description: "Comparte largo, ancho, espesor y cantidad de peldaños. Si tienes planos o fotos, mejor aún.",
    },
    {
      title: "Definimos material y acabado",
      description: "Te orientamos en la mejor alternativa según estilo, uso y presupuesto.",
    },
    {
      title: "Recibes tu cotización",
      description: "Te enviamos una propuesta clara por WhatsApp con tiempos estimados y detalles del pedido.",
    },
  ],
  bottomHighlights: [
    {
      title: "Envíos a todo Chile",
      description: "Despachamos peldaños a medida a todo Chile según comuna o región al momento de cotizar.",
    },
    {
      title: "Empresas y particulares",
      description:
        "Atendemos proyectos de clientes particulares, constructoras, arquitectos y diseñadores que requieren fabricación a medida.",
    },
  ],
  faqItems: [
    {
      question: "¿Hacen peldaños a medida según mis dimensiones?",
      answer:
        "Sí. Fabricamos cada peldaño en base a las medidas de tu proyecto para lograr un ajuste preciso y una terminación prolija.",
    },
    {
      question: "¿Qué diferencia hay entre huella y contrahuella?",
      answer:
        "La huella es la superficie horizontal del peldaño donde pisas (la profundidad de la pisada). La contrahuella es la pieza vertical que cierra el frente del escalón. Fabricamos huellas de madera a medida; las contrahuellas se cotizan aparte si las necesitas.",
    },
    {
      question: "¿Qué medidas necesito para cotizar peldaños de madera para escalera?",
      answer:
        "Para cotizar bien necesitamos: largo del peldaño (ancho de la escalera), ancho o fondo de la huella (profundidad de pisada, típicamente 25-30 cm), espesor de la madera (comúnmente 2-4 cm), cantidad de peldaños, tipo de escalera (recta, con descanso, caracol) y comuna de despacho. Una foto de la escalera actual o plano con medidas ayuda mucho.",
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
      answer: "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones de despacho según comuna o región.",
    },
    {
      question: "¿Atienden proyectos para empresas y particulares?",
      answer:
        "Sí. Trabajamos tanto con clientes particulares como con empresas, constructoras, arquitectos y diseñadores.",
    },
    {
      question: "¿Instalan la escalera completa?",
      answer:
        "No. Esta página es de peldaños (huellas) a medida. La estructura, barandas, contrahuellas y el montaje en obra no se asumen incluidos; se confirman solo si los pides al cotizar.",
    },
    {
      question: "¿Qué diferencia hay entre huella y contrahuella?",
      answer:
        "La huella es la parte horizontal donde apoyas el pie al subir; la contrahuella es la parte vertical entre un peldaño y el siguiente. Esta página es de huellas de madera a medida; las contrahuellas no se asumen incluidas: si las necesitas, indícalo al cotizar.",
    },
    {
      question: "¿Qué medidas necesito para cotizar peldaños de madera para escalera?",
      answer:
        "Necesitas el largo de la huella, el ancho (profundidad de pisada), el espesor, la cantidad de peldaños y el tipo de escalera (por ejemplo recta o con descanso). Si tienes fotos o plano de la escalera, ayuda para confirmar la propuesta.",
    },
  ],
  extraSections: [
    {
      title: "Peldaños y huellas de madera para escalera a medida",
      paragraphs: [
        "Cuando cotizas peldaños de madera para escalera, es importante entender la diferencia: el peldaño es toda la pieza donde pisas, mientras que la huella es la superficie horizontal (la pisada) y la contrahuella es la pieza vertical que cierra el frente del escalón. En esta página fabricamos huellas de madera a medida; las contrahuellas no se asumen incluidas: si las necesitas, indícalo al cotizar.",
        "Para cotizar bien tus peldaños o huellas de madera para escalera, envía por WhatsApp: largo de cada peldaño (el ancho de la escalera), ancho o fondo de la huella (la profundidad de la pisada), espesor de la madera, cantidad de peldaños, tipo de escalera (por ejemplo recta o con descanso), y la comuna de despacho. Si tienes una foto de la escalera actual o un plano con medidas, mejor aún.",
      ],
      bullets: [
        "Largo del peldaño (ancho de la escalera)",
        "Ancho/fondo de la huella (profundidad de pisada)",
        "Espesor de la madera",
        "Cantidad de peldaños",
        "Tipo de escalera y comuna",
      ],
    },
    {
      title: "Huellas de escalera, no la obra completa",
      paragraphs: [
        "Si buscas peldaños de madera a medida, fabricamos las huellas según largo, ancho y espesor. No es una escalera armada ni un servicio de instalación por defecto.",
        "Para cotizar bien, envía cantidad, largo, ancho, espesor, comuna y una foto o plano de la escalera.",
      ],
      bullets: [
        "Cantidad de peldaños",
        "Largo, ancho y espesor (cm)",
        "Comuna de despacho",
        "Foto o plano de la escalera",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/guias/cotizar-muebles-a-medida",
      title: "Cómo cotizar a medida",
      description: "Guía para cotizar proyectos personalizados por WhatsApp.",
    },
    {
      href: "/cubiertas-a-medida",
      title: "Cubiertas a medida",
      description: "Mesones y tablones según largo y ancho.",
    },
    {
      href: "/puertas-a-medida",
      title: "Puertas a medida",
      description: "Hojas de madera según vano.",
    },
    {
      href: "/molduras-a-medida",
      title: "Molduras a medida",
      description: "Perfiles para muros, techos y vanos.",
    },
  ],
  ctaTitle: "Cotiza hoy tus peldaños a medida",
  ctaParagraph:
    "Escribe por WhatsApp y cuéntanos tu proyecto. Mientras más detalles compartas, más precisa será la cotización.",
  ctaBullets: sharedCtaBullets,
  schemaType: "Service",
  serviceName: "Peldaños a medida en madera",
  serviceType: "Fabricación de peldaños a medida",
};

export const cubiertasLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/cubiertas-a-medida",
  pageTitle: "Mesones para Quincho y Cubiertas de Madera a Medida",
  pageDescription:
    "Mesones para quincho, barras y cubiertas de madera a medida. Lenga austral, pino premium. Cotiza tu mesón de quincho por WhatsApp con envío a todo Chile.",
  keywords: [
    "mesones para quinchos",
    "mesones para quincho",
    "meson de madera para quincho",
    "cubiertas para mesones de quinchos",
    "cubierta para quincho",
    "cubiertas de madera a medida",
    "mesones de madera",
    "mesones para restaurant",
    "meson de madera para cocina",
    "tablones de madera a medida",
    "cubiertas madera chile",
    "cubiertas madera chillan",
  ],
  eyebrow: "Cubiertas de madera a medida",
  h1: "Cubiertas y tablones de madera a tu medida",
  heroParagraph:
    "Fabricamos cubiertas y tablones a medida en Chillán: mesones de cocina, barras, mesones para quincho y proyectos comerciales. Lenga austral o pino premium, secos en cámara. Para cotizar necesitamos largo, ancho, uso y comuna. El acabado se confirma en la cotización; no prometemos resistencia al calor o a la intemperie sin ver el uso real.",
  badges: ["Taller en Chillán", "Lenga austral y pino premium", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar cubiertas por WhatsApp",
  whatsappProductTitle: "Cubiertas a medida",
  whatsappLines: [
    "Vengo desde la página de cubiertas a medida.",
    "Quiero cotizar cubiertas o tablones de madera.",
    "Puedo enviar medidas, uso (barra, mesón, quincho, etc.), comuna y foto de referencia.",
  ],
  heroHighlights: [
    { title: "Medidas personalizadas", description: "Cubiertas fabricadas según las dimensiones de tu proyecto." },
    { title: "Madera seca en cámara", description: "Lenga austral y pino premium seleccionado." },
    { title: "Proyectos comerciales y hogar", description: "Barras, mesones, quinchos y salones de eventos." },
  ],
  sectionTitle: "Mesones para quincho y cubiertas para cada uso",
  sectionParagraph:
    "Fabricamos mesones de madera para quincho, barras, cubiertas de cocina y proyectos comerciales. Nos ajustamos a tus medidas y hacemos que cada detalle funcione. Si buscas un mesón para quincho, lo fabricamos como cubierta a medida: tablero de madera según el largo y el ancho de tu espacio. También producimos cubiertas para barras, mesones para restaurant, mesones de cocina y salones de eventos. Cada proyecto cuenta con un trato personalizado para elegir la mejor opción de madera y terminación.",
  featureCards: [
    {
      title: "Mesones para quinchos",
      description: "Mesones de madera a medida para el quincho. Cotiza largo, ancho, si va bajo techo o al aire, y comuna; el acabado depende del uso.",
    },
    {
      title: "Barras y mesones de cocina",
      description: "Cubiertas resistentes para cocinas, barras y mesones de trabajo con terminación prolija y madera seca en cámara.",
    },
    {
      title: "Proyectos comerciales",
      description: "Mesones para restaurantes, salones de eventos y espacios con alto tránsito. Fabricación según especificaciones técnicas.",
    },
  ],
  stepsTitle: "Cómo cotizar tus cubiertas a medida",
  steps: [
    {
      title: "Cuéntanos el uso",
      description: "Indica si es barra, mesón, quincho u otro uso, junto con las medidas aproximadas.",
    },
    {
      title: "Elegimos madera y terminación",
      description: "Te orientamos entre lenga austral, pino premium y acabados según tu proyecto.",
    },
    {
      title: "Recibes cotización y plazos",
      description: "Te respondemos por WhatsApp con precio referencial, tiempos de fabricación y despacho.",
    },
  ],
  bottomHighlights: [
    {
      title: "Durabilidad y calidad",
      description: "Cubiertas construidas para durar, con madera seca en cámara y mano de obra especializada.",
    },
    {
      title: "Maquinaria especializada",
      description: "Contamos con equipamiento para cumplir especificaciones técnicas de cada proyecto.",
    },
  ],
  faqItems: [
    {
      question: "¿Hacen mesones de madera para quinchos?",
      answer:
        "Sí, fabricamos mesones de madera para quinchos como cubiertas a medida. Indícanos el largo y ancho del mesón, si va bajo techo o al aire libre, la comuna y una foto del espacio. El tipo de madera y el acabado se confirman en la cotización según el uso.",
    },
    {
      question: "¿Qué madera recomiendan para mesones de quincho?",
      answer:
        "Para mesones de quincho bajo techo, lenga austral y pino premium funcionan bien con barniz o aceite. Para mesones al aire libre, la madera debe tener sellado adecuado y mantenerse regularmente. Te orientamos en la cotización según si queda bajo techo, semitecho o completamente expuesto.",
    },
    {
      question: "¿Los mesones de quincho necesitan sellado especial?",
      answer:
        "Sí. Un mesón de quincho bajo techo lleva barniz o aceite estándar. Un mesón expuesto al aire libre necesita sellado para exterior y mantenimiento periódico (cada 6-12 meses según exposición). Confirmamos el acabado recomendado al cotizar según tu caso.",
    },
    {
      question: "¿Qué medidas de mesón recomiendan para un quincho?",
      answer:
        "Las medidas dependen del espacio disponible y el uso. Como referencia general: mesón de 200-250 cm de largo × 60-70 cm de ancho para quincho familiar, 300 cm o más para quincho de eventos. El espesor típico es 3-4 cm. Envíanos las medidas de tu quincho y te orientamos.",
    },
    {
      question: "¿Qué tipos de cubiertas fabrican?",
      answer:
        "Fabricamos mesones para quinchos, cubiertas y tablones para barras, mesones de cocina, mesones para restaurant, salones de eventos y proyectos personalizados.",
    },
    {
      question: "¿Qué maderas utilizan?",
      answer:
        "Trabajamos madera nativa lenga austral y pino premium, seleccionada y seca en cámara para mayor durabilidad.",
    },
    {
      question: "¿Hacen cubiertas a medida para proyectos comerciales?",
      answer:
        "Sí. Atendemos restaurantes, locales comerciales, constructoras y particulares con fabricación según especificaciones del proyecto.",
    },
    {
      question: "¿Cómo cotizo un mesón de madera para quincho?",
      answer:
        "Escríbenos por WhatsApp con largo, ancho, si el mesón va bajo techo o al aire libre, comuna y una foto del espacio o del mesón actual. Te respondemos con opciones de madera, acabado y precio.",
    },
    {
      question: "¿Envían cubiertas a todo Chile?",
      answer: "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones y tiempos según tu ubicación.",
    },
  ],
  extraSections: [
    {
      title: "Mesones de madera para quinchos",
      paragraphs: [
        "Si buscas un mesón de madera para quincho, lo fabricamos como cubierta a medida: tablero de madera según el largo y el ancho de tu espacio. Un mesón de quincho bien hecho resiste el uso diario y le da carácter al espacio. No es un quincho armado ni incluye estructura, parrilla o instalación.",
        "Para cotizar bien tu mesón para quincho, indica si queda bajo techo o al aire libre, el largo y el ancho (y el espesor si ya lo tienes), la comuna y una foto del vano o del mesón actual. El tipo de madera y el acabado se confirman en la respuesta según el uso; no afirmamos resistencia al calor o a la lluvia sin ver el contexto.",
      ],
      bullets: [
        "Largo y ancho del mesón (cm)",
        "Uso: quincho bajo techo o al aire libre",
        "Comuna de despacho",
        "Foto del espacio o del mesón actual",
      ],
    },
    {
      title: "Mesones de cocina y barras",
      paragraphs: [
        "También fabricamos mesones de madera para cocina y cubiertas para barras. La madera seca en cámara aporta estabilidad y durabilidad. El acabado se adapta al uso: barniz para cocinas de uso moderado, aceite natural para proyectos de estilo artesanal.",
        "Para cotizar un mesón de cocina, envía las medidas del vano, el uso (cocina, barra, isla), si hay exposición a calor o humedad directa, y la comuna. Te orientamos con las mejores opciones de madera y terminación.",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/guias/cotizar-muebles-a-medida",
      title: "Cómo cotizar a medida",
      description: "Guía para cotizar proyectos personalizados por WhatsApp.",
    },
    {
      href: "/kit-pergola",
      title: "Kit pérgola",
      description: "Uniones metálicas para pérgola. No incluye maderas.",
    },
    {
      href: "/peldanos-a-medida",
      title: "Peldaños a medida",
      description: "Huellas de escalera según largo, ancho y espesor.",
    },
    {
      href: "/puertas-a-medida",
      title: "Puertas a medida",
      description: "Hojas de madera según vano. Cotiza con medidas y foto.",
    },
    {
      href: "/muebles-chillan",
      title: "Taller en Chillán",
      description: "Fabricación propia y atención directa desde Ñuble.",
    },
  ],
  ctaTitle: "Cotiza hoy tus cubiertas de madera",
  ctaParagraph:
    "Cuéntanos tu proyecto por WhatsApp. Te ayudamos a definir medidas, madera y terminación para una cotización clara.",
  ctaBullets: sharedCtaBullets,
  schemaType: "Service",
  serviceName: "Cubiertas de madera a medida",
  serviceType: "Fabricación de cubiertas y tablones de madera",
};

export const moldurasLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/molduras-a-medida",
  pageTitle: "Molduras de Madera a Medida | Chile",
  pageDescription:
    "Molduras de madera a medida en Chillán para muros, techos y vanos. Perfiles personalizados con envío a todo Chile. Cotiza por WhatsApp.",
  keywords: [
    "molduras de madera a medida",
    "molduras madera chile",
    "molduras a medida chillan",
    "molduras para muro",
    "molduras para techo",
    "perfiles de madera a medida",
    "cotizar molduras madera",
  ],
  eyebrow: "Molduras de madera a medida",
  h1: "Molduras de madera a medida para tu proyecto",
  heroParagraph:
    "Fabricamos molduras y perfiles de madera a medida desde Chillán para muros, techos, vanos y terminaciones interiores. Para cotizar bien necesitamos el perfil (foto de frente o de la sección), el largo y la cantidad. No hay un catálogo de perfiles publicado en esta página: partimos de tu referencia.",
  badges: ["Taller en Chillán", "Perfiles a medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar molduras por WhatsApp",
  whatsappProductTitle: "Molduras a medida",
  whatsappLines: [
    "Vengo desde la página de molduras a medida.",
    "Quiero cotizar molduras de madera para mi proyecto.",
    "Puedo enviar largo, perfil/referencia, cantidad, comuna y foto o croquis.",
  ],
  heroHighlights: [
    {
      title: "Medidas y perfiles exactos",
      description: "Fabricamos según largo, sección y diseño que necesites.",
    },
    {
      title: "Terminación prolija",
      description: "Acabados listos para pintar, barnizar o instalar según el proyecto.",
    },
    {
      title: "Hogar y obra",
      description: "Atendemos particulares, arquitectos, constructoras y diseñadores.",
    },
  ],
  sectionTitle: "Molduras de madera para cada terminación",
  sectionParagraph:
    "Las molduras definen el detalle de un espacio: cornisas, guardapolvos, marcos, zócalos y perfiles decorativos. En Idea Madera fabricamos molduras de madera a medida para que el acabado coincida con tu arquitectura, no al revés. También resolvemos pedidos por metro lineal o por tramos cortados a largo.",
  featureCards: [
    {
      title: "Muros y zócalos",
      description: "Guardapolvos, zócalos y molduras de muro para remates limpios y duraderos.",
    },
    {
      title: "Techos y cornisas",
      description: "Perfiles para encuentro muro-cielo, cornisas y detalles de altura.",
    },
    {
      title: "Marcos y vanos",
      description: "Molduras para puertas, ventanas y terminaciones de vanos a medida.",
    },
  ],
  stepsTitle: "Cómo cotizar tus molduras a medida",
  steps: [
    {
      title: "Envía medidas y referencia",
      description: "Comparte largo, sección o perfil, cantidad y una foto o croquis del detalle.",
    },
    {
      title: "Definimos madera y acabado",
      description: "Te orientamos en madera y terminación según uso interior y estilo del proyecto.",
    },
    {
      title: "Recibes cotización y plazos",
      description: "Te respondemos por WhatsApp con precio referencial, fabricación y opciones de despacho.",
    },
  ],
  bottomHighlights: [
    {
      title: "Fabricación en Chillán",
      description: "Producción propia con control de calidad en cada perfil y tramo.",
    },
    {
      title: "Envíos a todo Chile",
      description: "Coordinamos despacho según comuna o región al momento de cotizar.",
    },
  ],
  faqItems: [
    {
      question: "¿Fabrican molduras de madera a medida?",
      answer:
        "Sí. Fabricamos molduras y perfiles según las medidas, sección y diseño de tu proyecto, desde Chillán con envío a todo Chile.",
    },
    {
      question: "¿Qué tipo de molduras hacen?",
      answer:
        "Trabajamos molduras para muros, zócalos, techos, cornisas, marcos de vanos y perfiles decorativos personalizados según referencia o croquis.",
    },
    {
      question: "¿Qué información necesitan para cotizar?",
      answer:
        "Idealmente largo, sección o perfil, cantidad, comuna y una foto o croquis. Si no tienes el perfil exacto, te ayudamos a definir una opción.",
    },
    {
      question: "¿Hacen molduras para obras y particulares?",
      answer:
        "Sí. Atendemos particulares, arquitectos, diseñadores y constructoras con pedidos unitarios o por metro lineal.",
    },
    {
      question: "¿Envían molduras a todo Chile?",
      answer:
        "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones y tiempos según tu ubicación.",
    },
    {
      question: "¿Tienen un catálogo de perfiles?",
      answer:
        "No publicamos un catálogo fijo. Envía una foto del perfil o de la sección (idealmente con una regla) y el largo. Si no tienes el corte exacto, te ayudamos a definir una opción según el uso.",
    },
  ],
  extraSections: [
    {
      title: "Perfil, largo y terminación",
      paragraphs: [
        "Cotizamos por tramo o por metro lineal. Lo que más acelera la respuesta es el perfil: una foto de frente y, si puedes, de la sección (el corte) con una regla o una medida escrita.",
        "Indica si va en muro, techo o vano, y si la quieres cruda, lista para pintar o con barniz. La instalación no se asume incluida.",
      ],
      bullets: [
        "Foto del perfil o de la sección con escala",
        "Largo (cm o metros) y cantidad",
        "Uso: muro, techo, marco o vano",
        "Comuna de despacho",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/guias/cotizar-muebles-a-medida",
      title: "Cómo cotizar a medida",
      description: "Guía para cotizar proyectos personalizados por WhatsApp.",
    },
    {
      href: "/kit-pergola",
      title: "Kit pérgola",
      description: "Uniones metálicas para pérgola modular 3×3 pulgadas.",
    },
    {
      href: "/peldanos-a-medida",
      title: "Peldaños a medida",
      description: "Huellas de escalera según largo, ancho y espesor.",
    },
    {
      href: "/puertas-a-medida",
      title: "Puertas a medida",
      description: "Hojas de madera según vano. Cotiza con medidas y foto.",
    },
    {
      href: "/cubiertas-a-medida",
      title: "Cubiertas a medida",
      description: "Mesones y tablones para quincho, barra o cocina.",
    },
  ],
  ctaTitle: "Cotiza hoy tus molduras de madera",
  ctaParagraph:
    "Escríbenos por WhatsApp con medidas y una referencia visual. Mientras más detalle compartas, más precisa será la cotización.",
  ctaBullets: sharedCtaBullets,
  schemaType: "Service",
  serviceName: "Molduras de madera a medida",
  serviceType: "Fabricación de molduras y perfiles de madera",
};

export const puertasLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-a-medida",
  pageTitle: "Fábrica de Puertas de Madera a Medida | Chillán",
  pageDescription:
    "Fábrica de puertas de madera a medida en Chillán. Diseño personalizado, madera nativa seca. Cotiza por WhatsApp con envío a todo Chile.",
  keywords: [
    "puertas de madera a medida",
    "fabrica de puertas de madera a medida",
    "fábrica de puertas a medida",
    "puertas a medida",
    "puertas chillan",
    "puertas de madera chillan",
    "puertas personalizadas madera",
    "puertas madera chile",
    "puertas a medida chillan",
    "cotizar puertas madera",
  ],
  eyebrow: "Puertas de madera a medida",
  h1: "Fábrica de puertas de madera a medida en Chillán",
  heroParagraph:
    "Fabricamos puertas de madera a medida desde nuestro taller en Chillán, para hogar o negocio. Producción propia con diseño personalizado y madera nativa seca en cámara. El uso interior o exterior cambia madera y acabado: dínoslo al cotizar. Marco, herrajes e instalación no se asumen incluidos. Para cotizar: alto, ancho, espesor del vano, comuna y una foto.",
  badges: ["Taller en Chillán", "Diseño personalizado", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar puertas por WhatsApp",
  whatsappProductTitle: "Puertas a medida",
  whatsappLines: [
    "Vengo desde la página de puertas a medida.",
    "Quiero cotizar puertas de madera personalizadas.",
    "Puedo enviar alto, ancho, espesor del vano, si es interior o exterior, comuna y foto del vano.",
  ],
  heroHighlights: [
    { title: "Especificaciones exactas", description: "Cada puerta se fabrica según las medidas y diseño de tu proyecto." },
    { title: "Madera nativa seca en cámara", description: "Materiales seleccionados para durabilidad y estabilidad." },
    { title: "Taller en Chillán", description: "Fabricación propia y atención directa desde Ñuble, con envío a todo Chile." },
  ],
  sectionTitle: "Puertas de madera a medida hechas para durar",
  sectionParagraph:
    "Nuestra fábrica de puertas de madera en Chillán produce cada pieza con cuidado y atención al detalle. Fabricamos puertas de madera a medida para interiores, exteriores o proyectos comerciales. Te guiamos por WhatsApp para elegir la opción que más se acomode a tus necesidades. Cada puerta es realizada por manos expertas con herramientas especializadas en nuestro taller.",
  featureCards: [
    {
      title: "Interior o exterior",
      description: "El uso cambia madera y acabado. Indícalo al cotizar; no prometemos intemperie sin ver el vano.",
    },
    {
      title: "Hoja a medida",
      description: "Fabricamos la hoja según alto, ancho y espesor. Marco y herrajes se confirman aparte.",
    },
    {
      title: "Asesoría directa",
      description: "Te orientamos por WhatsApp con medidas, foto del vano y comuna de despacho.",
    },
  ],
  stepsTitle: "Cómo cotizar tus puertas a medida",
  steps: [
    {
      title: "Comparte medidas y referencia",
      description: "Envíanos alto, ancho, espesor, tipo de puerta y fotos o bocetos de referencia.",
    },
    {
      title: "Definimos diseño y madera",
      description: "Revisamos contigo estilo, madera y terminación según uso interior o exterior.",
    },
    {
      title: "Recibes cotización y plazos",
      description: "Te respondemos por WhatsApp con propuesta, tiempos de fabricación y opciones de despacho.",
    },
  ],
  bottomHighlights: [
    {
      title: "Maquinaria especializada",
      description: "Equipamiento para cumplir requerimientos técnicos y especificaciones de cada cliente.",
    },
    {
      title: "Fabricación chilena",
      description: "Más de 30 años de experiencia en madera con equipo artesanal en Chile.",
    },
  ],
  faqItems: [
    {
      question: "¿Las puertas se fabrican a medida?",
      answer:
        "Sí. Cada puerta se fabrica según tus especificaciones exactas de medidas, diseño y terminación.",
    },
    {
      question: "¿Dónde fabrican las puertas de madera?",
      answer:
        "Fabricamos en nuestro taller en Chillán con maquinaria especializada y madera nativa seca en cámara. Somos una fábrica de puertas de madera a medida con más de 30 años de experiencia.",
    },
    {
      question: "¿Qué datos necesito para cotizar una puerta a medida?",
      answer:
        "Para cotizar necesitas enviar por WhatsApp: alto y ancho del vano (en cm), espesor que necesitas, si es puerta de interior o exterior, comuna de despacho, y fotos del vano actual o referencia visual del diseño que buscas. Con esa información te enviamos propuesta de madera, terminación, precio y plazo.",
    },
    {
      question: "¿Qué tipos de puerta fabrican a medida?",
      answer:
        "Fabricamos puertas de hogar (dormitorios, baños, cocinas, entrada principal) y puertas para negocios (locales comerciales, oficinas, bodegas). El diseño puede ser liso, con paneles, con vidrio o según tu referencia. Cada proyecto se cotiza según las especificaciones reales del cliente.",
    },
    {
      question: "¿Qué maderas usan para puertas?",
      answer:
        "Trabajamos maderas nobles del sur de Chile, seleccionadas y secas en cámara para mayor durabilidad y estabilidad.",
    },
    {
      question: "¿Hacen puertas para negocios?",
      answer:
        "Sí. Fabricamos puertas para hogares y negocios, adaptándonos a las necesidades de cada proyecto.",
    },
    {
      question: "¿Cómo cotizo una puerta de madera en Chillán?",
      answer:
        "Escríbenos por WhatsApp con alto, ancho, espesor del vano, uso (interior/exterior), comuna y fotos. Te orientamos con precio, madera y plazos desde nuestra fábrica en Chillán.",
    },
    {
      question: "¿Realizan envíos a todo Chile?",
      answer: "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones según comuna o región.",
    },
    {
      question: "¿Incluyen marco, herrajes e instalación?",
      answer:
        "No se asumen incluidos. La cotización parte por la hoja a medida. Marco, herrajes e instalación se confirman en la respuesta si los necesitas.",
    },
    {
      question: "¿Hacen puertas de interior y de exterior?",
      answer:
        "Sí, fabricamos según el uso. Interior o exterior cambia madera y acabado: indícalo al cotizar, junto con una foto del vano. No prometemos resistencia a la intemperie sin ver el caso.",
    },
  ],
  extraSections: [
    {
      title: "Qué fabricamos y qué cotizar",
      paragraphs: [
        "Fabricamos la hoja de la puerta a medida. No hay un catálogo de modelos fijos en esta página: partimos de tus medidas y una referencia visual.",
        "El uso interior o exterior, el vano y la comuna definen la propuesta. Marco, herrajes e instalación no vienen por defecto.",
      ],
      bullets: [
        "Alto, ancho y espesor del vano o de la hoja (cm)",
        "Uso: interior o exterior",
        "Comuna de despacho",
        "Foto del vano o de la puerta actual",
      ],
    },
    {
      title: "Fábrica de puertas de madera a medida en Chillán",
      paragraphs: [
        "Nuestra fábrica de puertas de madera está en Chillán, región de Ñuble. Fabricamos piezas a medida con maquinaria especializada y madera nativa seca en cámara. Cada puerta se fabrica según las medidas exactas del vano y el diseño que definas con nosotros.",
        "Para cotizar por WhatsApp necesitamos: alto, ancho y espesor del vano; si es puerta de interior o exterior; comuna de despacho; y fotos del vano actual o referencia visual del diseño que buscas. Con esa información te enviamos propuesta de madera, terminación, precio y plazo de fabricación.",
        "Fabricamos puertas de hogar (dormitorios, baños, cocinas, entrada principal) y puertas para negocios (locales comerciales, oficinas, bodegas). Cada proyecto se cotiza según especificaciones reales del cliente.",
      ],
    },
  ],
  relatedLinks: [
    {
      href: "/guias/cotizar-muebles-a-medida",
      title: "Cómo cotizar a medida",
      description: "Guía para cotizar proyectos personalizados por WhatsApp.",
    },
    {
      href: "/molduras-a-medida",
      title: "Molduras a medida",
      description: "Perfiles para muros, techos y vanos.",
    },
    {
      href: "/cubiertas-a-medida",
      title: "Cubiertas a medida",
      description: "Mesones y tablones según largo y ancho.",
    },
    {
      href: "/muebles-chillan",
      title: "Taller en Chillán",
      description: "Fabricación propia y atención directa desde Ñuble.",
    },
  ],
  ctaTitle: "Cotiza hoy tus puertas de madera",
  ctaParagraph:
    "Escríbenos por WhatsApp con alto, ancho, foto del vano y comuna. Te respondemos con lo que sí está incluido.",
  ctaBullets: sharedCtaBullets,
  schemaType: "Service",
  serviceName: "Puertas de madera a medida",
  serviceType: "Fabricación de puertas personalizadas",
  stats: [
    { value: "Desde 2001", label: "Taller familiar" },
    { value: "Chillán", label: "Fabricación propia" },
    { value: "Todo Chile", label: "Cobertura de envío" },
  ],
};

export const quienesSomosLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/quienes-somos",
  pageTitle: "¿Quiénes Somos? | Muebles de Madera en Chile",
  pageDescription:
    "Idea Madera: empresa familiar de Chillán desde 2001. Fabricamos muebles de madera con calidad artesanal y envíos a todo Chile.",
  keywords: [
    "idea madera",
    "muebles madera chillan",
    "muebles de madera en chillán",
    "fabrica muebles madera chile",
    "muebles artesanales chile",
    "empresa familiar muebles",
  ],
  eyebrow: "Taller en Chillán",
  h1: "Muebles de madera fabricados en Chillán",
  heroParagraph:
    "Somos una empresa familiar de Chillán que desde 2001 crea muebles de madera con diseño cuidadoso, construcción de calidad y venta directa. Involucrados en todo el proceso —desde el desarrollo del producto hasta la experiencia del cliente— eliminamos intermediarios para ofrecer piezas duraderas a precios accesibles, con envío a todo Chile.",
  badges: ["Taller en Chillán", "Desde 2001", "Envíos a todo Chile"],
  whatsappButtonLabel: "Hablar con Idea Madera",
  whatsappProductTitle: "Quiénes somos",
  whatsappLines: [
    "Vengo desde la página quiénes somos.",
    "Me gustaría conocer más sobre sus productos y cotizar.",
  ],
  heroHighlights: [
    { title: "Empresa familiar", description: "Pasión por el diseño y la madera en cada pieza." },
    { title: "+3.000 clientes", description: "Clientes satisfechos de Arica a Punta Arenas." },
    { title: "Fabricación propia", description: "Controlamos calidad desde el diseño hasta el despacho." },
  ],
  sectionTitle: "Más que lucir bien: muebles esenciales para tu hogar",
  sectionParagraph:
    "Creemos que en tu hogar puedes tenerlo todo: diseño cuidadoso, construcción de calidad y precios accesibles. Frente a la rápida imitación, nos enfocamos en necesidades duraderas. Cada pieza original está diseñada para perdurar y acompañarte por mucho tiempo, elaborada por artesanos con madera premium.",
  featureCards: [
    {
      title: "Diseño colaborativo",
      description:
        "Nuestro proceso es una colaboración completa: desde lápiz y papel, materiales y máquinas, hasta el empaque.",
    },
    {
      title: "Madera premium",
      description:
        "Pino seleccionado sin nudos y lenga austral seca en cámara, proveniente de proveedores con ética forestal.",
    },
    {
      title: "Venta directa",
      description:
        "Eliminamos intermediarios y vendemos directo, ahorrándote hasta un 50% sin comprometer calidad.",
    },
  ],
  stepsTitle: "Cómo trabajamos contigo",
  steps: [
    {
      title: "Cotizas por WhatsApp",
      description: "Cuéntanos qué necesitas: producto del catálogo, medidas especiales o un proyecto a medida.",
    },
    {
      title: "Fabricamos en Chile",
      description: "Producimos en nuestra fábrica con maquinaria especializada y terminación artesanal.",
    },
    {
      title: "Coordinamos el despacho",
      description: "Enviamos a todo Chile con tiempos y opciones claras según tu comuna o región.",
    },
  ],
  bottomHighlights: [
    {
      title: "Complementa cada rincón",
      description: "Mesas, sillas, bancas, cubiertas, puertas y piezas a medida para interior y exterior.",
    },
    {
      title: "Atención personalizada",
      description: "Asesoría directa para elegir medidas, terminaciones y productos según tu espacio.",
    },
  ],
  faqItems: [
    {
      question: "¿Desde cuándo existe Idea Madera?",
      answer: "Idea Madera opera desde 2001 fabricando muebles de madera con diseño y calidad artesanal en Chile.",
    },
    {
      question: "¿Dónde fabrican los muebles?",
      answer:
        "Fabricamos en Chile con equipo propio y maquinaria especializada, controlando calidad en cada etapa del proceso.",
    },
    {
      question: "¿Venden solo productos de catálogo?",
      answer:
        "No. Además del catálogo, fabricamos piezas a medida como cubiertas, puertas, peldaños, molduras y proyectos personalizados.",
    },
    {
      question: "¿Hacen envíos a todo Chile?",
      answer: "Sí, realizamos envíos a domicilio en la mayoría de las ciudades del país.",
    },
    {
      question: "¿Cómo puedo cotizar?",
      answer:
        "Escríbenos por WhatsApp al +56 9 9549 7838 o revisa nuestro catálogo online para cotizar productos específicos.",
    },
  ],
  ctaTitle: "Conoce nuestro catálogo y cotiza hoy",
  ctaParagraph:
    "Explora mesas, sillas, bancas y piezas a medida. Estamos listos para orientarte por WhatsApp.",
  ctaBullets: [
    "Catálogo completo online.",
    "Piezas a medida disponibles.",
    "Envíos a todo Chile.",
  ],
  schemaType: "AboutPage",
  stats: [
    { value: "2001", label: "Año de fundación" },
    { value: "3.000+", label: "Clientes satisfechos" },
    { value: "31", label: "Años de experiencia" },
  ],
};

export const contactoLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/contacto",
  pageTitle: "Contacto | Cotiza por WhatsApp",
  pageDescription:
    "Contáctanos para cotizar muebles de madera o piezas a medida. WhatsApp +56 9 9549 7838, hola@ideamadera.cl. Envíos a todo Chile.",
  keywords: [
    "contacto idea madera",
    "cotizar muebles madera",
    "whatsapp idea madera",
    "muebles madera chile contacto",
  ],
  eyebrow: "Contacto",
  h1: "Hablemos de tu proyecto",
  heroParagraph:
    "¿Necesitas un proyecto específico o medidas personalizadas? Escríbenos por WhatsApp, llámanos o envíanos un correo. Todos los mensajes son atendidos directamente por nuestro equipo para darte una respuesta clara y rápida.",
  badges: ["Respuesta por WhatsApp", "Envíos a todo Chile"],
  whatsappButtonLabel: "Escribir por WhatsApp",
  whatsappProductTitle: "Contacto",
  whatsappLines: [
    "Vengo desde la página de contacto.",
    "Quiero hacer una consulta o cotizar un proyecto.",
  ],
  heroHighlights: [
    { title: "WhatsApp directo", description: "+56 9 9549 7838 — la forma más rápida de cotizar." },
    { title: "Correo", description: "hola@ideamadera.cl para consultas y seguimiento." },
    { title: "Atención personalizada", description: "Te orientamos en productos, medidas y despacho." },
  ],
  sectionTitle: "Estamos para ayudarte",
  sectionParagraph:
    "Ya sea que busques un producto del catálogo, cubiertas a medida, puertas, peldaños o un mueble personalizado, contáctanos con tus medidas, comuna y referencias. Coordinamos fabricación y envío a todo Chile.",
  featureCards: [
    {
      title: "Cotizar productos del catálogo",
      description: "Revisa mesas, sillas, bancas y más en el catálogo online y escríbenos por WhatsApp.",
    },
    {
      title: "Proyectos a medida",
      description: "Cubiertas, puertas, peldaños y piezas personalizadas según tus especificaciones.",
    },
    {
      title: "Consultas de envío",
      description: "Te indicamos tiempos, opciones y costos de despacho según tu comuna o región.",
    },
  ],
  stepsTitle: "Formas de contacto",
  steps: [
    {
      title: "WhatsApp",
      description: "Escríbenos al +56 9 9549 7838 con tu consulta, medidas y comuna. Es la vía más rápida.",
    },
    {
      title: "Correo electrónico",
      description: "Envíanos un mensaje a hola@ideamadera.cl con los detalles de tu proyecto.",
    },
    {
      title: "Redes sociales",
      description: "Síguenos en Instagram @ideamadera.cl para ver nuestros trabajos y novedades.",
    },
  ],
  faqItems: [
    {
      question: "¿Cuál es el teléfono de contacto?",
      answer: "Puedes escribirnos o llamarnos al +56 9 9549 7838 por WhatsApp.",
    },
    {
      question: "¿Cuál es el correo de contacto?",
      answer: "Nuestro correo es hola@ideamadera.cl.",
    },
    {
      question: "¿Dónde están ubicados?",
      answer: "Operamos desde Chile con envíos a todo el país. Escríbenos para coordinar visita o retiro según disponibilidad.",
    },
    {
      question: "¿Cuánto demora la respuesta?",
      answer: "Por WhatsApp respondemos lo antes posible en horario hábil. Para proyectos a medida, pedimos medidas y referencias para cotizar con precisión.",
    },
  ],
  ctaTitle: "Escríbenos hoy por WhatsApp",
  ctaParagraph: "Cuéntanos qué necesitas y te orientamos con productos, medidas, plazos y despacho.",
  ctaBullets: [
    "Atención directa por WhatsApp.",
    "Cotización de catálogo y piezas a medida.",
    "Envíos a todo Chile.",
  ],
  schemaType: "ContactPage",
  contactDetails: {
    phone: "+56 9 9549 7838",
    email: "hola@ideamadera.cl",
    address: "Boyén Sector 01, Chillán, Chile",
    instagramHandle: "@ideamadera.cl",
  },
};

export const mueblesCocinaChillanLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/muebles-de-cocina-chillan",
  pageTitle: "Muebles de Cocina en Chillán a Medida | Idea Madera",
  pageDescription:
    "Cotiza muebles de cocina en Chillán: mesones, cubiertas, islas y terminaciones en madera a medida. Fabricación local y envío a todo Chile.",
  keywords: [
    "muebles de cocina chillan",
    "muebles de cocina en chillán",
    "cocina madera chillan",
    "mesones cocina madera",
    "cubiertas cocina chillan",
    "muebles cocina a medida chile",
  ],
  eyebrow: "Muebles de cocina · Chillán",
  h1: "Muebles de cocina en madera a medida en Chillán",
  heroParagraph:
    "Diseñamos y fabricamos muebles de cocina en madera desde nuestro taller en Chillán: mesones, cubiertas, islas y piezas a medida para cocinas nuevas o remodelaciones. Te orientamos por WhatsApp con medidas, madera y terminación, con despacho a todo Chile.",
  badges: ["Taller en Chillán", "Cocinas a medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar cocina por WhatsApp",
  whatsappProductTitle: "Muebles de cocina Chillán",
  whatsappLines: [
    "Vengo desde la página de muebles de cocina en Chillán.",
    "Quiero cotizar muebles o mesones de cocina en madera.",
    "Puedo enviar medidas, plano o foto, comuna y tipo de terminación.",
  ],
  heroHighlights: [
    {
      title: "Fabricación local",
      description: "Producción en Chillán con control de calidad en cada pieza.",
    },
    {
      title: "A medida de tu cocina",
      description: "Mesones, cubiertas e islas según tu espacio y estilo.",
    },
    {
      title: "Asesoría directa",
      description: "Cotización clara por WhatsApp para particulares y obras.",
    },
  ],
  sectionTitle: "Cocinas en madera con oficio chillanejo",
  sectionParagraph:
    "Si buscas muebles de cocina en Chillán con madera real y terminación prolija, trabajamos contigo desde la medida hasta el despacho. Combinamos catálogo y fabricación a pedido para mesones, cubiertas de barra, islas y complementos que resisten el uso diario.",
  featureCards: [
    {
      title: "Mesones y cubiertas",
      description: "Superficies de trabajo en madera seca en cámara, a medida de tu cocina o isla.",
    },
    {
      title: "Islas y barras",
      description: "Piezas centrales para cocinar, desayunar o recibir, con terminación artesanal.",
    },
    {
      title: "Remodelación y obra nueva",
      description: "Adaptamos medidas y acabados a proyectos de casa, departamento o local.",
    },
  ],
  stepsTitle: "Cómo cotizar tus muebles de cocina",
  steps: [
    {
      title: "Cuéntanos el espacio",
      description: "Envía medidas, fotos o plano de la cocina y qué piezas necesitas.",
    },
    {
      title: "Definimos madera y diseño",
      description: "Te proponemos opciones de madera, formato y terminación según uso.",
    },
    {
      title: "Recibes cotización",
      description: "Te enviamos propuesta por WhatsApp con plazos de fabricación y despacho.",
    },
  ],
  bottomHighlights: [
    {
      title: "Chillán y todo Chile",
      description: "Atención local en Chillán y envíos coordinados al resto del país.",
    },
    {
      title: "Madera para uso diario",
      description: "Selección y secado en cámara para mayor estabilidad en cocina.",
    },
  ],
  faqItems: [
    {
      question: "¿Hacen muebles de cocina en Chillán?",
      answer:
        "Sí. Fabricamos en Chillán muebles y piezas de cocina en madera a medida, con cotización por WhatsApp.",
    },
    {
      question: "¿Qué fabrican para cocinas?",
      answer:
        "Mesones, cubiertas, islas, barras y piezas personalizadas según las medidas y el estilo de tu cocina.",
    },
    {
      question: "¿Puedo pedir solo la cubierta o el mesón?",
      answer:
        "Sí. Puedes cotizar una pieza puntual o un conjunto. Indica medidas y uso para una propuesta precisa.",
    },
    {
      question: "¿Envían fuera de Chillán?",
      answer:
        "Sí. Además de atender Chillán, coordinamos envíos a todo Chile según comuna o región.",
    },
    {
      question: "¿Cómo cotizo?",
      answer:
        "Escríbenos por WhatsApp con medidas, fotos o plano, comuna y el tipo de mueble de cocina que necesitas.",
    },
  ],
  ctaTitle: "Cotiza tus muebles de cocina en Chillán",
  ctaParagraph:
    "Cuéntanos tu cocina por WhatsApp. Con medidas y una foto podemos orientarte más rápido.",
  ctaBullets: [
    "Taller en Chillán.",
    "Piezas a medida y catálogo.",
    "Envíos a todo Chile.",
  ],
  schemaType: "Service",
  serviceName: "Muebles de cocina en madera a medida en Chillán",
  serviceType: "Fabricación de muebles de cocina en madera",
};

export const mueblesChillanLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/muebles-chillan",
  pageTitle: "Mueblería en Chillán | Fábrica de Muebles de Madera",
  pageDescription:
    "Mueblería y fábrica de muebles en Chillán: mesas, sillas, bancas de madera maciza y piezas a medida. Cotiza por WhatsApp con envío a todo Chile.",
  keywords: [
    "muebles chillan",
    "muebles en chillán",
    "muebles de madera chillan",
    "muebles a medida chillan",
    "fabrica muebles chillan",
    "muebles madera chillán chile",
  ],
  eyebrow: "Mueblería y Fábrica en Chillán",
  h1: "Mueblería en Chillán: Fábrica de muebles de madera",
  heroParagraph:
    "Somos fábrica y mueblería en Chillán desde 2001: fabricación propia de muebles de madera maciza, venta directa y cotización por WhatsApp. Si estás en Ñuble puedes coordinar medidas y despacho local; si estás en otra región, el catálogo y el envío siguen siendo los mismos. No es una sucursal de vitrina: es taller y fábrica de muebles en Chillán.",
  badges: ["Fábrica en Chillán", "Desde 2001", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar muebles por WhatsApp",
  whatsappProductTitle: "Muebles Chillán",
  whatsappLines: [
    "Vengo desde la página de muebles Chillán.",
    "Quiero cotizar muebles de madera.",
    "Puedo indicar producto, medidas, comuna y fotos de referencia.",
  ],
  heroHighlights: [
    {
      title: "Hecho en Chillán",
      description: "Taller propio con fabricación artesanal y maquinaria especializada.",
    },
    {
      title: "Catálogo + a medida",
      description: "Elige del catálogo o pide medidas especiales según tu espacio.",
    },
    {
      title: "Atención directa",
      description: "Sin intermediarios: cotización clara por WhatsApp.",
    },
  ],
  sectionTitle: "Mueblería en Chillán para cada espacio del hogar",
  sectionParagraph:
    "Si buscas una mueblería en Chillán con madera maciza y terminación prolija, aquí encuentras mesas de comedor, sillas, bancas, muebles de living y proyectos a medida. Somos fábrica de muebles en Chillán: trabajamos para hogares de Ñuble y enviamos al resto de Chile con la misma calidad y atención.",
  featureCards: [
    {
      title: "Comedor",
      description: "Mesas y sillas de madera para 4, 6 u 8 personas, con opción a medida.",
    },
    {
      title: "Living y dormitorio",
      description: "Mesas de centro, bancas, veladores y piezas que suman calidez.",
    },
    {
      title: "Proyectos especiales",
      description: "Cubiertas, puertas, peldaños, molduras y muebles a pedido.",
    },
  ],
  stepsTitle: "Cómo comprar muebles en Chillán con Idea Madera",
  steps: [
    {
      title: "Revisa el catálogo o cuéntanos tu idea",
      description: "Explora productos online o escribe por WhatsApp con lo que necesitas.",
    },
    {
      title: "Confirmamos medidas y terminación",
      description: "Te ayudamos a elegir madera, tamaño y acabado según tu espacio.",
    },
    {
      title: "Fabricamos y despachamos",
      description: "Producción en Chillán y coordinación de envío a tu comuna.",
    },
  ],
  bottomHighlights: [
    {
      title: "Empresa familiar de Chillán",
      description: "Más de 20 años fabricando muebles de madera con venta directa.",
    },
    {
      title: "Envío nacional",
      description: "Atendemos Chillán y despachamos a todo Chile.",
    },
  ],
  faqItems: [
    {
      question: "¿Dónde fabrican los muebles?",
      answer:
        "Fabricamos en Chillán, Chile, con taller propio y control de calidad en cada pieza.",
    },
    {
      question: "¿Son mueblería o fábrica en Chillán?",
      answer:
        "Ambas. Somos fábrica de muebles de madera en Chillán con venta directa, sin intermediarios. No es una tienda de vitrina: es taller de fabricación.",
    },
    {
      question: "¿Puedo comprar muebles en Chillán sin ir al taller?",
      answer:
        "Sí. Cotizas por WhatsApp, confirmamos medidas y terminación, y coordinamos fabricación y despacho.",
    },
    {
      question: "¿Qué tipo de muebles venden?",
      answer:
        "Mesas, sillas, bancas, veladores, sitiales y piezas a medida. También cubiertas, puertas, peldaños y molduras.",
    },
    {
      question: "¿Hacen muebles a medida en Chillán?",
      answer:
        "Sí. Además del catálogo, fabricamos según medidas y especificaciones de tu proyecto.",
    },
    {
      question: "¿Envían fuera de Chillán?",
      answer:
        "Sí. Realizamos envíos a todo Chile. Te indicamos opciones al cotizar.",
    },
  ],
  relatedLinks: [
    {
      href: "/cubiertas-a-medida",
      title: "Cubiertas a medida",
      description: "Mesones y tablones de madera para quincho o cocina.",
    },
    {
      href: "/kit-pergola",
      title: "Kit pérgola modular",
      description: "Uniones metálicas y soportes para armar pérgola 3×3.",
    },
    {
      href: "/peldanos-a-medida",
      title: "Peldaños a medida",
      description: "Huellas de madera para escalera según tus medidas.",
    },
    {
      href: "/muebles-a-medida",
      title: "Muebles a medida",
      description: "Proyectos personalizados en madera desde Chillán.",
    },
  ],
  ctaTitle: "Cotiza tus muebles en Chillán",
  ctaParagraph:
    "Escríbenos por WhatsApp y te orientamos con catálogo o fabricación a medida.",
  ctaBullets: [
    "Taller en Chillán.",
    "Catálogo y piezas a medida.",
    "Envíos a todo Chile.",
  ],
  schemaType: "Service",
  serviceName: "Muebles de madera en Chillán",
  serviceType: "Fabricación y venta de muebles de madera",
};

export const mueblesAMedidaLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/muebles-a-medida",
  pageTitle: "Muebles a Medida en Madera | Fabricación Chile",
  pageDescription:
    "Muebles de madera a medida en Chile: cubiertas, puertas, peldaños, molduras y cocinas. Cotiza tu proyecto por WhatsApp con envío nacional.",
  keywords: [
    "muebles a medida",
    "muebles de madera a medida",
    "muebles a medida chile",
    "madera a medida",
    "fabricacion muebles madera",
    "muebles personalizados madera",
  ],
  eyebrow: "Fabricación a medida en madera",
  h1: "Muebles de madera a medida para tu proyecto",
  heroParagraph:
    "En Idea Madera fabricamos piezas de madera a medida desde nuestro taller en Chillán: cubiertas y mesones, puertas, peldaños para escaleras, molduras y muebles de cocina. Cada proyecto parte de tus medidas y especificaciones, con asesoría directa por WhatsApp y envío a todo Chile.",
  badges: ["Taller en Chillán", "Fabricación a medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar proyecto a medida",
  whatsappProductTitle: "Muebles a medida",
  whatsappLines: [
    "Vengo desde la página de muebles a medida.",
    "Quiero cotizar un proyecto personalizado en madera.",
    "Puedo enviar medidas, referencia visual y comuna.",
  ],
  heroHighlights: [
    {
      title: "Medidas exactas",
      description: "Cada pieza se fabrica según las dimensiones de tu proyecto.",
    },
    {
      title: "Madera seleccionada",
      description: "Lenga austral y pino premium seco en cámara.",
    },
    {
      title: "Asesoría directa",
      description: "Cotización clara por WhatsApp para particulares y obras.",
    },
  ],
  sectionTitle: "Todo lo que fabricamos a medida",
  sectionParagraph:
    "Desde peldaños para una escalera hasta el mesón de un quincho, trabajamos madera según tus especificaciones. Cada línea de producto a medida tiene su propia página con detalle y cotización directa.",
  featureCards: [
    {
      title: "Cubiertas y mesones",
      description:
        "Tablones y cubiertas para barras, quinchos, restaurantes y cocinas. Lenga austral y pino premium a medida.",
    },
    {
      title: "Puertas de madera",
      description:
        "Puertas personalizadas para hogares y negocios. Diseño, madera y terminación a tu elección.",
    },
    {
      title: "Peldaños para escaleras",
      description:
        "Peldaños a medida en largo, ancho y espesor para escaleras nuevas o remodelaciones.",
    },
    {
      title: "Molduras y perfiles",
      description:
        "Molduras para muros, techos, marcos y vanos con perfil personalizado según referencia.",
    },
    {
      title: "Muebles de cocina",
      description:
        "Mesones, cubiertas, islas y piezas de cocina en madera desde nuestro taller en Chillán.",
    },
    {
      title: "Proyectos especiales",
      description:
        "Si tu idea no encaja en una categoría, cuéntanos por WhatsApp y evaluamos la fabricación.",
    },
  ],
  stepsTitle: "Cómo cotizar tu proyecto a medida",
  steps: [
    {
      title: "Cuéntanos tu idea",
      description:
        "Escríbenos por WhatsApp con medidas, tipo de pieza, uso, comuna y una foto o croquis de referencia.",
    },
    {
      title: "Definimos madera y diseño",
      description:
        "Te orientamos en madera, terminación y formato según el uso y estilo de tu proyecto.",
    },
    {
      title: "Recibes cotización y plazos",
      description:
        "Te enviamos propuesta clara con precio referencial, tiempo de fabricación y opciones de despacho.",
    },
  ],
  bottomHighlights: [
    {
      title: "Más de 30 años de experiencia",
      description:
        "Equipo artesanal con maquinaria especializada para cumplir especificaciones técnicas de cada cliente.",
    },
    {
      title: "Envíos a todo Chile",
      description:
        "Fabricamos en Chillán y coordinamos despacho según tu comuna o región al momento de cotizar.",
    },
  ],
  faqItems: [
    {
      question: "¿Qué tipos de muebles fabrican a medida?",
      answer:
        "Fabricamos cubiertas y mesones, puertas, peldaños, molduras, muebles de cocina y proyectos especiales en madera según tus medidas.",
    },
    {
      question: "¿Qué información necesitan para cotizar?",
      answer:
        "Idealmente medidas, tipo de pieza, uso, comuna y una foto o croquis de referencia. Si no tienes todo definido, te ayudamos a precisar.",
    },
    {
      question: "¿Atienden proyectos para empresas y particulares?",
      answer:
        "Sí. Trabajamos con clientes particulares, arquitectos, diseñadores, constructoras y locales comerciales.",
    },
    {
      question: "¿Cuánto demora la fabricación?",
      answer:
        "Los plazos dependen del tipo de pieza, cantidad y complejidad. Te confirmamos tiempo estimado al cotizar.",
    },
    {
      question: "¿Envían a todo Chile?",
      answer:
        "Sí. Fabricamos en Chillán y coordinamos envíos a todo Chile. Al cotizar te indicamos opciones según tu ubicación.",
    },
    {
      question: "¿Puedo ver los otros servicios en detalle?",
      answer:
        "Sí. Cada línea tiene su propia página: cubiertas a medida, puertas a medida, peldaños a medida, molduras a medida y muebles de cocina en Chillán.",
    },
  ],
  relatedLinks: [
    {
      href: "/guias/cotizar-muebles-a-medida",
      title: "Cómo cotizar a medida",
      description: "Guía para cotizar proyectos personalizados por WhatsApp.",
    },
    {
      href: "/cubiertas-a-medida",
      title: "Cubiertas y mesones",
      description: "Tablones y cubiertas de madera para quinchos, barras y cocinas.",
    },
    {
      href: "/kit-pergola",
      title: "Kit pérgola modular",
      description: "Uniones metálicas y soportes para armar pérgola 3×3 pulgadas.",
    },
    {
      href: "/puertas-a-medida",
      title: "Puertas de madera",
      description: "Puertas personalizadas para hogares y negocios.",
    },
    {
      href: "/peldanos-a-medida",
      title: "Peldaños para escaleras",
      description: "Peldaños a medida en largo, ancho y espesor.",
    },
    {
      href: "/molduras-a-medida",
      title: "Molduras y perfiles",
      description: "Molduras de madera personalizadas para muros y techos.",
    },
    {
      href: "/muebles-de-cocina-chillan",
      title: "Muebles de cocina",
      description: "Mesones, islas y piezas de cocina en madera.",
    },
    {
      href: "/comedores-nordicos",
      title: "Comedores nórdicos",
      description: "Mesas, sillas y bancas de estilo escandinavo.",
    },
  ],
  ctaTitle: "Cotiza hoy tu proyecto a medida",
  ctaParagraph:
    "Escríbenos por WhatsApp con tu idea, medidas y una referencia visual. Te respondemos con una propuesta clara.",
  ctaBullets: sharedCtaBullets,
  schemaType: "Service",
  serviceName: "Muebles de madera a medida",
  serviceType: "Fabricación de muebles de madera a medida",
  stats: [
    { value: "Desde 2001", label: "Taller familiar" },
    { value: "Chillán", label: "Fabricación propia" },
    { value: "Todo Chile", label: "Cobertura de envío" },
  ],
};

export const serviceLandingPaths = [
  peldanosLandingConfig.canonicalPath,
  cubiertasLandingConfig.canonicalPath,
  moldurasLandingConfig.canonicalPath,
  puertasLandingConfig.canonicalPath,
  mueblesCocinaChillanLandingConfig.canonicalPath,
  mueblesChillanLandingConfig.canonicalPath,
  mueblesAMedidaLandingConfig.canonicalPath,
  quienesSomosLandingConfig.canonicalPath,
  contactoLandingConfig.canonicalPath,
] as const;

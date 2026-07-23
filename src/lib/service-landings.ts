import type { Metadata } from "next";
import { absoluteUrl, buildServiceOfferSchema, SITE_NAME } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type LandingHighlight = { title: string; description: string };
export type LandingStep = { title: string; description: string };
export type LandingFaq = { question: string; answer: string };
export type LandingStat = { value: string; label: string };

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
  pageTitle: "Peldaños a Medida en Madera | Cotiza por WhatsApp | Idea Madera",
  pageDescription:
    "Fabricamos peldaños a medida en madera para escaleras y proyectos personalizados. Atención a empresas y particulares con envíos a todo Chile. Cotiza por WhatsApp.",
  keywords: [
    "peldaños a medida",
    "peldaños de madera a medida",
    "escalones de madera a medida",
    "peldaños para escalera",
    "cotizar peldaños a medida",
  ],
  eyebrow: "Peldaños a medida en madera",
  h1: "Peldaños a medida para escaleras",
  heroParagraph:
    "Diseñamos y fabricamos peldaños a medida en madera, adaptados a tu proyecto. Si buscas peldaños de madera a medida con terminaciones limpias y estructura resistente, te ayudamos a cotizar rápido con asesoría directa para empresas y particulares.",
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
  pageTitle: "Cubiertas de Madera a Medida | Mesones y Tablones | Idea Madera",
  pageDescription:
    "Fabricamos cubiertas y tablones de madera a medida en Chillán para barras, mesones, quinchos y proyectos comerciales. Lenga austral y pino premium. Cotiza por WhatsApp con envío a todo Chile.",
  keywords: [
    "cubiertas de madera a medida",
    "mesones de madera",
    "tablones de madera a medida",
    "cubiertas para quincho",
    "mesones para restaurant",
    "cubiertas madera chile",
    "cubiertas madera chillan",
  ],
  eyebrow: "Cubiertas de madera a medida",
  h1: "Cubiertas y tablones de madera a tu medida",
  heroParagraph:
    "Desarrollamos cubiertas y tablones terminados en medidas personalizadas desde nuestro taller en Chillán, para hogares, restaurantes, quinchos y salones de eventos. Trabajamos madera nativa seca en cámara —lenga austral y pino premium— con fabricación artesanal y asesoría directa por WhatsApp.",
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
  sectionTitle: "Cubiertas de madera para cada uso",
  sectionParagraph:
    "Nos ajustamos a tus medidas y hacemos que cada detalle funcione. Fabricamos cubiertas para barras, mesones de trabajo, mesones para restaurant, cubiertas para quincho, salones de eventos y más. Cada proyecto cuenta con un trato personalizado para elegir la mejor opción de madera y terminación.",
  featureCards: [
    {
      title: "Barras y mesones",
      description: "Cubiertas resistentes para cocinas, barras y mesones de trabajo con terminación prolija.",
    },
    {
      title: "Quinchos y exteriores",
      description: "Tablones y cubiertas pensadas para espacios de reunión, quinchos y terrazas.",
    },
    {
      title: "Proyectos comerciales",
      description: "Mesones para restaurantes, salones de eventos y espacios con alto tránsito.",
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
      question: "¿Qué tipos de cubiertas fabrican?",
      answer:
        "Fabricamos cubiertas y tablones para barras, mesones de cocina, mesones para restaurant, quinchos, salones de eventos y proyectos personalizados.",
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
      question: "¿Cómo cotizo cubiertas de madera?",
      answer:
        "Escríbenos por WhatsApp con medidas, tipo de uso, comuna y una foto o boceto de referencia para una cotización más precisa.",
    },
    {
      question: "¿Envían cubiertas a todo Chile?",
      answer: "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones y tiempos según tu ubicación.",
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
  pageTitle: "Molduras de Madera a Medida | Chile | Idea Madera",
  pageDescription:
    "Fabricamos molduras de madera a medida en Chillán para muros, techos, puertas y proyectos de terminación. Perfiles personalizados con envío a todo Chile. Cotiza por WhatsApp.",
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
    "Fabricamos molduras y perfiles de madera a medida desde nuestro taller en Chillán. Ideales para muros, techos, vanos, puertas y terminaciones interiores. Trabajamos según tus medidas, estilo y tipo de madera, con cotización clara por WhatsApp y envío a todo Chile.",
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
  pageTitle: "Puertas de Madera a Medida | Personalizadas | Idea Madera",
  pageDescription:
    "Fabricamos puertas de madera personalizadas a medida en Chillán para hogares y negocios. Diseño, durabilidad y madera nativa seca en cámara. Cotiza por WhatsApp con envío a todo Chile.",
  keywords: [
    "puertas de madera a medida",
    "puertas personalizadas madera",
    "puertas madera chile",
    "puertas a medida chillan",
    "cotizar puertas madera",
  ],
  eyebrow: "Puertas de madera a medida",
  h1: "Puertas de madera personalizadas a medida",
  heroParagraph:
    "Fabricamos puertas a medida según tus especificaciones exactas desde Chillán, para que se adapten perfectamente a tu hogar o negocio. Más de 30 años trabajando maderas nobles del sur de Chile con diseño personalizado, durabilidad y terminaciones prolijas.",
  badges: ["Taller en Chillán", "Diseño personalizado", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar puertas por WhatsApp",
  whatsappProductTitle: "Puertas a medida",
  whatsappLines: [
    "Vengo desde la página de puertas a medida.",
    "Quiero cotizar puertas de madera personalizadas.",
    "Puedo enviar medidas, tipo de puerta, comuna y foto de referencia.",
  ],
  heroHighlights: [
    { title: "Especificaciones exactas", description: "Cada puerta se fabrica según las medidas y diseño de tu proyecto." },
    { title: "Madera nativa seca en cámara", description: "Materiales seleccionados para durabilidad y estabilidad." },
    { title: "+3.200 proyectos realizados", description: "Experiencia en fabricación artesanal y maquinaria especializada." },
  ],
  sectionTitle: "Puertas hechas para durar",
  sectionParagraph:
    "Nuestras puertas de madera personalizadas se fabrican con cuidado y atención al detalle. Te guiamos para elegir la opción que más se acomode a tus necesidades, ya sea para interiores, exteriores o proyectos comerciales. Cada pieza es realizada por manos expertas con herramientas especializadas.",
  featureCards: [
    {
      title: "Diseños personalizados",
      description: "Puertas fabricadas según estilo, medidas y terminación que necesites para tu espacio.",
    },
    {
      title: "Durabilidad y calidad",
      description: "Construcción sólida con madera nativa seca en cámara y materiales de primera calidad.",
    },
    {
      title: "Asesoría directa",
      description: "Te acompañamos desde la idea inicial hasta la cotización final por WhatsApp.",
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
      question: "¿Cómo cotizo una puerta de madera?",
      answer:
        "Escríbenos por WhatsApp con medidas, tipo de puerta, comuna y referencias visuales para orientarte con precio y plazos.",
    },
    {
      question: "¿Realizan envíos a todo Chile?",
      answer: "Sí, coordinamos envíos a todo Chile. Al cotizar te indicamos opciones según comuna o región.",
    },
  ],
  ctaTitle: "Cotiza hoy tus puertas de madera",
  ctaParagraph:
    "¿Tienes una idea en mente? Escríbenos por WhatsApp y recibe tu cotización cuanto antes.",
  ctaBullets: sharedCtaBullets,
  schemaType: "Service",
  serviceName: "Puertas de madera a medida",
  serviceType: "Fabricación de puertas personalizadas",
  stats: [
    { value: "30+", label: "Años de experiencia" },
    { value: "3.200+", label: "Proyectos realizados" },
    { value: "15+", label: "Trabajadores" },
  ],
};

export const quienesSomosLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/quienes-somos",
  pageTitle: "¿Quiénes Somos? | Muebles de Madera en Chile | Idea Madera",
  pageDescription:
    "Idea Madera es una empresa familiar de Chillán desde 2001. Diseñamos y fabricamos muebles de madera con venta directa, calidad artesanal y envíos a todo Chile. Conoce nuestra historia.",
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
  pageTitle: "Contacto | Idea Madera | Cotiza por WhatsApp",
  pageDescription:
    "Contáctanos para cotizar muebles de madera, piezas a medida o consultas sobre envíos. WhatsApp +56 9 9549 7838, hola@ideamadera.cl. Envíos a todo Chile.",
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
  pageTitle: "Muebles de Cocina en Chillán | Madera a Medida | Idea Madera",
  pageDescription:
    "Muebles de cocina en madera a medida en Chillán: mesones, cubiertas, islas y terminaciones. Fabricación local Idea Madera con cotización por WhatsApp y envío a todo Chile.",
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
  pageTitle: "Muebles Chillán | Madera a Medida | Idea Madera",
  pageDescription:
    "Muebles en Chillán fabricados en madera: mesas, sillas, bancas y piezas a medida. Taller Idea Madera con cotización por WhatsApp y envío a todo Chile.",
  keywords: [
    "muebles chillan",
    "muebles en chillán",
    "muebles de madera chillan",
    "muebles a medida chillan",
    "fabrica muebles chillan",
    "muebles madera chillán chile",
  ],
  eyebrow: "Muebles en Chillán",
  h1: "Muebles de madera en Chillán",
  heroParagraph:
    "Idea Madera fabrica muebles de madera en Chillán con diseño cuidado y venta directa: mesas, sillas, bancas, veladores y piezas a medida. Cotiza por WhatsApp y recibe orientación en medidas, terminación y despacho a todo Chile.",
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
  sectionTitle: "Muebles Chillán para cada espacio del hogar",
  sectionParagraph:
    "Si buscas muebles en Chillán con madera maciza y terminación prolija, aquí encuentras mesas de comedor, sillas, bancas, muebles de living y proyectos a medida. Trabajamos para hogares de Ñuble y enviamos al resto de Chile.",
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

export const serviceLandingPaths = [
  peldanosLandingConfig.canonicalPath,
  cubiertasLandingConfig.canonicalPath,
  moldurasLandingConfig.canonicalPath,
  puertasLandingConfig.canonicalPath,
  mueblesCocinaChillanLandingConfig.canonicalPath,
  mueblesChillanLandingConfig.canonicalPath,
  quienesSomosLandingConfig.canonicalPath,
  contactoLandingConfig.canonicalPath,
] as const;

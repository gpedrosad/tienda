import { SINCE_FOUNDING, tallerFamiliarStat } from "@/lib/founding";
import type { LandingRelatedLink, ServiceLandingConfig } from "@/lib/service-landings";

const doorCtaBullets = [
  "Atención para empresas y particulares.",
  "Envíos a todo Chile.",
  "Respuesta rápida para cotización.",
];

const doorClusterLinks: LandingRelatedLink[] = [
  {
    href: "/puertas-a-medida",
    title: "Puertas a medida",
    description: "Fábrica en Chillán: hoja a medida para hogar o negocio.",
  },
  {
    href: "/puertas-interiores",
    title: "Puertas interiores",
    description: "Dormitorio, baño, cocina u oficina, según el vano.",
  },
  {
    href: "/puertas-exteriores",
    title: "Puertas de entrada",
    description: "Entrada principal y uso exterior. Cambia madera y acabado.",
  },
  {
    href: "/puertas-correderas",
    title: "Puertas correderas",
    description: "Hoja que corre. Referencia de interior en madera y vidrio.",
  },
  {
    href: "/puertas-de-madera-con-vidrio",
    title: "Puertas con vidrio",
    description: "Hoja con vidrio según tu referencia. El tipo de vidrio se confirma al cotizar.",
  },
  {
    href: "/puertas-para-locales",
    title: "Puertas para locales",
    description: "Hoja para local, oficina o bodega. No es puerta acústica ni de seguridad.",
  },
  {
    href: "/puertas-madera-nativa",
    title: "Madera nativa",
    description: "Madera nativa seca en cámara. La especie se confirma al cotizar.",
  },
  {
    href: "/guias/medidas-y-madera-puertas",
    title: "Medidas y madera",
    description: "Medidas habituales en Chile y cómo pensar la madera de la hoja.",
  },
  {
    href: "/muebles-a-medida",
    title: "Muebles a medida",
    description: "Otras piezas de madera a medida desde el mismo taller.",
  },
];

export function doorRelatedLinks(href: string) {
  return doorClusterLinks.filter((link) => link.href !== href);
}

function relatedExcept(href: string) {
  return doorRelatedLinks(href);
}

const tallerFamiliar = {
  title: "Fabricación chilena",
  description: `Taller familiar en Chillán ${SINCE_FOUNDING}, con equipo artesanal y maquinaria especializada.`,
};

export const puertasInterioresLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-interiores",
  updatedAt: "2026-10-28",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Puertas a medida", path: "/puertas-a-medida" },
    { name: "Puertas interiores", path: "/puertas-interiores" },
  ],
  pageTitle: "Puertas Interiores de Madera a Medida | Chillán",
  pageDescription:
    "Puertas interiores de madera a medida en Chillán: dormitorio, baño o cocina. Cotiza la hoja por WhatsApp con alto, ancho y foto. Envío a todo Chile.",
  keywords: [
    "puertas interiores de madera",
    "puertas interiores a medida",
    "puertas de dormitorio a medida",
    "puerta de baño madera",
    "puertas interiores chillán",
  ],
  eyebrow: "Puertas interiores",
  h1: "Puertas interiores de madera a medida en Chillán",
  heroParagraph:
    "Fabricamos la hoja de puertas interiores a medida en Chillán, para dormitorio, baño, cocina u oficina. No es la entrada de la casa: ese uso es exterior y cambia madera y acabado. Partimos de tu vano y de una referencia (lisa, con paneles o con vidrio). Marco, herrajes e instalación no se asumen incluidos.",
  badges: ["Taller en Chillán", "Hoja a medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar puerta interior por WhatsApp",
  whatsappProductTitle: "Puertas interiores a medida",
  whatsappLines: [
    "Vengo desde la página de puertas interiores.",
    "Quiero cotizar una puerta interior de madera.",
    "Puedo enviar alto, ancho, espesor, si es dormitorio, baño, cocina u oficina, comuna y foto del vano.",
  ],
  heroHighlights: [
    {
      title: "Uso interior",
      description: "Dormitorio, baño, cocina u oficina. No es la entrada principal.",
    },
    {
      title: "Diseño desde tu referencia",
      description: "Hoja lisa, con paneles o con vidrio. No hay catálogo de modelos.",
    },
    {
      title: "Madera nativa seca en cámara",
      description: "La especie se confirma al cotizar. Interior y exterior no usan el mismo criterio.",
    },
  ],
  heroImage: {
    src: "/images/puertas/puerta-corredera-madera-vidrio-interior.webp",
    alt: "Puerta corredera de madera y vidrio para interior",
    width: 956,
    height: 1268,
  },
  sectionTitle: "Qué puerta interior cotizamos",
  sectionParagraph:
    "Una puerta interior separa piezas de la casa o de un local. Sirve para las puertas de dormitorio y para las de otras piezas de la casa: baño, cocina u oficina. La fabricamos como hoja a medida, con las medidas de tu vano. Si la puerta da a la calle o es la entrada principal, cotízala como exterior: madera y acabado cambian, y no prometemos intemperie sin ver el vano.",
  featureCards: [
    {
      title: "Puertas de dormitorio, baño o cocina",
      description: "El baño y la cocina tienen más humedad que un dormitorio. Dilo al cotizar.",
    },
    {
      title: "Lisa, con paneles o con vidrio",
      description: "No publicamos modelos con precio. Sirve un croquis o una foto de referencia.",
    },
    {
      title: "Hoja, no el marco",
      description: "La cotización parte por la hoja. Marco, herrajes e instalación se confirman aparte.",
    },
  ],
  stepsTitle: "Cómo cotizar una puerta interior",
  steps: [
    {
      title: "Mide el vano interior",
      description: "Alto, ancho y espesor, en centímetros, más una foto. El detalle de cómo medir está en la guía.",
    },
    {
      title: "Di la pieza y el diseño",
      description: "Dormitorio, baño, cocina u oficina, y si la hoja es lisa, con paneles o con vidrio.",
    },
    {
      title: "Recibe la propuesta",
      description: "Te respondemos por WhatsApp con madera, terminación, precio y plazo.",
    },
  ],
  bottomHighlights: [
    tallerFamiliar,
    {
      title: "Varias hojas del mismo interior",
      description: "Indica la cantidad y si los vanos son iguales o distintos. Cada uno se revisa con su medida.",
    },
  ],
  extraSections: [
    {
      title: "Interior no es lo mismo que la entrada",
      paragraphs: [
        "En dormitorio, baño, cocina u oficina la hoja queda bajo techo. Un baño o una cocina sueltan más vapor que un dormitorio: indícalo para que la madera y el acabado se propongan con ese uso. No publicamos un acabado único para humedad.",
        "La entrada principal es otro encargo. Va en [puertas de entrada y exteriores](/puertas-exteriores). Si la hoja debe correr en vez de abatirse, mira [puertas correderas](/puertas-correderas): la referencia del taller es de interior, en madera y vidrio. Si abre con bisagras y lleva vidrio, el caso está en [puertas de madera con vidrio](/puertas-de-madera-con-vidrio).",
        "El material que publicamos para la hoja es madera nativa seca en cámara. La especie no está en un listado: se confirma al cotizar. Más contexto en [puertas de madera nativa](/puertas-madera-nativa) y en la [guía de medidas y madera](/guias/medidas-y-madera-puertas).",
      ],
    },
    {
      title: "Qué enviar por WhatsApp",
      paragraphs: [
        "Para una puerta interior necesitamos el vano, no un modelo de catálogo. Si reemplazas una hoja, sirve también el alto, el ancho y el espesor de la hoja actual. Manda las dos cosas si puedes, más una foto.",
        "La fábrica general, con el mismo taller y el mismo criterio de cotización, está en [puertas a medida](/puertas-a-medida). Otros muebles del proyecto van en [muebles a medida](/muebles-a-medida).",
      ],
      bullets: [
        "Alto, ancho y espesor del vano o de la hoja (cm)",
        "Pieza: dormitorio, baño, cocina u oficina",
        "Diseño: lisa, con paneles, con vidrio o una foto",
        "Comuna de despacho",
      ],
    },
  ],
  faqItems: [
    {
      question: "¿Hacen puertas de dormitorio, baño y cocina?",
      answer:
        "Sí. Son usos interiores. El baño y la cocina tienen más humedad que un dormitorio: escríbelo junto con las medidas del vano. La hoja se fabrica a medida. Marco, herrajes e instalación no se asumen incluidos.",
    },
    {
      question: "¿Una puerta interior sirve como entrada de la casa?",
      answer:
        "No la cotizamos igual. La entrada principal es uso exterior: cambia madera y acabado. Cotízala en puertas de entrada y exteriores y no prometemos resistencia a la intemperie sin ver el vano.",
    },
    {
      question: "¿Puedo pedir la hoja con vidrio o con paneles?",
      answer:
        "Sí, si nos mandas la referencia. No hay modelos fijos: puede ser lisa, con paneles o con vidrio. Te confirmamos qué es factible en el taller.",
    },
    {
      question: "¿Hacen la puerta interior corredera?",
      answer:
        "La referencia publicada de hoja que corre es de interior, en madera y vidrio. Ese caso está en puertas correderas. El riel cuenta como herraje y no se asume incluido.",
    },
    {
      question: "¿Qué madera usan en una puerta interior?",
      answer:
        "Madera nativa seca en cámara, maderas nobles del sur de Chile. No publicamos la especie en un listado: se confirma al cotizar. El detalle está en puertas de madera nativa.",
    },
    {
      question: "¿Cómo mido antes de escribir?",
      answer:
        "Ancho del vano arriba, al medio y abajo (quédate con la medida más chica) y alto a ambos lados. La guía de medidas y madera para puertas ordena esas medidas y las hojas que se ven seguido en Chile. Esas medidas no son un catálogo.",
    },
    {
      question: "¿Puedo reemplazar solo la hoja de una puerta interior?",
      answer:
        "Si reemplazas una hoja, sirve también el alto, el ancho y el espesor de la hoja actual. Manda las dos cosas si puedes, más una foto. La cotización parte por la hoja. Marco, herrajes e instalación se confirman aparte.",
    },
    {
      question: "¿Hacen varias puertas interiores en el mismo encargo?",
      answer:
        "Indica la cantidad y si los vanos son iguales o distintos. Cada uno se revisa con su medida.",
    },
    {
      question: "¿Qué acabado lleva una puerta de baño o de cocina?",
      answer:
        "Un baño o una cocina sueltan más vapor que un dormitorio: indícalo para que la madera y el acabado se propongan con ese uso. No publicamos un acabado único para humedad. En dormitorio, baño, cocina u oficina la hoja queda bajo techo.",
    },
  ],
  relatedLinks: relatedExcept("/puertas-interiores"),
  ctaTitle: "Cotiza tu puerta interior",
  ctaParagraph:
    "Escríbenos por WhatsApp con el vano, la pieza y una foto. Te respondemos desde el taller en Chillán.",
  ctaBullets: doorCtaBullets,
  schemaType: "Service",
  serviceName: "Puertas interiores de madera a medida",
  serviceType: "Fabricación de puertas interiores de madera",
  stats: [
    tallerFamiliarStat,
    { value: "Chillán", label: "Fabricación propia" },
    { value: "Todo Chile", label: "Cobertura de envío" },
  ],
};

export const puertasExterioresLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-exteriores",
  updatedAt: "2026-10-26",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Puertas a medida", path: "/puertas-a-medida" },
    { name: "Puertas de entrada", path: "/puertas-exteriores" },
  ],
  pageTitle: "Puertas de Entrada de Madera a Medida | Chillán",
  pageDescription:
    "Puertas de entrada y exteriores de madera a medida en Chillán. El uso cambia madera y acabado. Cotiza la hoja por WhatsApp con el vano.",
  keywords: [
    "puertas de entrada de madera",
    "puertas exteriores de madera",
    "puerta principal a medida",
    "puertas de entrada chillán",
    "puerta exterior madera a medida",
  ],
  eyebrow: "Puertas de entrada",
  h1: "Puertas de entrada de madera a medida en Chillán",
  heroParagraph:
    "La entrada principal es un uso exterior. Fabricamos esa hoja a medida en Chillán: cambia madera y acabado respecto de una puerta de dormitorio o baño. No prometemos resistencia a la intemperie sin ver el vano. Las fotos de fachada, muro de piedra y montante son referencias, no un catálogo. Marco, herrajes e instalación no se asumen incluidos.",
  badges: ["Uso exterior", "Hoja a medida", "Taller en Chillán"],
  whatsappButtonLabel: "Cotizar puerta de entrada por WhatsApp",
  whatsappProductTitle: "Puertas de entrada a medida",
  whatsappLines: [
    "Vengo desde la página de puertas de entrada y exteriores.",
    "Quiero cotizar una puerta de entrada de madera.",
    "Puedo enviar alto, ancho, espesor, una foto del vano o de la fachada, y la comuna.",
  ],
  heroHighlights: [
    {
      title: "Entrada principal",
      description: "Es uso exterior. No se cotiza como una puerta de dormitorio.",
    },
    {
      title: "Madera y acabado distintos",
      description: "Interior o exterior cambia la propuesta. No prometemos intemperie sin ver el vano.",
    },
    {
      title: "Referencias, no catálogo",
      description: "Hojas dobles en fachada, en muro de piedra y con montante. Sin precio publicado.",
    },
  ],
  heroImage: {
    src: "/images/puertas/puerta-doble-madera-vidrios-fachada.webp",
    alt: "Puerta doble de madera con vidrios en fachada",
    width: 1200,
    height: 1600,
  },
  galleryTitle: "Referencias de puertas de entrada",
  galleryIntro:
    "Obras de referencia. No son modelos con precio. Marco, herrajes e instalación no se asumen incluidos.",
  gallery: [
    {
      src: "/images/puertas/puerta-doble-madera-muro-piedra.webp",
      alt: "Puerta doble de madera con vidrios instalada en un muro de piedra",
      width: 720,
      height: 1280,
    },
    {
      src: "/images/puertas/puerta-doble-madera-con-montante.webp",
      alt: "Puerta doble de madera con montante y dintel en la entrada",
      width: 720,
      height: 760,
    },
  ],
  sectionTitle: "Qué cambia en una puerta exterior",
  sectionParagraph:
    "Una puerta de entrada queda en la fachada. Recibe otro uso que la hoja de un dormitorio, y por eso la madera y el acabado se definen con el vano a la vista. Fabricamos la hoja a la medida de ese vano. Si tu puerta es interior, el encargo correcto está en puertas interiores.",
  featureCards: [
    {
      title: "Hoja simple o doble",
      description: "Las referencias muestran hojas dobles. El vano real manda: envía las medidas y una foto.",
    },
    {
      title: "Vidrio en la referencia",
      description: "Hay referencias con vidrio. No publicamos un tipo de vidrio: se confirma si tu diseño lo pide.",
    },
    {
      title: "Sin marco por defecto",
      description: "La propuesta parte por la hoja. Marco, herrajes e instalación se conversan aparte.",
    },
  ],
  stepsTitle: "Cómo cotizar la entrada",
  steps: [
    {
      title: "Foto de la fachada o del vano",
      description: "Así vemos si es entrada principal, hoja doble o una hoja simple.",
    },
    {
      title: "Medidas y comuna",
      description: "Alto, ancho y espesor, en centímetros, más la comuna de despacho.",
    },
    {
      title: "Madera, acabado y plazo",
      description: "Te respondemos por WhatsApp. El acabado de exterior no se promete sin ver el vano.",
    },
  ],
  bottomHighlights: [
    tallerFamiliar,
    {
      title: "Envío a tu comuna",
      description: "Coordinamos despacho a todo Chile. El costo de envío se indica al cotizar.",
    },
  ],
  extraSections: [
    {
      title: "Qué muestran las referencias",
      paragraphs: [
        "En el taller hay tres referencias de entrada: una puerta doble de madera con vidrios en fachada, una puerta doble de madera con vidrios en un muro de piedra, y una puerta doble con montante y dintel. Son obras, no modelos a la venta. Las dos con vidrio se ven en [puertas de madera con vidrio](/puertas-de-madera-con-vidrio): no hay un modelo publicado ni un tipo de vidrio en catálogo, y marco, herrajes, vidrio e instalación no se asumen incluidos.",
        "Si tu vano es de una sola hoja, cotízalo igual: manda las medidas y una foto. No forzamos el diseño de la foto si tu hueco es distinto.",
        "Para una puerta de dormitorio, baño o cocina usa [puertas interiores](/puertas-interiores). La fábrica general está en [puertas a medida](/puertas-a-medida).",
      ],
    },
    {
      title: "Madera de una puerta de entrada",
      paragraphs: [
        "Publicamos madera nativa seca en cámara y maderas nobles del sur de Chile. En una entrada, la especie y el acabado se confirman al cotizar porque el uso exterior cambia la elección. No prometemos que quede a la lluvia y al sol sin revisar el caso.",
        "El criterio para elegir madera, sin inventar una especie, está en la [guía de medidas y madera](/guias/medidas-y-madera-puertas) y en [puertas de madera nativa](/puertas-madera-nativa). Otros muebles del mismo proyecto se cotizan en [muebles a medida](/muebles-a-medida).",
      ],
    },
  ],
  faqItems: [
    {
      question: "¿Fabrican la puerta de entrada principal?",
      answer:
        "Sí. La entrada principal es uso exterior. Cambia madera y acabado respecto de una puerta de dormitorio o baño. Indícalo con las medidas del vano y una foto. Marco, herrajes e instalación no se asumen incluidos.",
    },
    {
      question: "¿Resisten la lluvia y el sol?",
      answer:
        "No lo prometemos sin ver el vano. Interior o exterior cambia madera y acabado. En la respuesta te decimos qué corresponde a tu caso.",
    },
    {
      question: "¿Hacen puertas dobles como las de las fotos?",
      answer:
        "Las fotos son referencias de hojas dobles: en fachada, en un muro de piedra y con montante y dintel. Si tu vano es doble, envía las medidas y la foto. No es un modelo con precio publicado.",
    },
    {
      question: "¿Incluyen el marco de la entrada?",
      answer:
        "No se asume incluido. La cotización parte por la hoja. Si necesitas marco, herrajes o instalación, dilo en el mismo WhatsApp para confirmarlo.",
    },
    {
      question: "¿Qué madera proponen para exterior?",
      answer:
        "Madera nativa seca en cámara. No publicamos la especie antes de cotizar: depende del vano y del uso. Más detalle en puertas de madera nativa.",
    },
    {
      question: "¿Sirve la misma puerta para un dormitorio?",
      answer:
        "No se propone igual. El dormitorio es interior. Cotízalo en puertas interiores. Las medidas habituales de hoja están en la guía de puertas.",
    },
    {
      question: "¿Hacen puerta de entrada de una sola hoja?",
      answer:
        "Si tu vano es de una sola hoja, cotízalo igual: manda las medidas y una foto. No forzamos el diseño de la foto si tu hueco es distinto. Las fotos son referencias de hojas dobles, no un modelo con precio publicado.",
    },
    {
      question: "¿La puerta de entrada puede llevar vidrio?",
      answer:
        "Hay referencias con vidrio. No publicamos un tipo de vidrio: se confirma si tu diseño lo pide. Las fotos son obras, no modelos a la venta.",
    },
  ],
  relatedLinks: relatedExcept("/puertas-exteriores"),
  ctaTitle: "Cotiza tu puerta de entrada",
  ctaParagraph:
    "Manda alto, ancho, foto del vano y comuna por WhatsApp. Te decimos madera, acabado y qué queda incluido.",
  ctaBullets: doorCtaBullets,
  schemaType: "Service",
  serviceName: "Puertas de entrada y exteriores de madera a medida",
  serviceType: "Fabricación de puertas de entrada de madera",
  stats: [
    tallerFamiliarStat,
    { value: "Chillán", label: "Fabricación propia" },
    { value: "Todo Chile", label: "Cobertura de envío" },
  ],
};

export const puertasCorrederasLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-correderas",
  updatedAt: "2026-10-29",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Puertas a medida", path: "/puertas-a-medida" },
    { name: "Puertas correderas", path: "/puertas-correderas" },
  ],
  pageTitle: "Puertas Correderas de Madera a Medida | Chillán",
  pageDescription:
    "Puertas correderas de madera a medida en Chillán. Referencia de interior con vidrio. Cotiza la hoja por WhatsApp. Herrajes aparte.",
  keywords: [
    "puertas correderas de madera",
    "puerta corredera madera y vidrio",
    "puerta corredera a medida",
    "puertas correderas chillán",
  ],
  eyebrow: "Puertas correderas",
  h1: "Puertas correderas de madera a medida en Chillán",
  heroParagraph:
    "Fabricamos la hoja corredera a medida. La referencia del taller es una puerta corredera de madera y vidrio para interior: no es un modelo con precio ni un kit con riel. El riel y el resto de herrajes no se asumen incluidos, igual que el marco y la instalación. Para cotizar necesitamos el vano, la comuna y una foto.",
  badges: ["Referencia de interior", "Hoja a medida", "Herrajes se confirman"],
  whatsappButtonLabel: "Cotizar puerta corredera por WhatsApp",
  whatsappProductTitle: "Puertas correderas a medida",
  whatsappLines: [
    "Vengo desde la página de puertas correderas.",
    "Quiero cotizar una puerta corredera de madera.",
    "Puedo enviar alto, ancho, espesor, si es interior, comuna y foto del vano o de la referencia.",
  ],
  heroHighlights: [
    {
      title: "Hoja que corre",
      description: "Se cotiza distinto de una puerta que abre con bisagras. Dilo en el mensaje.",
    },
    {
      title: "Madera y vidrio",
      description: "La referencia publicada es de interior. Tu diseño se confirma con una foto.",
    },
    {
      title: "Riel no incluido",
      description: "Marco, herrajes e instalación no vienen por defecto. Se confirman si los pides.",
    },
  ],
  heroImage: {
    src: "/images/puertas/puerta-corredera-madera-vidrio-interior.webp",
    alt: "Puerta corredera de madera y vidrio para interior",
    width: 956,
    height: 1268,
  },
  sectionTitle: "Qué es la referencia de puerta corredera de madera",
  sectionParagraph:
    "La foto muestra una hoja corredera de madera y vidrio, de interior. Sirve para conversar el diseño, no para elegir un código de producto. Si tu vano, tu vidrio o tu mano de apertura son distintos, partimos de tus medidas. La fábrica de cualquier otra hoja sigue en puertas a medida.",
  featureCards: [
    {
      title: "Corredera de madera de interior en la foto",
      description: "La referencia es interior. Si el vano es de entrada, la madera y el acabado cambian.",
    },
    {
      title: "Sin catálogo de rieles",
      description: "No publicamos un herraje. Si lo necesitas, se confirma en la cotización.",
    },
    {
      title: "Medidas del vano",
      description: "Aunque la hoja corra, igual pedimos alto, ancho y espesor.",
    },
  ],
  stepsTitle: "Cómo cotizar una corredera",
  steps: [
    {
      title: "Di que la hoja corre",
      description: "Así no la cotizamos como una puerta de bisagras. Sirve una foto del vano y del diseño.",
    },
    {
      title: "Mide igual el hueco",
      description: "Ancho en tres alturas, alto a ambos lados y espesor. La guía explica el paso a paso.",
    },
    {
      title: "Confirma hoja y herrajes",
      description: "La propuesta parte por la hoja. Riel, marco e instalación quedan explícitos si los pides.",
    },
  ],
  bottomHighlights: [
    tallerFamiliar,
    {
      title: "Una referencia, no un kit",
      description: "Madera y vidrio en interior. No vendemos la foto como conjunto armado.",
    },
  ],
  extraSections: [
    {
      title: "Corredera, puerta de bisagras y entrada",
      paragraphs: [
        "Si la hoja abre con bisagras dentro de la casa, el encargo está en [puertas interiores](/puertas-interiores): dormitorio, baño, cocina u oficina. Si es la entrada de la calle, va en [puertas de entrada](/puertas-exteriores).",
        "Esta página es solo la hoja que corre. La referencia es interior. Una corredera a la intemperie no está prometida: habría que ver el vano, y el uso exterior cambia madera y acabado.",
        "Medidas habituales y cómo pensar la madera están en la [guía de puertas](/guias/medidas-y-madera-puertas). El material publicado es [madera nativa](/puertas-madera-nativa) seca en cámara. Otros muebles, en [muebles a medida](/muebles-a-medida).",
      ],
    },
    {
      title: "Qué no viene en la foto",
      paragraphs: [
        "La imagen no incluye un precio, un riel ni una instalación. Tampoco fija la especie de la madera. Esos datos salen en la respuesta de WhatsApp, con tu vano y tu comuna.",
        "La cotización general del taller sigue en [puertas a medida](/puertas-a-medida).",
      ],
      bullets: [
        "Alto, ancho y espesor del vano (cm)",
        "Interior, y la pieza donde va",
        "Foto del vano y, si tienes, del diseño",
        "Si necesitas que coticemos el riel, dilo",
      ],
    },
  ],
  faqItems: [
    {
      question: "¿La foto de la corredera es un modelo a la venta?",
      answer:
        "No. Es una referencia de puerta corredera de madera y vidrio para interior. La hoja se fabrica según tu vano y tu referencia. No hay precio publicado en la foto.",
    },
    {
      question: "¿El riel viene incluido?",
      answer:
        "No se asume incluido. Marco, herrajes e instalación se confirman en la respuesta si los necesitas. Escríbelo en el mismo mensaje.",
    },
    {
      question: "¿Hacen una corredera para la entrada de la casa?",
      answer:
        "La referencia es de interior. Una entrada es uso exterior y cambia madera y acabado. No prometemos intemperie sin ver el vano. Si ese es tu caso, parte por puertas de entrada y dinos que la hoja corre.",
    },
    {
      question: "¿Puedo pedir una puerta tipo granero?",
      answer:
        "No publicamos un modelo de granero. Si tienes una foto de referencia, la revisamos con el vano y te decimos si esa hoja es factible. La referencia que sí mostramos es la corredera de interior, de madera y vidrio.",
    },
    {
      question: "¿Qué madera lleva la corredera?",
      answer:
        "Madera nativa seca en cámara. La especie se confirma al cotizar, no sale de la foto. Más detalle en puertas de madera nativa.",
    },
    {
      question: "¿Cómo mido un vano para puerta corredera?",
      answer:
        "Igual que cualquier hoja: ancho arriba, al medio y abajo (usa el menor) y alto a ambos lados, más el espesor. La guía de medidas lo deja por escrito. Esas medidas habituales no reemplazan tu vano.",
    },
    {
      question: "¿Fabrican puerta corredera de madera y vidrio?",
      answer:
        "La referencia del taller es una puerta corredera de madera y vidrio para interior: no es un modelo con precio ni un kit con riel. La hoja se fabrica según tu vano y tu referencia. No hay precio publicado en la foto.",
    },
    {
      question: "¿La puerta corredera viene como kit con riel?",
      answer:
        "No. No vendemos la foto como conjunto armado. El riel y el resto de herrajes no se asumen incluidos, igual que el marco y la instalación. Si necesitas que coticemos el riel, dilo.",
    },
  ],
  relatedLinks: relatedExcept("/puertas-correderas"),
  ctaTitle: "Cotiza tu puerta corredera",
  ctaParagraph:
    "Envía el vano, una foto y la comuna. Te respondemos si la hoja es factible y qué herrajes quedan fuera.",
  ctaBullets: doorCtaBullets,
  schemaType: "Service",
  serviceName: "Puertas correderas de madera a medida",
  serviceType: "Fabricación de puertas correderas de madera",
  stats: [
    tallerFamiliarStat,
    { value: "Chillán", label: "Fabricación propia" },
    { value: "Todo Chile", label: "Cobertura de envío" },
  ],
};

export const puertasMaderaNativaLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-madera-nativa",
  updatedAt: "2026-10-24",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Puertas a medida", path: "/puertas-a-medida" },
    { name: "Madera nativa", path: "/puertas-madera-nativa" },
  ],
  pageTitle: "Puertas de Madera Nativa a Medida | Chillán",
  pageDescription:
    "Puertas de madera nativa seca en cámara, a medida en Chillán. La especie se confirma al cotizar por WhatsApp. Envío a todo Chile.",
  keywords: [
    "puertas de madera nativa",
    "puertas madera nativa chillán",
    "puertas de maderas nobles",
    "puerta madera nativa a medida",
  ],
  eyebrow: "Madera nativa",
  h1: "Puertas de madera nativa a medida en Chillán",
  heroParagraph:
    "Las puertas se fabrican en madera nativa seca en cámara, con maderas nobles del sur de Chile. No publicamos un listado de especies: la especie y el acabado se confirman al cotizar, porque una puerta interior y una de entrada no se proponen igual. La hoja va a la medida de tu vano. Marco, herrajes e instalación no se asumen incluidos.",
  badges: ["Seca en cámara", "Sin listado de especies", "Taller en Chillán"],
  whatsappButtonLabel: "Cotizar puerta de madera nativa",
  whatsappProductTitle: "Puertas de madera nativa",
  whatsappLines: [
    "Vengo desde la página de puertas de madera nativa.",
    "Quiero cotizar una puerta de madera nativa a medida.",
    "Puedo enviar alto, ancho, espesor, si es interior o exterior, comuna y foto del vano.",
  ],
  heroHighlights: [
    {
      title: "Nativa y seca en cámara",
      description: "Así está escrito el material de las puertas. Busca estabilidad y durabilidad.",
    },
    {
      title: "Especie al cotizar",
      description: "No hay catálogo de maderas en esta página. Interior o exterior cambia la elección.",
    },
    {
      title: "Hoja a medida",
      description: "La madera se trabaja al vano. No vendemos una medida de stock.",
    },
  ],
  heroImage: {
    src: "/images/puertas/puerta-doble-madera-muro-piedra.webp",
    alt: "Puerta doble de madera con vidrios instalada en un muro de piedra",
    width: 720,
    height: 1280,
    caption:
      "Las referencias del taller muestran hojas dobles, y el vano real manda. La especie se confirma al cotizar, no sale de la foto.",
  },
  sectionTitle: "Qué madera publicamos para una puerta",
  sectionParagraph:
    "En puertas, el material publicado es madera nativa seca en cámara: maderas nobles del sur de Chile, seleccionadas. El secado en cámara es el dato que damos para estabilidad. El nombre de la especie no está en la ficha: sale en la propuesta, cuando vemos si la hoja es interior o exterior.",
  featureCards: [
    {
      title: "Sur de Chile",
      description: "Maderas nobles del sur, nativas. No copiamos la madera de una silla o de una cubierta.",
    },
    {
      title: "Según el uso",
      description: "Dormitorio, baño, cocina o entrada no piden lo mismo. El uso va en el mensaje.",
    },
    {
      title: "Acabado en la respuesta",
      description: "No publicamos un acabado único. Se confirma junto con la madera.",
    },
  ],
  stepsTitle: "Cómo pedir la madera de tu puerta",
  steps: [
    {
      title: "Di interior o exterior",
      description: "Ese dato cambia madera y acabado. La entrada principal cuenta como exterior.",
    },
    {
      title: "Manda el vano",
      description: "Alto, ancho, espesor y una foto. Sin vano no hay especie que proponer en serio.",
    },
    {
      title: "Confirma en la cotización",
      description: "Ahí nombramos la madera, la terminación, el precio y el plazo.",
    },
  ],
  bottomHighlights: [
    tallerFamiliar,
    {
      title: "Sin especie por catálogo",
      description: "Si no está escrita en la respuesta de WhatsApp, no está prometida.",
    },
  ],
  extraSections: [
    {
      title: "Qué no está en el listado de puertas",
      paragraphs: [
        "No publicamos pino para puertas. En otras piezas del taller sí se nombra pino premium, por ejemplo en cubiertas, y lenga en algunas sillas. Eso no se traslada solo a la hoja de una puerta.",
        "Tampoco usamos en esta página la frase «puerta de madera maciza». Los muebles de madera maciza están descritos en [muebles a medida](/muebles-a-medida). Para la puerta, lo escrito es madera nativa seca en cámara.",
        "El uso de la hoja está en [puertas interiores](/puertas-interiores), [puertas de entrada](/puertas-exteriores) o [puertas correderas](/puertas-correderas). Cómo comparar medidas y pensar la madera, en la [guía](/guias/medidas-y-madera-puertas).",
      ],
    },
    {
      title: "Por qué pedimos el uso antes de nombrar la madera",
      paragraphs: [
        "Una puerta de dormitorio y una de entrada no viven el mismo clima. El baño y la cocina tienen más humedad que un pasillo. Por eso no adelantamos una especie ni un acabado en la página.",
        "No prometemos resistencia a la intemperie sin ver el vano. La fábrica general sigue en [puertas a medida](/puertas-a-medida).",
      ],
      bullets: [
        "Interior o exterior",
        "Pieza: dormitorio, baño, cocina, oficina o entrada",
        "Alto, ancho y espesor (cm)",
        "Comuna y foto del vano",
      ],
    },
  ],
  faqItems: [
    {
      question: "¿De qué madera son las puertas?",
      answer:
        "De madera nativa seca en cámara. Trabajamos maderas nobles del sur de Chile, seleccionadas. La especie de tu hoja se confirma al cotizar.",
    },
    {
      question: "¿Hacen puertas de pino?",
      answer:
        "En puertas no publicamos pino. El pino premium aparece en otras piezas, como cubiertas, no como madera de esta página. Para la hoja proponemos madera nativa y confirmamos la especie por WhatsApp.",
    },
    {
      question: "¿La puerta es de madera maciza?",
      answer:
        "En puertas no usamos esa frase. Publicamos madera nativa seca en cámara, sin listado de especies. Los muebles descritos como madera maciza están en muebles a medida.",
    },
    {
      question: "¿La misma madera sirve para interior y exterior?",
      answer:
        "No se asume. Interior o exterior cambia madera y acabado. La entrada principal es exterior. No prometemos intemperie sin ver el vano.",
    },
    {
      question: "¿Por qué dicen seca en cámara?",
      answer:
        "Porque así trabajamos la madera de las puertas: seleccionada y seca en cámara, para mayor durabilidad y estabilidad. No publicamos un porcentaje de humedad.",
    },
    {
      question: "¿Dónde veo medidas antes de elegir madera?",
      answer:
        "En la guía de medidas y madera para puertas. La tabla es una referencia habitual en Chile, no el catálogo del taller. La hoja se fabrica a tu vano.",
    },
  ],
  relatedLinks: relatedExcept("/puertas-madera-nativa"),
  ctaTitle: "Cotiza la madera de tu puerta",
  ctaParagraph:
    "Cuéntanos si es interior o exterior y manda el vano. Te proponemos madera y terminación por WhatsApp.",
  ctaBullets: doorCtaBullets,
  schemaType: "Service",
  serviceName: "Puertas de madera nativa a medida",
  serviceType: "Fabricación de puertas de madera nativa",
  stats: [
    tallerFamiliarStat,
    { value: "Chillán", label: "Fabricación propia" },
    { value: "Todo Chile", label: "Cobertura de envío" },
  ],
};

export const doorLandingPaths = [
  puertasInterioresLandingConfig.canonicalPath,
  puertasExterioresLandingConfig.canonicalPath,
  puertasCorrederasLandingConfig.canonicalPath,
  puertasMaderaNativaLandingConfig.canonicalPath,
  "/puertas-de-madera-con-vidrio",
  "/puertas-para-locales",
] as const;

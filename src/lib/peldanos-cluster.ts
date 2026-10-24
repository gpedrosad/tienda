import type { LandingImage, LandingRelatedLink, ServiceLandingConfig } from "@/lib/service-landings";

/**
 * Clúster de peldaños. Alcance del taller: huellas de madera a medida.
 * No incluye estructura, pasamanos, contrahuellas ni montaje, salvo confirmación al cotizar.
 * No hay línea de pasamanos: no se publica una URL para eso.
 */

const peldanosParent = { name: "Peldaños a medida", path: "/peldanos-a-medida" } as const;

const gallery: LandingImage[] = [
  {
    src: "/images/peldanos/peldanos-flotantes-instalados.webp",
    alt: "Peldaños flotantes de madera instalados sobre estructura metálica",
    width: 1080,
    height: 600,
  },
  {
    src: "/images/peldanos/peldanos-escalera-vidrio-instalada.webp",
    alt: "Escalera con huellas de madera barnizada y baranda de vidrio en obra",
    width: 878,
    height: 1480,
  },
  {
    src: "/images/peldanos/peldanos-gruesos-madera-maciza.webp",
    alt: "Peldaños gruesos de madera maciza apilados en el taller",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/peldanos/peldanos-madera-a-medida-taller.webp",
    alt: "Peldaños de madera clara a medida recién cepillados en el taller",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/peldanos/peldanos-madera-cruda-taller.webp",
    alt: "Huellas de madera cruda listas para terminar en el taller",
    width: 738,
    height: 978,
  },
];

const clusterLinks: LandingRelatedLink[] = [
  {
    href: "/peldanos-a-medida",
    title: "Peldaños a medida",
    description: "Cotización general de huellas de madera, con despacho a todo Chile.",
  },
  {
    href: "/peldanos-madera-chillan",
    title: "Peldaños a medida en Chillán",
    description: "Mismo trabajo, coordinado desde el taller en Chillán y Ñuble.",
  },
  {
    href: "/peldanos-escalera-concreto",
    title: "Peldaños para escalera de concreto",
    description: "Huellas de madera para revestir una escalera de hormigón existente.",
  },
  {
    href: "/escaleras-de-madera",
    title: "Escaleras de madera",
    description: "Qué pieza de madera fabricamos cuando la escalera es de madera.",
  },
  {
    href: "/peldanos-flotantes",
    title: "Peldaños flotantes",
    description: "Huella de madera para escalera abierta. La estructura metálica no está incluida.",
  },
  {
    href: "/guias/medidas-peldanos-escalera",
    title: "Medidas de huella y contrahuella",
    description: "Referencia general de confort para anotar las medidas del pedido.",
  },
  {
    href: "/guias/elegir-madera-peldanos",
    title: "Cómo elegir madera para peldaños",
    description: "Tránsito, espesor y terminación antes de confirmar la especie.",
  },
  {
    href: "/muebles-a-medida",
    title: "Muebles a medida",
    description: "Cubiertas, puertas, peldaños y otros encargos del mismo taller.",
  },
];

export function peldanosRelatedLinks(href: string) {
  return clusterLinks.filter((link) => link.href !== href);
}

function linksExcept(href: string) {
  return peldanosRelatedLinks(href);
}

export const peldanosChillanLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/peldanos-madera-chillan",
  updatedAt: "2026-10-16",
  breadcrumbLabel: "Peldaños en Chillán",
  breadcrumbParent: peldanosParent,
  pageTitle: "Peldaños de Madera a Medida en Chillán | Idea Madera",
  pageDescription:
    "Fabricamos peldaños de madera a medida en Chillán. Cotiza huellas por WhatsApp con largo, ancho, espesor y cantidad. Despacho en Ñuble y a todo Chile.",
  keywords: [
    "peldaños de madera a medida chillán",
    "peldaños a medida chillán",
    "peldaños de madera chillán",
    "huellas de madera chillán",
    "taller de peldaños chillán",
  ],
  eyebrow: "Taller de peldaños en Chillán",
  h1: "Peldaños de madera a medida en Chillán",
  heroParagraph:
    "En Chillán fabricamos las huellas de madera de tu escalera, cortadas al largo, ancho y espesor que nos envías. El taller está en Ñuble: si estás en la zona, lo dices al cotizar para coordinar el despacho local. Si estás en otra región, el mismo pedido sale a todo Chile. La estructura de la escalera y el montaje no van incluidos, salvo que lo dejemos por escrito en la cotización.",
  badges: ["Taller en Chillán", "Huellas a medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar peldaños en Chillán",
  whatsappProductTitle: "Peldaños a medida en Chillán",
  whatsappLines: [
    "Vengo desde la página de peldaños de madera a medida en Chillán.",
    "Quiero cotizar huellas para una escalera.",
    "Puedo enviar cantidad, largo, ancho, espesor, comuna y foto o plano.",
  ],
  heroHighlights: [
    { title: "Fabricación en Chillán", description: "Las huellas salen del taller en Ñuble, no de un catálogo." },
    { title: "Medidas de tu escalera", description: "Cada pedido se corta con el largo, el fondo y el espesor que indicas." },
    { title: "Ñuble y el resto de Chile", description: "Despacho local o envío según la comuna que nos escribas." },
  ],
  heroImage: {
    src: "/images/peldanos/peldanos-madera-a-medida-taller.webp",
    alt: "Peldaños de madera clara a medida recién cepillados en el taller de Chillán",
    width: 1200,
    height: 1600,
  },
  stats: [
    { value: "Chillán", label: "Taller propio" },
    { value: "Ñuble", label: "Coordinación local" },
    { value: "Chile", label: "Despacho" },
  ],
  galleryTitle: "Huellas hechas en el taller",
  galleryIntro:
    "Fotos reales de peldaños cepillados y de huellas ya colocadas en obra. El montaje que se ve en algunas imágenes no forma parte del pedido, salvo que lo confirmemos al cotizar.",
  gallery,
  sectionTitle: "Qué encargas cuando escribes desde Chillán",
  sectionParagraph:
    "El producto es la huella de madera: la pieza horizontal donde se pisa. No es una escalera armada ni un pasamanos. Si tu búsqueda es la cotización nacional, sin el foco del taller, esa página es peldaños a medida. Aquí el acento es que la fabricación está en Chillán.",
  featureCards: [
    {
      title: "Coordinación en la zona",
      description:
        "Si la obra está en Chillán o en otra comuna de Ñuble, indícalo en el mensaje. Así vemos el despacho local junto con las medidas.",
    },
    {
      title: "El mismo corte a medida",
      description:
        "Largo del peldaño (el ancho de la escalera), fondo de la huella, espesor y cantidad. Con foto o plano el pedido queda más claro.",
    },
    {
      title: "Madera que se confirma",
      description:
        "En el taller trabajamos lenga austral y pino premium, secos en cámara. Para peldaños la especie y la terminación se cierran al cotizar.",
    },
  ],
  extraSections: [
    {
      title: "Cómo pedir peldaños desde Ñuble",
      paragraphs: [
        "La conversación parte por WhatsApp, igual que el resto de los encargos del taller. No hace falta pasar por una tienda de vitrina: con las medidas y una foto de la escalera podemos armar la propuesta.",
        "Escribe la comuna. Si es Chillán o estás en Ñuble, lo usamos para el despacho. Si el proyecto está en otra región, el origen sigue siendo este taller y el envío se coordina al cotizar.",
      ],
      bullets: [
        "Cantidad de huellas",
        "Largo, fondo y espesor en centímetros",
        "Comuna de despacho",
        "Foto de la escalera o un plano simple",
        "Si también necesitas contrahuellas, dilo en el mismo mensaje: no van incluidas de antemano",
      ],
    },
    {
      title: "Qué queda fuera del encargo",
      paragraphs: [
        "Fabricamos la madera de la pisada. La estructura —losa, metal o madera de soporte—, las barandas y el montaje en la obra no se asumen. Si quieres evaluar alguna de esas partes, pregúntalo al cotizar; solo cuenta lo que quede confirmado en la respuesta.",
        "Para revestir una escalera de concreto que ya está hecha, o para entender una escalera de madera completa, hay páginas aparte. Las medidas de confort (huella y contrahuella) están en la guía, como referencia general y no como una medida única del taller.",
      ],
    },
  ],
  stepsTitle: "Cómo cotizar con el taller de Chillán",
  steps: [
    {
      title: "Manda las medidas",
      description: "Cantidad, largo, fondo, espesor y comuna. Una foto de la escalera acorta las dudas.",
    },
    {
      title: "Cerramos madera y acabado",
      description: "Te orientamos entre las maderas del taller y la terminación, según el tránsito y la referencia que tengas.",
    },
    {
      title: "Recibes la propuesta",
      description: "Por WhatsApp vas a ver el detalle del pedido y el plazo estimado. El despacho depende de la comuna.",
    },
  ],
  bottomHighlights: [
    {
      title: "Hecho en Chillán",
      description: "Las huellas se fabrican en el taller de Idea Madera, en Chillán, y salen directo al despacho que coordinemos.",
    },
    {
      title: "También al resto del país",
      description: "Estar en esta página no limita el envío. Si la obra no está en Ñuble, igual cotizamos el despacho.",
    },
  ],
  faqItems: [
    {
      question: "¿Los peldaños se fabrican en Chillán?",
      answer:
        "Sí. El taller de Idea Madera está en Chillán, región de Ñuble. Esta página es para encargar huellas de madera a medida fabricadas ahí.",
    },
    {
      question: "¿En qué se diferencia de la página de peldaños a medida?",
      answer:
        "El producto es el mismo: huellas de madera cortadas a tu medida. Esta página está escrita para quien busca el taller en Chillán o coordina una obra en Ñuble. La otra es la cotización general para todo Chile.",
    },
    {
      question: "¿Solo atienden proyectos en Chillán?",
      answer:
        "No. Fabricamos en Chillán y despachamos a todo Chile. Si estás en Ñuble, indícalo para ver el despacho local. Si estás en otra región, el envío se confirma al cotizar.",
    },
    {
      question: "¿Qué madera usan para los peldaños?",
      answer:
        "En el taller trabajamos lenga austral y pino premium, secos en cámara. Para peldaños la especie, el espesor y la terminación se confirman al cotizar, según el tránsito y el estilo. No hay una sola madera publicada para escaleras.",
    },
    {
      question: "¿La instalación en Chillán está incluida?",
      answer:
        "No. El encargo es la fabricación de las huellas. El montaje en obra no se asume, ni en Chillán ni en otra comuna, salvo que lo confirmemos al cotizar.",
    },
    {
      question: "¿Hacen la escalera completa o el pasamanos?",
      answer:
        "No como parte de este pedido. Hacemos la huella de madera. Estructura, contrahuellas, barandas y pasamanos no se asumen incluidos.",
    },
  ],
  relatedLinks: linksExcept("/peldanos-madera-chillan"),
  ctaTitle: "Cotiza tus peldaños con el taller de Chillán",
  ctaParagraph:
    "Escríbenos por WhatsApp con las medidas, la comuna y una foto de la escalera. Mientras más claro llegue el pedido, más precisa es la respuesta.",
  ctaBullets: [
    "Taller en Chillán.",
    "Huellas a medida para empresas y particulares.",
    "Despacho en Ñuble y al resto de Chile.",
  ],
  schemaType: "Service",
  serviceName: "Peldaños de madera a medida en Chillán",
  serviceType: "Fabricación de huellas de madera a medida",
  areaServed: [
    { "@type": "City", name: "Chillán" },
    { "@type": "AdministrativeArea", name: "Ñuble" },
    { "@type": "Country", name: "Chile" },
  ],
};

export const peldanosConcretoLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/peldanos-escalera-concreto",
  updatedAt: "2026-10-16",
  breadcrumbLabel: "Escalera de concreto",
  breadcrumbParent: peldanosParent,
  pageTitle: "Peldaños para Escalera de Concreto | Idea Madera",
  pageDescription:
    "Huellas de madera a medida para revestir una escalera de concreto u hormigón. Cotiza por WhatsApp. El montaje no va incluido salvo que lo confirmemos.",
  keywords: [
    "peldaños para escalera de concreto",
    "peldaños para escalera de hormigón",
    "revestir escalera de concreto",
    "huellas de madera para escalera de hormigón",
    "peldaños de madera sobre concreto",
  ],
  eyebrow: "Huellas para una escalera que ya existe",
  h1: "Peldaños de madera para escalera de concreto",
  heroParagraph:
    "Si la escalera de concreto u hormigón ya está construida, fabricamos las huellas de madera que revisten la pisada. La losa sigue siendo la estructura: nosotros cortamos la pieza de madera al largo, al fondo y al espesor de tu escalera. No reparamos el hormigón y no asumimos el montaje, salvo que lo confirmemos al cotizar.",
  badges: ["Para escalera existente", "Huellas a medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar huellas para concreto",
  whatsappProductTitle: "Peldaños para escalera de concreto",
  whatsappLines: [
    "Vengo desde la página de peldaños para escalera de concreto.",
    "Quiero huellas de madera para revestir una escalera de hormigón.",
    "Puedo enviar cantidad, largo, fondo, espesor, comuna y fotos de la escalera.",
  ],
  heroHighlights: [
    { title: "La estructura se mantiene", description: "Revestir es cubrir la pisada con madera, no rehacer el hormigón." },
    { title: "Cada peldaño puede variar", description: "En obra el concreto rara vez sale idéntico: mide más de un escalón." },
    { title: "Espesor a definir", description: "Tú indicas el espesor. Una pieza más gruesa cambia la altura respecto del descanso." },
  ],
  heroImage: {
    src: "/images/peldanos/peldanos-gruesos-madera-maciza.webp",
    alt: "Peldaños gruesos de madera maciza listos para una escalera",
    width: 1200,
    height: 1600,
  },
  galleryTitle: "Referencias de huellas, no de obra de hormigón",
  galleryIntro:
    "Estas fotos muestran peldaños de madera del taller y huellas ya colocadas en otras escaleras. No son un revestimiento de concreto prometido: el encargo es la pieza de madera, y el montaje se confirma aparte.",
  gallery,
  sectionTitle: "Qué significa revestir la escalera con madera",
  sectionParagraph:
    "La escalera de concreto permanece. Encima de la pisada va una huella de madera a medida, para cambiar el uso y la terminación sin encargar una escalera nueva. En Chile se dice hormigón o concreto: en esta página es la misma estructura existente. Si todavía estás eligiendo si la escalera será de madera, mira escaleras de madera. La cotización general de huellas está en peldaños a medida.",
  featureCards: [
    {
      title: "Huella sobre la pisada actual",
      description:
        "Cortamos la madera al ancho de tu escalera y al fondo que quieres pisar. No demolimos ni nivelamos el hormigón.",
    },
    {
      title: "Medidas que no siempre calzan",
      description:
        "Anota varios peldaños. Si el fondo o el largo cambian de un escalón a otro, envía cada medida en lugar de un solo promedio.",
    },
    {
      title: "Contrahuella, solo si la pides",
      description:
        "La pieza vertical no viene con las huellas. Si quieres cerrar el frente del escalón, escríbelo al cotizar.",
    },
  ],
  extraSections: [
    {
      title: "Qué medir en la escalera de hormigón",
      paragraphs: [
        "El largo del peldaño es el ancho de la escalera, de lado a lado. El ancho o fondo es la profundidad de la pisada, desde la punta hasta el fondo del escalón. El espesor es el grueso de la tabla de madera, y lo defines tú: no publicamos un espesor único.",
        "Una huella gruesa suma altura al primer y al último escalón respecto del piso o del descanso. Si la escalera llega a una puerta o a un pasillo justo, cuéntalo en el mensaje para que el espesor no te sorprenda en obra. Eso lo resuelve quien instala; nosotros cortamos la medida que nos confirmas.",
      ],
      bullets: [
        "Cantidad de huellas, no de alturas",
        "Largo de cada tramo (ancho de la escalera)",
        "Fondo de la pisada, y si cambia entre peldaños",
        "Espesor de madera que necesitas",
        "Foto de costado y foto desde arriba",
        "Comuna de despacho",
      ],
    },
    {
      title: "Lo que no hacemos sobre el concreto",
      paragraphs: [
        "No reparamos grietas, no vaciamos hormigón y no prometemos dejar la escalera nivelada. Si los peldaños están muy disparejos, la madera copia la medida que nos pases: conviene que alguien en obra revise el soporte antes de instalar.",
        "Las fotos de peldaños flotantes del taller están sobre estructura metálica, no sobre losa. Sirven para ver la pieza de madera. La fijación —cómo se ancla la huella al concreto— no está descrita en este encargo y no se asume incluida.",
      ],
    },
  ],
  stepsTitle: "Cómo cotizar el revestimiento de madera",
  steps: [
    {
      title: "Fotos de la escalera actual",
      description: "Una de frente, una de costado y, si puedes, el encuentro con el piso de arriba y el de abajo.",
    },
    {
      title: "Medidas por peldaño",
      description: "Largo, fondo y la cantidad. Marca los escalones que no sean iguales al resto.",
    },
    {
      title: "Propuesta de las huellas",
      description: "Te respondemos por WhatsApp con la madera, la terminación y el plazo. El montaje queda fuera salvo acuerdo.",
    },
  ],
  bottomHighlights: [
    {
      title: "Interior, salvo que nos lo digas",
      description:
        "Las referencias del taller son escaleras de interior. Si la tuya queda a la intemperie, dilo al cotizar: no prometemos ese uso sin ver el proyecto.",
    },
    {
      title: "Despacho a todo Chile",
      description: "Fabricamos en Chillán y coordinamos el envío según tu comuna, incluyendo obras fuera de Ñuble.",
    },
  ],
  faqItems: [
    {
      question: "¿Revestir la escalera es cambiar el concreto?",
      answer:
        "No. Revestir, en esta página, es fabricar huellas de madera para cubrir la pisada de una escalera de concreto u hormigón que ya existe. La estructura sigue siendo la losa.",
    },
    {
      question: "¿Sirve si los peldaños de hormigón no son iguales?",
      answer:
        "Sí, si nos envías la medida de los que cambian. Cortamos cada huella según el dato que cotizas. No nivelamos el concreto.",
    },
    {
      question: "¿El espesor de la madera cambia la altura de la escalera?",
      answer:
        "Sí. La tabla se suma sobre la pisada actual, así que el primer y el último peldaño quedan distintos respecto del piso o del descanso. Indica el espesor que necesitas y avisa si hay una puerta cerca.",
    },
    {
      question: "¿Instalan las huellas sobre el hormigón?",
      answer:
        "No de forma automática. Fabricamos y despachamos las piezas. El montaje se confirma solo si lo pides al cotizar y queda aceptado en la respuesta.",
    },
    {
      question: "¿La contrahuella viene incluida?",
      answer:
        "No. Esta página es de huellas, la parte horizontal. Si también quieres la pieza vertical, escríbelo junto con las medidas.",
    },
    {
      question: "¿Puedo usar estas huellas en una escalera exterior?",
      answer:
        "Las referencias que mostramos son de interior. Si el proyecto queda al sol o a la lluvia, dínoslo al cotizar. No prometemos un comportamiento a la intemperie sin revisar el uso.",
    },
  ],
  relatedLinks: linksExcept("/peldanos-escalera-concreto"),
  ctaTitle: "Cotiza las huellas para tu escalera de concreto",
  ctaParagraph:
    "Manda por WhatsApp las fotos, la cantidad y las medidas de la escalera de hormigón. Con eso vemos madera, espesor y despacho.",
  ctaBullets: [
    "Huellas a la medida de la escalera existente.",
    "Sin reparar el hormigón.",
    "Envíos a todo Chile.",
  ],
  schemaType: "Service",
  serviceName: "Peldaños de madera para escalera de concreto",
  serviceType: "Fabricación de huellas de madera para revestir escaleras",
};

export const escalerasMaderaLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/escaleras-de-madera",
  updatedAt: "2026-10-24",
  breadcrumbLabel: "Escaleras de madera",
  breadcrumbParent: peldanosParent,
  pageTitle: "Escaleras de Madera: Huellas a Medida | Chile",
  pageDescription:
    "Fabricamos las huellas de madera de tu escalera, no la estructura ni el montaje. Cotiza peldaños a medida por WhatsApp. Envío a todo Chile.",
  keywords: [
    "escaleras de madera",
    "escaleras de madera a medida",
    "huellas para escalera de madera",
    "peldaños para escalera de madera",
    "escalera de madera a medida chile",
  ],
  eyebrow: "La parte de madera de la escalera",
  h1: "Escaleras de madera: fabricamos las huellas",
  heroParagraph:
    "Una escalera de madera, en este taller, significa las huellas: la pieza maciza donde se apoya el pie. No vendemos la escalera armada, ni las zancas, ni el pasamanos. Si ya tienes claro el corte, la cotización directa está en peldaños a medida. Aquí explicamos qué entra cuando buscas una escalera de madera y qué tienes que encargar en otro lado.",
  badges: ["Huellas de madera maciza", "A medida", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar huellas de la escalera",
  whatsappProductTitle: "Huellas para escalera de madera",
  whatsappLines: [
    "Vengo desde la página de escaleras de madera.",
    "Quiero cotizar las huellas de madera de una escalera.",
    "Puedo enviar cantidad, largo, fondo, espesor, tipo de escalera, comuna y foto o plano.",
  ],
  heroHighlights: [
    { title: "La pisada, en madera", description: "Fabricamos la huella. El resto de la escalera no viene en el pedido." },
    { title: "Recta o con descanso", description: "Cada tramo puede medir distinto. El descanso no se asume incluido." },
    { title: "Flotante, solo la tabla", description: "Hay referencias sobre metal. Esa estructura no la fabricamos nosotros." },
  ],
  heroImage: {
    src: "/images/peldanos/peldanos-escalera-barnizada-vidrio.webp",
    alt: "Escalera con peldaños de madera barnizada y baranda de vidrio",
    width: 738,
    height: 1210,
  },
  galleryTitle: "Escaleras donde la pisada es de madera",
  galleryIntro:
    "La baranda de vidrio y la estructura metálica de los peldaños flotantes se ven en las fotos y no forman parte del encargo. Lo que fabricamos es la huella de madera.",
  gallery,
  sectionTitle: "Qué pieza corresponde a una escalera de madera",
  sectionParagraph:
    "La huella es la tabla horizontal. La contrahuella es la pieza vertical entre un peldaño y el siguiente, y no se asume incluida. La estructura —madera de soporte, metal o losa— la resuelve la obra. Si la escalera ya es de hormigón y solo quieres cubrirla, ese caso está en [peldaños para escalera de concreto](/peldanos-escalera-concreto). Si ya tienes claro el corte, la cotización directa está en [peldaños a medida](/peldanos-a-medida). [La guía de medidas](/guias/medidas-peldanos-escalera) explica la huella y la contrahuella como referencia general.",
  featureCards: [
    {
      title: "Escalera recta",
      description:
        "Un tramo con huellas repetidas. Si todas miden igual, basta una medida de largo y de fondo más la cantidad.",
    },
    {
      title: "Escalera con descanso",
      description:
        "Los tramos pueden pedir huellas de otro largo. Indícalo al cotizar. El piso del descanso no se fabrica salvo que lo pidas y lo confirmemos.",
    },
    {
      title: "Peldaños flotantes",
      description:
        "En el taller hay huellas gruesas usadas sobre estructura metálica. Nosotros cortamos la madera; el metal y el anclaje no están incluidos.",
    },
  ],
  extraSections: [
    {
      title: "Qué preparar antes de cotizar",
      paragraphs: [
        "Dinos el tipo de escalera (recta, con descanso o peldaños que van separados), la cantidad de huellas, el largo, el fondo y el espesor. Si tienes plano, mejor que una sola cifra redonda.",
        "La terminación puede ser natural, oscura o parecida a una referencia que nos mandes. La especie —lenga austral o pino premium, secos en cámara— se confirma al cotizar, no en esta página. [La guía de madera](/guias/elegir-madera-peldanos) ordena esa decisión y [la guía de medidas](/guias/medidas-peldanos-escalera) explica la huella y la contrahuella como referencia general.",
      ],
      bullets: [
        "Tipo de escalera y cantidad de huellas",
        "Largo (ancho de la escalera) y fondo de pisada",
        "Espesor de la tabla",
        "Si quieres contrahuellas, además de las huellas",
        "Comuna y una foto o plano",
      ],
    },
    {
      title: "Pasamanos, barandas y montaje",
      paragraphs: [
        "No tenemos una línea de pasamanos ni de barandas. En las fotos aparece una baranda de vidrio como parte de una obra terminada; no es un producto de este taller. Si necesitas evaluar una baranda, pregúntalo al cotizar: no queda incluida y no la prometemos de antemano.",
        "El montaje en obra sigue la misma regla. Fabricamos y despachamos desde Chillán a todo Chile. Quien instala la escalera es parte de la obra, salvo un acuerdo explícito en la cotización.",
      ],
    },
  ],
  stepsTitle: "Cómo encargar las huellas de tu escalera",
  steps: [
    {
      title: "Cuéntanos la escalera",
      description: "Recta, con descanso o flotante, más una foto o un esquema con medidas.",
    },
    {
      title: "Definimos la huella",
      description: "Madera, espesor y terminación según el tránsito y la referencia. Sin estructura ni pasamanos.",
    },
    {
      title: "Cotización por WhatsApp",
      description: "Te enviamos la propuesta de las piezas y el despacho según comuna. El plazo depende de la cantidad.",
    },
  ],
  bottomHighlights: [
    {
      title: "No es una escalera comprada lista",
      description:
        "No publicamos un modelo armado ni un kit de escalera. Cada huella sale a la medida del proyecto.",
    },
    {
      title: "El taller está en Chillán",
      description: "La fabricación es en Chillán. Si la obra es local, también puedes ver peldaños de madera a medida en Chillán.",
    },
  ],
  faqItems: [
    {
      question: "¿Venden la escalera de madera armada?",
      answer:
        "No. Fabricamos las huellas de madera a medida. La estructura, el armado y el montaje no forman parte del pedido, salvo que algo de eso quede confirmado por escrito al cotizar.",
    },
    {
      question: "¿Qué diferencia hay entre peldaño, huella y contrahuella?",
      answer:
        "El peldaño es el escalón donde pisas. La huella es la superficie horizontal y es lo que fabricamos aquí. La contrahuella es la cara vertical y no se asume incluida.",
    },
    {
      question: "¿Qué medida tiene una huella de escalera?",
      answer:
        "Como referencia general de confort, la huella queda cerca de 25 a 30 cm, la contrahuella cerca de 15 a 18 cm, y 2 × contrahuella + huella cerca de 60 a 64 cm. No es una norma ni una medida del taller: la huella se corta a la medida que nos confirmas. El detalle está en la [guía de medidas de peldaños](/guias/medidas-peldanos-escalera). Para cotizar, entra a [peldaños a medida](/peldanos-a-medida).",
    },
    {
      question: "¿Hacen peldaños flotantes?",
      answer:
        "Fabricamos la huella de madera, también en espesores gruesos como los de las fotos. La estructura metálica que los separa del muro no está incluida. El encargo está en [peldaños flotantes](/peldanos-flotantes).",
    },
    {
      question: "¿Y si la escalera tiene descanso?",
      answer:
        "Indícalo. Las huellas de cada tramo pueden medir distinto y las cotizamos con esas medidas. El tablero del descanso no se asume incluido.",
    },
    {
      question: "¿Hacen pasamanos o barandas de madera?",
      answer:
        "No es una línea de producto. Pasamanos y barandas no se asumen incluidos. Si los necesitas, consúltalo al cotizar: solo vale lo que confirmemos en la respuesta.",
    },
    {
      question: "¿Envían las huellas a todo Chile?",
      answer:
        "Sí. Fabricamos en Chillán y coordinamos el despacho según la comuna al momento de cotizar.",
    },
  ],
  relatedLinks: linksExcept("/escaleras-de-madera"),
  ctaTitle: "Cotiza las huellas de tu escalera de madera",
  ctaParagraph:
    "Escríbenos por WhatsApp con el tipo de escalera, las medidas y una foto. Te respondemos sobre las huellas, no sobre una escalera armada.",
  ctaBullets: [
    "Solo las huellas, salvo acuerdo distinto.",
    "Empresas y particulares.",
    "Envíos a todo Chile.",
  ],
  schemaType: "Service",
  serviceName: "Huellas de madera para escaleras de madera",
  serviceType: "Fabricación de peldaños de madera a medida",
};

export const peldanosClusterPaths = [
  peldanosChillanLandingConfig.canonicalPath,
  peldanosConcretoLandingConfig.canonicalPath,
  escalerasMaderaLandingConfig.canonicalPath,
  "/peldanos-flotantes",
] as const;

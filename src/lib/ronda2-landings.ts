import type { ServiceLandingConfig } from "@/lib/service-landings";
import { doorRelatedLinks } from "@/lib/door-landings";
import { peldanosRelatedLinks } from "@/lib/peldanos-cluster";

const quoteBullets = [
  "Atención para empresas y particulares.",
  "Envíos a todo Chile.",
  "Respuesta rápida para cotización.",
];

export const puertasVidrioLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-de-madera-con-vidrio",
  updatedAt: "2026-10-26",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Puertas a medida", path: "/puertas-a-medida" },
    { name: "Puertas con vidrio", path: "/puertas-de-madera-con-vidrio" },
  ],
  pageTitle: "Puertas de Madera con Vidrio a Medida | Chile",
  pageDescription:
    "Puertas de madera con vidrio a medida en Chillán. Cotiza la hoja por WhatsApp con el vano y una foto. El vidrio se confirma. Envío a Chile.",
  keywords: [
    "puertas de madera con vidrio",
    "puertas vidriadas de madera",
    "puerta de madera con vidrios a medida",
    "hoja de puerta con vidrio",
    "puertas con vidrio chillán",
  ],
  eyebrow: "Puertas con vidrio",
  h1: "Puertas de madera con vidrio a medida",
  heroParagraph:
    "Fabricamos puertas de madera con vidrio a medida: la hoja, cuando el diseño lleva paños, luces o una repartición que nos muestres en una foto. No hay un modelo publicado ni un tipo de vidrio en catálogo. Interior o entrada cambia la madera y el acabado. Marco, herrajes, vidrio e instalación no se asumen incluidos: se confirman si los pides al cotizar.",
  badges: ["Hoja a medida", "Vidrio según referencia", "Taller en Chillán"],
  whatsappButtonLabel: "Cotizar puerta con vidrio",
  whatsappProductTitle: "Puertas de madera con vidrio",
  whatsappLines: [
    "Vengo desde la página de puertas de madera con vidrio.",
    "Quiero cotizar una hoja de madera con vidrio.",
    "Puedo enviar alto, ancho, espesor, si es interior o de entrada, comuna y una foto del diseño.",
  ],
  heroHighlights: [
    {
      title: "La foto manda el diseño",
      description: "Lisa, con un paño o con varios. Partimos de tu referencia, no de un código.",
    },
    {
      title: "El vidrio se confirma",
      description: "No publicamos espesor, tipo ni marca. Queda en la respuesta de la cotización.",
    },
    {
      title: "Hoja, no la obra",
      description: "Marco, herrajes e instalación no vienen por defecto.",
    },
  ],
  heroImage: {
    src: "/images/puertas/puerta-doble-madera-vidrios-fachada.webp",
    alt: "Puerta doble de madera con vidrios en la fachada de una casa",
    width: 1200,
    height: 1600,
  },
  galleryTitle: "Puertas de madera con vidrio: referencias del taller, no un catálogo",
  galleryIntro:
    "Las fotos son obras del taller. Sirven para conversar la repartición del vidrio. No tienen precio ni un vidrio asociado.",
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
  sectionTitle: "Cuándo pedir la hoja con vidrio",
  sectionParagraph:
    "El vidrio entra cuando quieres luz en un pasillo, en la entrada o en una oficina, o cuando la referencia que te gusta ya lo trae. Esta página es para la hoja que abre con bisagras. Si la hoja corre, el caso está en puertas correderas: esa referencia también lleva vidrio, y el riel no se asume incluido.",
  featureCards: [
    {
      title: "Entrada con vidrio",
      description:
        "Las referencias de fachada y de muro de piedra son hojas dobles de entrada. El uso exterior cambia madera y acabado. No prometemos intemperie sin ver el vano.",
    },
    {
      title: "Interior con vidrio",
      description:
        "Dormitorio, cocina u oficina pueden llevar un paño si el vano y la referencia lo permiten. La hoja de interior no se cotiza como entrada.",
    },
    {
      title: "Sin ficha de vidrio",
      description:
        "No vendemos termopanel, templado ni una medida de cristal. Si el vidrio va en el encargo, se nombra en la cotización.",
    },
  ],
  extraSections: [
    {
      title: "Qué enviar para cotizar el vidrio en la hoja",
      paragraphs: [
        "Mide el vano como en cualquier puerta: ancho arriba, al medio y abajo (quédate con la menor) y alto a ambos lados. Suma el espesor de la hoja o el que necesitas, la comuna y si el uso es interior o de entrada.",
        "La foto tiene que mostrar la repartición: cuántos paños, si llegan al piso o quedan en la mitad superior, y si la hoja es simple o doble. Con eso vemos si el taller puede hacerla. El paso de medidas también está en la [guía de medidas y madera](/guias/medidas-y-madera-puertas).",
        "La entrada con vidrio sigue siendo una [puerta de entrada](/puertas-exteriores). Un dormitorio o una oficina sin el mismo uso exterior van en [puertas interiores](/puertas-interiores). La fábrica general está en [puertas a medida](/puertas-a-medida).",
      ],
      bullets: [
        "Alto, ancho y espesor del vano o de la hoja",
        "Interior o entrada",
        "Foto de la repartición del vidrio",
        "Hoja simple o doble, y comuna",
      ],
    },
  ],
  stepsTitle: "Cómo cotizar una puerta con vidrio",
  steps: [
    {
      title: "Manda el vano y la foto",
      description: "Alto, ancho, espesor, uso y una imagen de la repartición que buscas.",
    },
    {
      title: "Confirmamos hoja y vidrio",
      description: "Te decimos si la repartición es factible y si el vidrio entra en la misma cotización.",
    },
    {
      title: "Recibes la propuesta",
      description: "Madera, terminación, plazo y qué queda incluido. El precio sale en esa respuesta.",
    },
  ],
  faqItems: [
    {
      question: "¿Fabrican el vidrio de la puerta?",
      answer:
        "La página es de la hoja de madera. El vidrio no se asume incluido y no publicamos tipo, espesor ni marca. Si lo necesitas, dilo al cotizar y te confirmamos si entra en la propuesta.",
    },
    {
      question: "¿Es lo mismo que una puerta corredera con vidrio?",
      answer:
        "No. Aquí la hoja abre con bisagras. La referencia de hoja que corre, de interior y con vidrio, está en puertas correderas. El riel es herraje y no viene por defecto.",
    },
    {
      question: "¿Puedo pedir la misma puerta de las fotos?",
      answer:
        "Las fotos son referencias de obras, no un modelo con precio. Si tu vano es distinto, partimos de tus medidas y de la repartición que nos muestres.",
    },
    {
      question: "¿Sirve para la entrada de la casa?",
      answer:
        "Sí, si nos dices que es entrada. Ese uso es exterior: cambia madera y acabado respecto de un dormitorio. No prometemos resistencia a la intemperie sin ver el vano. El detalle de la entrada está en puertas de entrada.",
    },
    {
      question: "¿Incluyen marco, herrajes e instalación?",
      answer:
        "No se asumen incluidos. La cotización parte por la hoja. Marco, herrajes, vidrio e instalación se confirman aparte si los pides.",
    },
    {
      question: "¿Qué madera usan cuando hay vidrio?",
      answer:
        "La misma lógica del resto de las puertas: madera nativa seca en cámara, y la especie se confirma al cotizar. Interior o exterior cambia la elección. Más contexto en puertas de madera nativa.",
    },
    {
      question: "¿Pueden hacer la puerta con vidrio solo arriba o hasta la mitad?",
      answer:
        "La repartición sale de tu foto: cuántos paños, si llegan al piso o quedan en la mitad superior, y si la hoja es simple o doble. Puede ser un paño o varios. Partimos de tu referencia, no de un código. Te decimos si la repartición es factible y si el vidrio entra en la misma cotización. El vidrio no se asume incluido.",
    },
    {
      question: "¿Hacen puertas de madera con vidrio para interior?",
      answer:
        "Sí. Dormitorio, cocina u oficina pueden llevar un paño si el vano y la referencia lo permiten. La hoja de interior no se cotiza como entrada. Interior o entrada cambia la madera y el acabado. Un dormitorio o una oficina sin el mismo uso exterior van en puertas interiores.",
    },
  ],
  relatedLinks: doorRelatedLinks("/puertas-de-madera-con-vidrio"),
  ctaTitle: "Cotiza la hoja con vidrio",
  ctaParagraph:
    "Escríbenos por WhatsApp con el vano, el uso y una foto de la repartición. Te respondemos qué entra en la hoja y qué se confirma aparte.",
  ctaBullets: quoteBullets,
  schemaType: "Service",
  serviceName: "Puertas de madera con vidrio a medida",
  serviceType: "Fabricación de hojas de madera con vidrio",
};

export const puertasLocalesLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/puertas-para-locales",
  updatedAt: "2026-10-29",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Puertas a medida", path: "/puertas-a-medida" },
    { name: "Puertas para locales", path: "/puertas-para-locales" },
  ],
  pageTitle: "Puertas de Madera para Locales | Chillán",
  pageDescription:
    "Puertas de madera a medida para local, oficina o bodega en Chillán. Cotiza la hoja por WhatsApp con el vano. Marco y herrajes aparte.",
  keywords: [
    "puertas de madera para local",
    "puertas de madera para negocio",
    "puerta de oficina de madera",
    "puerta de bodega de madera",
    "puertas comerciales de madera a medida",
  ],
  eyebrow: "Puertas para locales",
  h1: "Puertas de madera a medida para locales y oficinas",
  heroParagraph:
    "Fabricamos la hoja de madera para un local, una oficina o una bodega, con las medidas del vano. No es una puerta acústica, cortafuego ni de seguridad certificada: si el proyecto pide eso, no lo prometemos. El uso —interior del local o acceso desde la calle— cambia madera y acabado. Marco, herrajes e instalación no se asumen incluidos.",
  badges: ["Local, oficina o bodega", "Hoja a medida", "Taller en Chillán"],
  whatsappButtonLabel: "Cotizar puerta para local",
  whatsappProductTitle: "Puertas de madera para locales",
  whatsappLines: [
    "Vengo desde la página de puertas para locales.",
    "Quiero cotizar una puerta de madera para un local, oficina o bodega.",
    "Puedo enviar alto, ancho, espesor, si da a la calle o es interior, comuna y una foto del vano.",
  ],
  heroHighlights: [
    {
      title: "El vano del local",
      description: "Medidas reales, no una hoja de casa adaptada a ciegas.",
    },
    {
      title: "Calle o interior",
      description: "El acceso desde la calle se trata como uso exterior. Una oficina interior, no.",
    },
    {
      title: "Sin certificación inventada",
      description: "No publicamos puerta acústica, cortafuego ni de seguridad.",
    },
  ],
  heroImage: {
    src: "/images/puertas/puerta-doble-madera-vidrios-fachada.webp",
    alt: "Puerta doble de madera con vidrios en fachada",
    width: 1200,
    height: 1600,
    caption:
      "Referencia de entrada: puerta doble de madera con vidrios en fachada. No es la hoja de un local. Son obras, no modelos a la venta.",
  },
  sectionTitle: "Qué puerta de local sí cotizamos",
  sectionParagraph:
    "El taller hace la hoja a medida para hogares y también para negocios: locales, oficinas y bodegas. Esta página es ese segundo caso. Si la puerta es de una casa, parte en puertas interiores o en puertas de entrada, según el vano.",
  featureCards: [
    {
      title: "Oficina, bodega o pieza interior",
      description:
        "Una hoja de oficina, consulta, backoffice o bodega interior se cotiza como interior. Puede ser lisa, con paneles o con vidrio si mandas la referencia.",
    },
    {
      title: "Acceso del local",
      description:
        "Si la puerta da a la calle o al exterior del negocio, dínoslo. Cambia madera y acabado. No prometemos intemperie ni un cierre de seguridad sin ver el vano.",
    },
    {
      title: "Varias hojas iguales",
      description:
        "Si el local repite vanos, indica la cantidad y si las medidas son las mismas. La propuesta sale por WhatsApp.",
    },
  ],
  extraSections: [
    {
      title: "Datos del local que necesitamos",
      paragraphs: [
        "Además del alto, el ancho y el espesor, cuéntanos el uso: oficina, atención de público, bodega o acceso a la calle. Una foto del vano muestra el muro, el sentido de apertura y si hay un letrero o un vidrio al lado.",
        "No fabricamos, en esta línea, puertas acústicas, cortafuego ni de seguridad con certificación. Si tu obra las exige, hay que resolverlas con quien corresponda. Lo que sí cotizamos es la hoja de madera a medida.",
        "El vidrio en una oficina va en [puertas de madera con vidrio](/puertas-de-madera-con-vidrio). La entrada de una casa, en [puertas de entrada](/puertas-exteriores). La fábrica general sigue en [puertas a medida](/puertas-a-medida).",
      ],
      bullets: [
        "Alto, ancho y espesor del vano",
        "Oficina, bodega, local o acceso a la calle",
        "Cantidad de hojas y si los vanos se repiten",
        "Comuna y foto del vano",
      ],
    },
  ],
  stepsTitle: "Cómo cotizar la puerta del local",
  steps: [
    {
      title: "Describe el vano",
      description: "Medidas, cantidad y si la puerta es interior o da a la calle.",
    },
    {
      title: "Manda una foto",
      description: "El vano actual o una referencia del diseño que buscas.",
    },
    {
      title: "Recibes la propuesta",
      description: "Madera, terminación, plazo y alcance. El precio queda en la respuesta.",
    },
  ],
  faqItems: [
    {
      question: "¿Hacen puertas para negocios?",
      answer:
        "Sí. Fabricamos la hoja para locales, oficinas y bodegas, según el vano. Marco, herrajes e instalación no se asumen incluidos.",
    },
    {
      question: "¿Es una puerta de seguridad o acústica?",
      answer:
        "No. No publicamos puertas acústicas, cortafuego ni de seguridad certificada. Si el proyecto las pide, no las prometemos en esta cotización.",
    },
    {
      question: "¿La puerta de un local se trata igual que la de una casa?",
      answer:
        "La hoja se fabrica a medida en el mismo taller. Cambia el uso: una oficina interior no se cotiza como el acceso desde la calle. Dinos cuál de los dos es.",
    },
    {
      question: "¿Pueden ser varias puertas iguales?",
      answer:
        "Sí. Indica la cantidad y si cada vano mide lo mismo. Si hay vanos distintos, manda cada medida.",
    },
    {
      question: "¿Incluyen el marco y la instalación en el local?",
      answer:
        "No se asumen incluidos. La cotización parte por la hoja. Si necesitas marco, herrajes o instalación, se confirman en la respuesta.",
    },
    {
      question: "¿Envían la puerta fuera de Chillán?",
      answer:
        "Sí. Fabricamos en Chillán y coordinamos envío a todo Chile. Al cotizar te indicamos opciones según la comuna.",
    },
  ],
  relatedLinks: doorRelatedLinks("/puertas-para-locales"),
  ctaTitle: "Cotiza la puerta del local",
  ctaParagraph:
    "Escríbenos por WhatsApp con las medidas del vano, el uso y una foto. Te decimos qué hoja podemos fabricar.",
  ctaBullets: quoteBullets,
  schemaType: "Service",
  serviceName: "Puertas de madera a medida para locales",
  serviceType: "Fabricación de puertas de madera para negocios",
};

export const peldanosFlotantesLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/peldanos-flotantes",
  updatedAt: "2026-10-24",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Peldaños a medida", path: "/peldanos-a-medida" },
    { name: "Peldaños flotantes", path: "/peldanos-flotantes" },
  ],
  pageTitle: "Peldaños Flotantes de Madera a Medida | Chile",
  pageDescription:
    "Peldaños flotantes de madera a medida. Fabricamos la huella; la estructura metálica no está incluida. Cotiza por WhatsApp. Envío a Chile.",
  keywords: [
    "peldaños flotantes de madera",
    "peldaños flotantes a medida",
    "huellas para escalera flotante",
    "peldaños de madera sobre metal",
    "escalera flotante huella de madera",
  ],
  eyebrow: "Peldaños flotantes",
  h1: "Peldaños flotantes de madera a medida",
  heroParagraph:
    "Fabricamos la huella de madera para una escalera abierta: la tabla que se ve separada del muro. La estructura metálica, los anclajes, la baranda y el montaje no están incluidos. En el taller hay referencias de huellas gruesas sobre metal; el metal es de la obra, no del pedido. Cotizamos con largo, fondo, espesor y cantidad.",
  badges: ["Solo la huella", "Sobre estructura existente", "Envíos a todo Chile"],
  whatsappButtonLabel: "Cotizar peldaños flotantes",
  whatsappProductTitle: "Peldaños flotantes de madera",
  whatsappLines: [
    "Vengo desde la página de peldaños flotantes.",
    "Quiero cotizar las huellas de madera de una escalera flotante.",
    "Puedo enviar cantidad, largo, fondo, espesor, comuna y una foto de la estructura.",
  ],
  heroHighlights: [
    {
      title: "La tabla, no el metal",
      description: "Cortamos la huella. La estructura que la sostiene no se fabrica aquí.",
    },
    {
      title: "Cada peldaño puede variar",
      description: "Si el tramo no repite la medida, manda el largo de cada uno.",
    },
    {
      title: "Sin baranda incluida",
      description: "La baranda de vidrio de las fotos no es un producto del taller.",
    },
  ],
  heroImage: {
    src: "/images/peldanos/peldanos-flotantes-instalados.webp",
    alt: "Peldaños flotantes de madera instalados sobre una estructura metálica",
    width: 1080,
    height: 600,
  },
  galleryTitle: "Huellas gruesas, en obra y en taller",
  galleryIntro:
    "La estructura metálica se ve en la foto de obra y no forma parte del encargo. En el taller la pieza es la tabla de madera.",
  gallery: [
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
  ],
  sectionTitle: "Qué es un peldaño flotante en este taller",
  sectionParagraph:
    "Es una huella de madera que queda a la vista, sin contrahuella cerrando el frente. No es una escalera armada. Si la escalera es una losa de hormigón y solo quieres cubrirla, ese caso está en peldaños para escalera de concreto. Si buscas entender qué parte de una escalera de madera fabricamos, está en escaleras de madera.",
  featureCards: [
    {
      title: "Escalera abierta",
      description:
        "La pisada se ve entera. La contrahuella no se asume incluida. Si la quieres, indícalo al cotizar.",
    },
    {
      title: "Apoyo en metal",
      description:
        "Las fotos muestran huellas sobre estructura metálica. Nosotros no fabricamos esa estructura ni los anclajes.",
    },
    {
      title: "Espesor que nos indiques",
      description:
        "No publicamos un espesor único. Manda el que definió quien arma la escalera, sobre todo si la tabla cambia la altura del paso.",
    },
  ],
  extraSections: [
    {
      title: "Medidas para una escalera flotante",
      paragraphs: [
        "Envía la cantidad de huellas, el largo de cada una (el ancho de la escalera), el fondo de la pisada y el espesor. Si el primer o el último peldaño mide distinto, no promedies: anota cada uno.",
        "Una foto de la estructura —aunque esté a medio armar— evita cotizar una tabla que no calza en el apoyo. La guía de [medidas de huella y contrahuella](/guias/medidas-peldanos-escalera) ordena esos nombres. La especie y la terminación se ven en [cómo elegir madera para peldaños](/guias/elegir-madera-peldanos).",
        "La cotización general de cualquier huella sigue en [peldaños a medida](/peldanos-a-medida). Si la obra está en Chillán, también puedes partir por [peldaños en Chillán](/peldanos-madera-chillan).",
      ],
      bullets: [
        "Cantidad de huellas",
        "Largo, fondo y espesor de cada una",
        "Foto de la estructura metálica",
        "Comuna de despacho",
      ],
    },
  ],
  stepsTitle: "Cómo cotizar peldaños flotantes",
  steps: [
    {
      title: "Manda las huellas",
      description: "Cantidad, largo, fondo y espesor. Si varían, una lista y no un solo número.",
    },
    {
      title: "Muestra la estructura",
      description: "Foto o plano del metal. Así vemos la tabla, no el anclaje.",
    },
    {
      title: "Recibes la propuesta",
      description: "Madera, terminación y plazo de las huellas. El precio sale en la respuesta.",
    },
  ],
  faqItems: [
    {
      question: "¿Fabrican la escalera flotante completa?",
      answer:
        "No. Fabricamos la huella de madera. La estructura metálica, los anclajes, la baranda y el montaje no se asumen incluidos.",
    },
    {
      question: "¿La contrahuella viene con el peldaño flotante?",
      answer:
        "No. En una escalera abierta la contrahuella normalmente no existe. Si tu proyecto la pide, indícalo al cotizar: no queda incluida por defecto.",
    },
    {
      question: "¿Es lo mismo que revestir una escalera de concreto?",
      answer:
        "No. El concreto es una losa que ya existe y se cubre con madera. Eso está en peldaños para escalera de concreto. Aquí la huella queda separada, sobre una estructura que no fabricamos.",
    },
    {
      question: "¿Hacen la baranda de vidrio de las fotos?",
      answer:
        "No es una línea de producto. La baranda que se ve en algunas obras no se asume incluida. El alcance de la escalera de madera está explicado en escaleras de madera.",
    },
    {
      question: "¿Qué espesor pido?",
      answer:
        "El que definió quien arma la estructura. No publicamos un espesor estándar para peldaños flotantes. Si la tabla cambia la altura del paso, conviene cerrarlo con el instalador antes de cotizar.",
    },
    {
      question: "¿Envían las huellas a todo Chile?",
      answer:
        "Sí. Fabricamos en Chillán y coordinamos el despacho según la comuna al cotizar.",
    },
  ],
  relatedLinks: peldanosRelatedLinks("/peldanos-flotantes"),
  ctaTitle: "Cotiza las huellas de la escalera flotante",
  ctaParagraph:
    "Escríbenos por WhatsApp con las medidas y una foto de la estructura. Te respondemos por las huellas de madera.",
  ctaBullets: quoteBullets,
  schemaType: "Service",
  serviceName: "Peldaños flotantes de madera a medida",
  serviceType: "Fabricación de huellas de madera para escaleras flotantes",
};

export const mesasComedorAMedidaLandingConfig: ServiceLandingConfig = {
  canonicalPath: "/mesas-de-comedor-a-medida",
  updatedAt: "2026-10-29",
  breadcrumbItems: [
    { name: "Inicio", path: "/" },
    { name: "Muebles a medida", path: "/muebles-a-medida" },
    { name: "Mesas de comedor a medida", path: "/mesas-de-comedor-a-medida" },
  ],
  pageTitle: "Mesas de Comedor de Madera a Medida | Chile",
  pageDescription:
    "Mesas de comedor de madera a medida cuando el catálogo no calza. Cotiza largo o diámetro por WhatsApp. El precio sale en la respuesta.",
  keywords: [
    "mesa de comedor a medida",
    "mesa de madera a medida",
    "mesas de comedor a medida chile",
    "mesa de comedor personalizada",
    "fabricar mesa de comedor a medida",
  ],
  eyebrow: "Mesas de comedor a medida",
  h1: "Mesas de comedor de madera a medida",
  heroParagraph:
    "Si ninguna ficha del catálogo cabe en tu comedor, fabricamos la mesa en madera maciza con el largo o el diámetro que necesitas. La altura habitual de una mesa de comedor es 75 cm; si pides otra, la confirmamos al cotizar. El precio no está en esta página: los modelos publicados tienen su precio en cada ficha, y una medida especial se cotiza por WhatsApp.",
  badges: ["Madera maciza", "Medida de tu comedor", "Taller en Chillán"],
  whatsappButtonLabel: "Cotizar mesa de comedor",
  whatsappProductTitle: "Mesa de comedor a medida",
  whatsappLines: [
    "Vengo desde la página de mesas de comedor a medida.",
    "Quiero cotizar una mesa de comedor con medidas especiales.",
    "Puedo enviar largo o diámetro, cantidad de personas, medidas del comedor, terminación y comuna.",
  ],
  heroHighlights: [
    {
      title: "Cuando el catálogo no calza",
      description: "Un comedor estrecho o más largo que las fichas se resuelve con una medida propia.",
    },
    {
      title: "Rectangular o redonda",
      description: "Indica largo y ancho, o el diámetro. La guía de medidas ayuda a elegir.",
    },
    {
      title: "Precio en la cotización",
      description: "Esta página no publica un valor. La propuesta llega por WhatsApp.",
    },
  ],
  heroImage: {
    src: "/images/mesa-nordica-1.jpg",
    alt: "Mesa nórdica de comedor de madera maciza, referencia de catálogo para cotizar una mesa a medida",
    width: 960,
    height: 906,
  },
  sectionTitle: "Qué pedimos para fabricar la mesa",
  sectionParagraph:
    "La foto de esta página es la mesa nórdica del catálogo, no una pieza única. Sirve para ver el tipo de mesa de comedor que hacemos en madera maciza. Si esa medida te sirve, cómprala en su ficha. Si necesitas otro largo, otro ancho o un diámetro distinto, esta es la cotización.",
  featureCards: [
    {
      title: "Largo del comedor",
      description:
        "Mide el espacio libre y deja paso alrededor de la mesa. La guía de medidas de mesa de comedor tiene la referencia por cantidad de personas.",
    },
    {
      title: "Personas y forma",
      description:
        "Rectangular para un comedor largo; redonda si quieres que todos se vean. Dinos cuántos comen a diario y cuántos cuando recibes.",
    },
    {
      title: "Sillas aparte",
      description:
        "La mesa a medida no incluye sillas. Las del catálogo están en la colección de sillas, y la altura de asiento se conversa con la de la mesa.",
    },
  ],
  extraSections: [
    {
      title: "Catálogo, guía y medida especial",
      paragraphs: [
        "Las mesas con foto y precio están en la [colección de mesas](/collections/mesas). Ahí también hay mesas ratonas para el living. Una mesa baja no se cotiza como comedor: si buscas esa, entra a [mesas de centro](/mesas-de-centro) y a la [guía de medidas de mesa de centro](/guias/medidas-mesa-de-centro).",
        "Para calcular personas, altura de 75 cm y circulación, usa la [guía de medidas de mesa de comedor](/guias/medidas-mesa-comedor). Esta página no repite la tabla: la guía es la referencia y la cotización aplica tu espacio.",
        "Si el proyecto además lleva cubiertas, puertas o peldaños, el conjunto parte en [muebles a medida](/muebles-a-medida). Un comedor con sillas y bancas de línea coordinada está en [comedores nórdicos](/comedores-nordicos).",
      ],
      bullets: [
        "Largo y ancho del comedor, o el diámetro que buscas",
        "Cantidad de personas",
        "Terminación y comuna",
        "Foto del espacio, si la tienes",
      ],
    },
    {
      title: "Mesa de comedor para 6 personas y para 8",
      paragraphs: [
        "Para un comedor de 6 personas, la [guía de medidas de mesa de comedor](/guias/medidas-mesa-comedor) usa una mesa de 160×90 cm o una redonda de Ø120 cm. Para 6 a 8 personas, la misma guía usa 200×100 cm o Ø140 cm. En las fichas, la [Mesa de comedor Trípode](/products/mesa-comedor-tripode) de 220×100×75 cm dice que es ideal para 6 a 8 comensales, y la [Mesa de comedor Trípode redonda](/products/mesa-comedor-tripode-redonda) de Ø140 cm anota la referencia de 6-8 personas de esa guía. Las sillas no van con la mesa: están en la [colección de sillas](/collections/sillas).",
        "Si ninguna ficha del catálogo cabe en tu comedor, fabricamos la mesa en madera maciza con el largo o el diámetro que necesitas. La altura habitual de una mesa de comedor es 75 cm; si pides otra, la confirmamos al cotizar. El precio no está en esta página: una medida especial se cotiza por WhatsApp.",
      ],
    },
    {
      title: "Medidas del catálogo antes de pedir una a medida",
      paragraphs: [
        "En barniz negro hay tres mesas de comedor: [Roma negra](/products/mesa-comedor-roma-negra), [Trípode negra](/products/mesa-comedor-tripode-negra) y [Trípode redonda negra](/products/mesa-tripode-redonda-negra).",
      ],
      bullets: [
        "[Mesa Nórdica](/products/mesa-nordica): 160×90×75 cm",
        "[Mesa Comedor Niza](/products/mesa-comedor-niza): 200×100×75 cm",
        "[Mesa de comedor Bolonia](/products/mesa-comedor-bolonia): 200×100×75 cm",
        "[Mesa Comedor Roma natural](/products/mesa-comedor-roma-natural): 200×100×75 cm",
        "[Mesa Comedor Roma negra](/products/mesa-comedor-roma-negra): 200×100×75 cm, barniz negro",
        "[Mesa de comedor Trípode](/products/mesa-comedor-tripode): 220×100×75 cm",
        "[Mesa de comedor Trípode negra](/products/mesa-comedor-tripode-negra): 220×100×75 cm, barniz negro",
        "[Mesa Comedor Cantabria](/products/mesa-comedor-cantabria): 240×110×75 cm",
        "[Mesa Ferrara redonda](/products/mesa-comedor-redonda-ferrara): Ø140×75 cm",
        "[Mesa de comedor Trípode redonda](/products/mesa-comedor-tripode-redonda): Ø140×75 cm",
        "[Mesa Comedor Redonda Novara](/products/mesa-comedor-redonda-novara): Ø150×75 cm",
        "[Mesa Frida redonda](/products/mesa-frida-redonda): Ø150×75 cm",
        "[Mesa Trípode redonda negra](/products/mesa-tripode-redonda-negra): Ø150×75 cm, barniz negro",
      ],
    },
  ],
  stepsTitle: "Cómo cotizar una mesa de comedor a medida",
  steps: [
    {
      title: "Mide el comedor",
      description: "Largo, ancho y por dónde se circula. Si hay una puerta cerca, indícalo.",
    },
    {
      title: "Elige la forma",
      description: "Rectangular o redonda, y cuántas personas se sientan.",
    },
    {
      title: "Recibes precio y plazo",
      description: "Te respondemos por WhatsApp con la propuesta. No hay precio fijo en esta página.",
    },
  ],
  faqItems: [
    {
      question: "¿Puedo pedir una mesa de comedor a medida?",
      answer:
        "Sí. Indica largo o diámetro, alto si no quieres los 75 cm habituales, terminación y comuna. Te respondemos con plazo y precio por WhatsApp.",
    },
    {
      question: "¿Por qué no hay precio en esta página?",
      answer:
        "Una medida especial depende del tamaño y de la terminación. Los precios publicados están en cada ficha de la colección de mesas. La mesa a medida se cotiza.",
    },
    {
      question: "¿Qué altura tiene la mesa?",
      answer:
        "La altura habitual de una mesa de comedor es 75 cm. Si necesitas otra, dila al cotizar. La relación con las sillas está en la guía de medidas.",
    },
    {
      question: "¿La mesa incluye sillas?",
      answer:
        "No. Las sillas se eligen en la colección de sillas o se cotizan aparte. Esta página es solo la mesa.",
    },
    {
      question: "¿Hacen la mesa redonda a medida?",
      answer:
        "Sí, si nos das el diámetro. Si el comedor es cuadrado, la guía de medidas compara redonda y rectangular antes de encargar.",
    },
    {
      question: "¿Envían la mesa a todo Chile?",
      answer:
        "Sí. Fabricamos en Chillán y coordinamos el despacho según la comuna. El costo de envío se confirma al cotizar.",
    },
    {
      question: "¿Qué medida de mesa de comedor sirve para 6 personas?",
      answer:
        "Para un comedor de 6 personas, la guía de medidas de mesa de comedor usa una mesa de 160×90 cm o una redonda de Ø120 cm. Si ninguna ficha del catálogo cabe en tu comedor, fabricamos la mesa con el largo o el diámetro que necesitas. La altura habitual de una mesa de comedor es 75 cm.",
    },
    {
      question: "¿Qué medida sirve para 8 personas?",
      answer:
        "Para 6 a 8 personas, la guía de medidas de mesa de comedor usa 200×100 cm o Ø140 cm. La Mesa de comedor Trípode de 220×100×75 cm dice que es ideal para 6 a 8 comensales. Una medida especial se cotiza: el precio no está en esta página.",
    },
  ],
  relatedLinks: [
    {
      href: "/muebles-a-medida",
      title: "Muebles a medida",
      description: "Cubiertas, puertas, peldaños y otros encargos del mismo taller.",
    },
    {
      href: "/collections/mesas",
      title: "Catálogo de mesas",
      description: "Mesas de comedor y ratonas con foto y precio publicado.",
    },
    {
      href: "/guias/medidas-mesa-comedor",
      title: "Medidas de mesa de comedor",
      description: "Personas, altura de 75 cm y espacio para circular.",
    },
    {
      href: "/collections/sillas",
      title: "Sillas de comedor",
      description: "Sillas de madera para acompañar la mesa.",
    },
    {
      href: "/comedores-nordicos",
      title: "Comedores nórdicos",
      description: "Mesas, sillas y bancas de líneas simples.",
    },
    {
      href: "/mesas-de-centro",
      title: "Mesas de centro",
      description: "Mesas bajas de living, distintas de una mesa de comedor.",
    },
    {
      href: "/guias/cotizar-muebles-a-medida",
      title: "Cómo cotizar a medida",
      description: "Qué datos enviar por WhatsApp en cualquier encargo.",
    },
  ],
  ctaTitle: "Cotiza la mesa que cabe en tu comedor",
  ctaParagraph:
    "Escríbenos por WhatsApp con las medidas del espacio y cuántas personas se sientan. Te proponemos tamaño, madera y plazo.",
  ctaBullets: quoteBullets,
  schemaType: "Service",
  serviceName: "Mesas de comedor de madera a medida",
  serviceType: "Fabricación de mesas de comedor a medida",
};

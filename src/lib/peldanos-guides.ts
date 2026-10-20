import type { GuideConfig } from "@/lib/guides";

const clusterAndWorkshop = [
  {
    href: "/peldanos-a-medida",
    title: "Peldaños a medida",
    description: "Cotiza las huellas de madera con largo, fondo, espesor y cantidad.",
  },
  {
    href: "/peldanos-madera-chillan",
    title: "Peldaños en Chillán",
    description: "El mismo encargo, fabricado en el taller de Chillán.",
  },
  {
    href: "/peldanos-escalera-concreto",
    title: "Escalera de concreto",
    description: "Huellas para revestir una escalera de hormigón que ya existe.",
  },
  {
    href: "/escaleras-de-madera",
    title: "Escaleras de madera",
    description: "Qué pieza fabricamos cuando buscas una escalera de madera.",
  },
  {
    href: "/muebles-a-medida",
    title: "Muebles a medida",
    description: "Otros proyectos de madera del mismo taller en Chillán.",
  },
];

export const medidasPeldanosGuideConfig: GuideConfig = {
  canonicalPath: "/guias/medidas-peldanos-escalera",
  updatedAt: "2026-10-20",
  pageTitle: "Medidas de Peldaños: Huella y Contrahuella | Idea Madera",
  pageDescription:
    "Cómo medir la huella y la contrahuella de un peldaño. Referencia general de confort (2 contrahuellas + huella). Cotiza por WhatsApp.",
  keywords: [
    "medidas de peldaños",
    "huella y contrahuella",
    "medida de huella de escalera",
    "contrahuella escalera",
    "regla de confort escalera",
  ],
  eyebrow: "Guía de medidas",
  h1: "Cómo medir la huella y la contrahuella",
  intro:
    "La huella es la superficie horizontal donde apoyas el pie y la contrahuella es la altura vertical entre un peldaño y el siguiente. Como referencia general de confort en una vivienda, la huella suele quedar cerca de 25 a 30 cm, la contrahuella cerca de 15 a 18 cm, y la relación 2 × contrahuella + huella cerca de 60 a 64 cm. Idea Madera no impone esas cifras: cortamos la huella de madera al largo, al fondo y al espesor que cotizas.",
  heroImage: {
    src: "/images/peldanos/peldanos-madera-a-medida-taller.webp",
    alt: "Peldaños de madera clara a medida recién cepillados en el taller",
    width: 1200,
    height: 1600,
    caption: "La pieza que sale del taller mide lo que nos confirmas.",
  },
  updatedDate: "2026-10-17",
  serviceName: "Fabricación de peldaños de madera a medida",
  serviceType: "Huellas de madera según las medidas del proyecto",
  sections: [
    {
      title: "Huella, contrahuella y peldaño",
      content: [
        "En el pedido del taller, el peldaño es la pieza donde se pisa y la huella es su cara horizontal. La contrahuella cierra el frente, en vertical. En [peldaños a medida](/peldanos-a-medida) fabricamos la huella. La contrahuella no viene incluida: si la necesitas, la pides en el mismo mensaje.",
        "Dos palabras del pedido se prestan a confusión. El largo del peldaño es el ancho de la escalera, de muro a muro o de zanca a zanca. El ancho o fondo es la profundidad de la pisada, lo que el pie recorre hacia adelante. Cuando escribas por WhatsApp, usa las dos cifras con su nombre.",
      ],
      bullets: [
        "Largo: ancho de la escalera, en centímetros",
        "Fondo (ancho de huella): profundidad de la pisada",
        "Contrahuella: altura de un escalón al siguiente",
        "Espesor: grueso de la tabla de madera, lo defines tú",
        "Cantidad de huellas, no solo de alturas",
      ],
    },
    {
      title: "Referencia general de confort",
      content: [
        "Una regla usada desde hace siglos para que la pisada no quede ni muy corta ni muy alta es la de Blondel: dos contrahuellas más una huella deben caer cerca de 63 cm. El rango que se maneja como banda cómoda es de 60 a 64 cm. No es la ordenanza de tu comuna ni un plano, y no reemplaza lo que defina tu arquitecto.",
        "Dentro de esa banda, en escaleras de vivienda se trabaja a menudo con contrahuellas de unos 15 a 18 cm y huellas de unos 25 a 30 cm de fondo. Son cifras de referencia para conversar el proyecto. La pieza que sale del taller mide lo que nos confirmas, aunque no caiga en el centro de la tabla.",
        "Ejemplo, no una medida de fábrica: si la contrahuella mide 17 cm, una huella de 29 cm deja 2 × 17 + 29 = 63 cm, dentro de la banda. Si tu escalera ya está hecha, no fuerces el ejemplo: mide lo que hay.",
      ],
      table: {
        headers: ["Pieza", "Qué mide", "Referencia general"],
        rows: [
          ["Huella", "Fondo de la pisada", "Cerca de 25 a 30 cm"],
          ["Contrahuella", "Altura entre peldaños", "Cerca de 15 a 18 cm"],
          ["Relación", "2 × contrahuella + huella", "Cerca de 60 a 64 cm"],
        ],
      },
    },
    {
      title: "Cómo medir una escalera que ya existe",
      content: [
        "Mide el fondo en la huella actual, desde la punta hasta donde termina la pisada, y la altura en vertical entre la cara de un peldaño y la del siguiente. El largo se toma de lado a lado, en el claro donde tiene que entrar la madera.",
        "Repite la medición en el primer peldaño, en uno del medio y en el último. En una [escalera de concreto](/peldanos-escalera-concreto) es habitual que no sean idénticos. Si varían, anota cada uno: cortamos la huella con el dato que llega, no con un promedio que inventemos.",
        "En un tramo recto, lo cómodo es que las contrahuellas sean iguales entre sí y las huellas también. Si el proyecto trae un descanso, mide cada tramo por separado. El tablero del descanso no es una huella y no se asume en el pedido de [escaleras de madera](/escaleras-de-madera).",
      ],
      bullets: [
        "Fondo, altura y largo, en centímetros",
        "Al menos tres peldaños del mismo tramo",
        "Aviso si alguno es distinto",
        "Foto de costado, donde se vea la altura",
        "Foto desde arriba, donde se vea el fondo",
      ],
    },
    {
      title: "Qué hacer con el espesor",
      content: [
        "El espesor no sale de la regla de confort. Es el grueso de la tabla y lo eliges al cotizar. No publicamos un espesor estándar para peldaños.",
        "Si la madera va sobre una escalera que ya existe, ese grueso se suma a la pisada. Cambia la relación del primer y del último escalón con el piso o con la puerta. Quien instala tiene que considerarlo; en el taller necesitamos el espesor ya decidido para cortar.",
        "Si la huella lleva vuelo —la punta que sobresale de la contrahuella—, márcalo en la foto e indica cuántos centímetros son. El vuelo se corta según ese dato, no con una medida fija del taller.",
      ],
    },
    {
      title: "De la medida a la cotización",
      content: [
        "Con largo, fondo, espesor, cantidad y comuna se puede cotizar en [peldaños a medida](/peldanos-a-medida). Si la obra está en Chillán o en Ñuble, la página de [peldaños en Chillán](/peldanos-madera-chillan) es el mismo encargo con el taller a la vista. Para la especie y la terminación, sigue la guía de [cómo elegir madera para peldaños](/guias/elegir-madera-peldanos).",
        "Otros encargos del taller —cubiertas, puertas, molduras— parten en [muebles a medida](/muebles-a-medida). Esta guía no los cubre.",
      ],
    },
  ],
  faqs: [
    {
      question: "¿Cuál es una medida correcta de huella y contrahuella?",
      answer:
        "Como referencia general de confort, la huella queda cerca de 25 a 30 cm, la contrahuella cerca de 15 a 18 cm, y 2 × contrahuella + huella cerca de 60 a 64 cm. No es una norma que el taller imponga ni la ordenanza de tu comuna. Fabricamos la medida que cotizas.",
    },
    {
      question: "¿La regla de 60 a 64 cm es obligatoria?",
      answer:
        "No. Es una banda de confort para que el paso no quede incómodo. Si tu arquitecto o tu escalera existente traen otra cifra, esa es la que hay que cortar. Confírmala antes de fabricar.",
    },
    {
      question: "¿Qué dato es el largo y cuál es el ancho?",
      answer:
        "El largo es el ancho de la escalera, el largo de la tabla. El ancho o fondo es la profundidad de la pisada. En el mensaje de WhatsApp nómbralos así para no invertirlos.",
    },
    {
      question: "¿Fabrican la contrahuella con estas medidas?",
      answer:
        "No de forma automática. La página de peldaños es de huellas. Si quieres la pieza vertical, indícalo al cotizar junto con su altura y su espesor.",
    },
    {
      question: "¿Qué hago si los peldaños midieron distinto?",
      answer:
        "Envía la lista, no un promedio. Cada huella se corta con la medida que nos das. En escaleras de hormigón es frecuente que haya diferencias.",
    },
  ],
  relatedLinks: [
    ...clusterAndWorkshop,
    {
      href: "/guias/elegir-madera-peldanos",
      title: "Elegir madera para peldaños",
      description: "Tránsito, espesor y las maderas que trabaja el taller.",
    },
  ],
  ctaTitle: "¿Ya tienes las medidas de la escalera?",
  ctaParagraph:
    "Escríbenos por WhatsApp con largo, fondo, espesor, cantidad y una foto. Cotizamos las huellas de madera, no una medida estándar.",
  whatsappLines: [
    "Vengo desde la guía de medidas de peldaños.",
    "Quiero cotizar huellas de madera para una escalera.",
    "Puedo enviar largo, fondo, espesor, cantidad, comuna y foto.",
  ],
};

export const elegirMaderaPeldanosGuideConfig: GuideConfig = {
  canonicalPath: "/guias/elegir-madera-peldanos",
  updatedAt: "2026-10-16",
  pageTitle: "Cómo Elegir Madera para Peldaños | Idea Madera",
  pageDescription:
    "Criterios para peldaños: tránsito, espesor y terminación. Lenga austral o pino premium se confirman al cotizar. Escríbenos por WhatsApp.",
  keywords: [
    "madera para peldaños",
    "qué madera usar para escalera",
    "peldaños de madera maciza",
    "lenga o pino para peldaños",
    "elegir madera para huellas de escalera",
  ],
  eyebrow: "Guía de madera",
  h1: "Cómo elegir la madera de un peldaño",
  intro:
    "En una huella de escalera pesan el tránsito, el espesor y la terminación. En el taller de Chillán trabajamos lenga austral y pino premium, secos en cámara. Cuál de las dos va en tus peldaños se confirma al cotizar, según el uso y el acabado que buscas.",
  updatedDate: "2026-10-17",
  serviceName: "Asesoría y fabricación de peldaños de madera",
  serviceType: "Huellas de madera maciza a medida",
  sections: [
    {
      title: "Empieza por el uso, no por el nombre",
      content: [
        "Una escalera de uso diario —la que sube al segundo piso de una casa— pide una huella estable y una terminación que aguante el roce del calzado. Una escalera de poco paso puede aceptar otra combinación. Esa diferencia se conversa al cotizar; no hay una ficha única de peldaño en el catálogo.",
        "La pieza es de madera maciza, como las huellas gruesas y las tablas cepilladas que se ven en [peldaños a medida](/peldanos-a-medida). No trabajamos el peldaño como un tablero de mueble: es una tabla que se pisa.",
      ],
    },
    {
      title: "Lenga austral y pino premium",
      content: [
        "El taller publica esas dos para los encargos a medida: lenga austral y pino premium, secas en cámara. El secado en cámara deja la madera más estable antes de cortarla. Para peldaños, la especie se elige en la cotización, no en una lista cerrada de esta página.",
        "Como orientación general —la misma que usamos al hablar de muebles— el pino es más liviano y toma bien el barniz; la lenga es más dura y más pesada. En una escalera eso no alcanza para elegir solo: si es el paso principal de la casa, cuéntalo. Si buscas un tono claro o uno oscuro, manda una referencia.",
        "No ofrecemos, en esta línea, otras especies que no estén confirmadas al cotizar. Si tu proyecto nombra una madera distinta, pregúntalo en el mensaje y vemos si podemos hacerla. Si no queda confirmada, no cuentes con ella.",
      ],
      bullets: [
        "Lenga austral, seca en cámara",
        "Pino premium, seco en cámara",
        "La especie del peldaño se cierra al cotizar",
        "Sin una madera única publicada para escaleras",
      ],
    },
    {
      title: "Espesor y terminación",
      content: [
        "El espesor lo indicas tú. No hay un mínimo publicado para huellas. En las fotos del taller hay peldaños gruesos de madera maciza y tablas más delgadas recién cepilladas: son referencias de fabricación, no dos modelos con nombre.",
        "La terminación puede ir natural, oscura o parecida a una muestra que nos envíes. El acabado se confirma en la cotización, igual que en el resto de los encargos a medida. No prometemos un barniz concreto ni un comportamiento al agua sin ver el uso.",
        "Si la madera va sobre una [escalera de concreto](/peldanos-escalera-concreto), el espesor cambia la altura útil del primer y del último peldaño. Elígela junto con quien instala, y mándanos la cifra ya definida. Cómo se relaciona eso con la contrahuella está en la guía de [medidas de peldaños](/guias/medidas-peldanos-escalera).",
      ],
    },
    {
      title: "Interior, y exterior solo si lo dices",
      content: [
        "Las escaleras de las fotos son de interior, con huella barnizada. Esta guía está pensada para ese uso. Una escalera a la intemperie pide otra conversación: no prometemos resistencia al sol o a la lluvia sin conocer el proyecto, el mismo criterio que usamos cuando una cubierta queda expuesta.",
        "El pasamanos no ayuda a elegir la madera de la huella, y además no es una línea del taller. Si lo estás buscando junto con la escalera, míralo en [escaleras de madera](/escaleras-de-madera): ahí queda dicho que la baranda no se asume incluida.",
      ],
    },
    {
      title: "Qué enviar para que la recomendación sea útil",
      content: [
        "Cuéntanos si la escalera es el paso de todos los días o un tramo secundario, si la quieres clara u oscura, y en qué comuna se instala. Con el largo, el fondo, el espesor y la cantidad cotizamos en [peldaños a medida](/peldanos-a-medida). Si estás en Chillán, puedes partir por [peldaños en Chillán](/peldanos-madera-chillan).",
        "Si además necesitas una cubierta, una puerta o un mueble del mismo proyecto, el punto de partida es [muebles a medida](/muebles-a-medida). La madera de ese encargo se confirma por separado.",
      ],
      bullets: [
        "Uso: diario o esporádico",
        "Referencia de color o foto del espacio",
        "Largo, fondo, espesor y cantidad",
        "Si es interior o está a la intemperie",
        "Comuna de despacho",
      ],
    },
  ],
  faqs: [
    {
      question: "¿Qué madera recomiendan para peldaños?",
      answer:
        "Depende del tránsito y de la terminación. En el taller trabajamos lenga austral y pino premium, secos en cámara. La especie del peldaño se confirma al cotizar; no publicamos una sola recomendación cerrada.",
    },
    {
      question: "¿Los peldaños son de madera maciza?",
      answer:
        "Sí. Las huellas que fabricamos son de madera maciza, cortadas a la medida del proyecto. Las fotos del taller muestran tanto tablas cepilladas como peldaños gruesos.",
    },
    {
      question: "¿Puedo elegir el color?",
      answer:
        "Puedes pedir una terminación natural, oscura o parecida a una referencia. El acabado se confirma en la cotización, no queda fijo en esta guía.",
    },
    {
      question: "¿Qué espesor debo pedir?",
      answer:
        "El que necesite tu escalera. No publicamos un espesor estándar. Si la huella va sobre un peldaño que ya existe, recuerda que el grueso suma altura.",
    },
    {
      question: "¿Sirven para una escalera exterior?",
      answer:
        "Las referencias son de interior. Si la escalera queda a la intemperie, dilo al cotizar. No prometemos ese uso sin ver el proyecto.",
    },
    {
      question: "¿La madera incluye el pasamanos?",
      answer:
        "No. Elegir la madera de la huella no incluye pasamanos ni baranda. Esas piezas no son una línea de producto del taller.",
    },
  ],
  relatedLinks: [
    {
      href: "/guias/medidas-peldanos-escalera",
      title: "Medidas de huella y contrahuella",
      description: "Referencia general de confort y cómo anotar el pedido.",
    },
    ...clusterAndWorkshop,
  ],
  ctaTitle: "¿Dudas qué madera pedir para los peldaños?",
  ctaParagraph:
    "Escríbenos por WhatsApp con el uso de la escalera, una referencia de color y las medidas. Te orientamos entre lenga austral y pino premium al cotizar.",
  whatsappLines: [
    "Vengo desde la guía para elegir madera de peldaños.",
    "Quiero orientación de madera para huellas de escalera.",
    "Puedo contar el uso, la terminación, las medidas y la comuna.",
  ],
};

export const peldanosGuidePaths = [
  medidasPeldanosGuideConfig.canonicalPath,
  elegirMaderaPeldanosGuideConfig.canonicalPath,
] as const;

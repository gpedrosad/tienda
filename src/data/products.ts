/**
 * CATÁLOGO DE PRODUCTOS
 * 
 * Este archivo contiene todos los productos de la tienda.
 * No requiere backend ni base de datos - todo es estático.
 * 
 * CÓMO AGREGAR UN NUEVO PRODUCTO:
 * --------------------------------
 * Copia y pega este formato al final del array:
 * 
 * {
 *   id: "producto-unico-id",
 *   name: "Nombre del Producto",
 *   price: 99990,
 *   category: "Mesas" | "Sillas" | "Veladores" | "Racks" | "Repisas" | "Percheros" | "Bancas" | "Sitiales" | "Escritorios" | "Futon",
 *   description: "Descripción breve del producto", // Opcional
 *   imageUrl: "/ruta/a/imagen.jpg", // Opcional
 *   handle: "producto-unico-id", // Opcional, URL amigable si difiere del id
 *   shortPitch: "Resumen comercial breve", // Opcional, 1-2 líneas para PDP
 *   features: ["Madera seleccionada", "Terminación resistente"], // Opcional
 *   dimensions: { width: "120 cm", depth: "60 cm", height: "45 cm" }, // Opcional
 *   material: "Madera de lenga", // Opcional
 *   finish: "Barniz natural", // Opcional
 *   productionDays: 15, // Opcional, días hábiles de fabricación
 *   inStock: true, // Opcional
 *   stockNote: "Fabricación a pedido" // Opcional
 * },
 * 
 * CÓMO EDITAR UN PRODUCTO:
 * ------------------------
 * Busca el producto por su nombre o id y modifica los campos que necesites.
 * 
 * CÓMO ELIMINAR UN PRODUCTO:
 * --------------------------
 * Busca el producto y elimina todo el objeto {} incluyendo la coma.
 * 
 * NOTAS:
 * - El precio debe ser un número sin puntos ni comas (ej: 369000 para $369.000)
 * - El id debe ser único y sin espacios (usa guiones)
 * - La categoría ayuda a filtrar productos (puedes agregar más categorías si lo necesitas)
 * - imageUrl es opcional - si no lo agregas, se mostrará un placeholder
 * - Los campos de ficha técnica son opcionales; la PDP solo muestra datos disponibles
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  imageUrl?: string;
  handle?: string; // URL-friendly identifier para las páginas de producto
  shortPitch?: string;
  features?: string[];
  dimensions?: { width?: string; depth?: string; height?: string; diameter?: string };
  material?: string;
  finish?: string;
  productionDays?: number;
  inStock?: boolean;
  stockNote?: string;
}

export const products: Product[] = [
  {
    id: "mesa-nordica",
    name: "Mesa Nórdica",
    price: 369000,
    category: "Mesas",
    imageUrl: "/images/mesa-nordica-1.jpg",
    shortPitch: "Mesa de comedor nórdica en madera maciza, ideal para espacios modernos con calidez natural.",
    description:
      "La Mesa Nórdica de Idea Madera combina líneas limpias y madera seleccionada para comedores y espacios de reunión. Su diseño escandinavo aporta luminosidad y una base sólida para el uso diario. Fabricada en Chile con terminaciones cuidadas y opción de cotizar medidas personalizadas.",
    features: [
      "Madera maciza seleccionada",
      "Diseño nórdico atemporal",
      "Estructura resistente para uso diario",
      "Fabricación propia en Chile",
    ],
    dimensions: { width: "160 cm", depth: "90 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural o a elección",
    productionDays: 15,
  },
  {
    id: "piso-osaka",
    name: "Piso Osaka",
    price: 139990,
    category: "Pisos",
    imageUrl: "/images/piso-osaka-main.jpg",
    shortPitch: "Piso de madera modelo Osaka para ambientes cálidos con acabado natural y buena resistencia.",
    description:
      "El Piso Osaka de Idea Madera aporta la calidez y textura de la madera a pisos interiores. Su diseño limpio se adapta a living, dormitorios y espacios de estar contemporáneos. Cotiza por WhatsApp para confirmar metros, terminación y opciones de instalación según tu proyecto.",
    features: [
      "Acabado natural en madera",
      "Ideal para interiores residenciales",
      "Textura cálida y atemporal",
      "Cotización por metro cuadrado",
    ],
    material: "Madera seleccionada",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "silla-kentucky",
    name: "Silla Kentucky",
    price: 279000,
    category: "Sillas",
    imageUrl: "/images/silla-kentucky-1.jpg",
    shortPitch: "Silla de madera con respaldo ergonómico, pensada para comedor y uso prolongado.",
    description:
      "La Silla Kentucky destaca por su respaldo cómodo y construcción robusta en madera. Funciona bien en comedores, escritorios o espacios de trabajo en casa. Su perfil clásico se integra con mesas modernas y tradicionales. Cotiza por WhatsApp para confirmar terminación y cantidad.",
    features: [
      "Respaldo ergonómico",
      "Madera resistente al uso frecuente",
      "Perfil clásico versátil",
      "Ideal para comedor o escritorio",
    ],
    material: "Madera maciza",
    finish: "Barniz natural o negro",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-tripode",
    name: "Mesa de comedor Tripode",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-tripode-1.jpg",
    shortPitch: "Mesa de comedor con patas trípode en madera, pieza central con presencia y equilibrio visual.",
    description:
      "La Mesa de comedor Trípode es una de las piezas más reconocidas de Idea Madera. Sus patas inclinadas aportan estabilidad y un diseño distintivo para comedores amplios. El tablero en madera maciza realza la veta natural y la calidez del espacio. Disponible para cotizar con medidas y terminaciones según tu proyecto.",
    features: [
      "Patas trípode de diseño icónico",
      "Tablero en madera maciza",
      "Ideal para 6 a 8 comensales",
      "Fabricación a pedido en Chile",
    ],
    dimensions: { width: "220 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "sillon-lombardo-dos-cuerpos",
    name: "Sillón Lombardo dos cuerpos",
    price: 495990,
    category: "Sitiales",
  },
  {
    id: "mesa-comedor-liguria",
    name: "Mesa Comedor Liguria",
    price: 497000,
    category: "Mesas",
  },
  {
    id: "mesa-centro-hairpin",
    name: "Mesa de Centro Modelo Hairpin",
    price: 159990,
    category: "Mesas",
    imageUrl: "/images/mesa-de-centro-hairpin-main.png",
    shortPitch: "Mesa de centro con patas hairpin en madera, estilo mid-century para living moderno.",
    description:
      "La Mesa de Centro Hairpin combina un tablero en madera con patas metálicas tipo hairpin, un clásico del diseño mid-century. Es compacta, liviana visualmente y perfecta para living, salas de estar o espacios junto al sofá. Fabricada con terminación cuidada en taller propio.",
    features: [
      "Estilo mid-century con patas hairpin",
      "Tablero en madera maciza",
      "Formato compacto para living",
      "Diseño liviano y contemporáneo",
    ],
    dimensions: { width: "100 cm", depth: "50 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "repisa-madera-moderna",
    name: "Repisa de madera moderna",
    price: 59990,
    category: "Repisas",
  },
  {
    id: "repisa-madera-catania",
    name: "Repisa de madera modelo Catania",
    price: 59990,
    category: "Repisas",
  },
  {
    id: "mesa-comedor-genova",
    name: "Mesa Comedor Genova",
    price: 467000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-frida",
    name: "Mesa Comedor Frida",
    price: 679000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-frida-negra",
    name: "Mesa Comedor Frida Negra",
    price: 670000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-niza",
    name: "Mesa Comedor Niza",
    price: 689900,
    category: "Mesas",
    imageUrl: "/images/mesa-madera-niza-main.jpg",
    shortPitch: "Mesa de comedor rectangular en madera con línea sobria y terminación premium.",
    description:
      "La Mesa Comedor Niza ofrece un diseño rectangular equilibrado para familias y espacios de reunión. Su construcción en madera maciza prioriza durabilidad y una superficie amplia para el día a día. Es una opción versátil para quienes buscan elegancia sin exceso de ornamentación.",
    features: [
      "Formato rectangular amplio",
      "Madera maciza de alta resistencia",
      "Estilo sobrio para comedores modernos",
      "Terminación cuidada en taller propio",
    ],
    dimensions: { width: "200 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-tripode-redonda",
    name: "Mesa de comedor Tripode redonda",
    price: 729900,
    category: "Mesas",
    imageUrl: "/images/1MESATRIPODEREDONDAMADERA.jpg",
    shortPitch: "Mesa de comedor redonda con patas trípode en madera natural, diseño icónico y convivencia.",
    description:
      "La Mesa Trípode redonda une el diseño distintivo de patas inclinadas con un tablero circular en madera maciza. Favorece la conversación en comedores y optimiza la circulación. Es una variante redonda de una de las piezas más reconocidas de Idea Madera.",
    features: [
      "Formato redondo con patas trípode",
      "Madera maciza con veta natural",
      "Ideal para comedores integrados",
      "Diseño icónico Idea Madera",
    ],
    dimensions: { diameter: "140 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "silla-milan-lenga",
    name: "Silla Milán Lenga",
    price: 199000,
    category: "Sillas",
    shortPitch: "Silla de lenga con diseño contemporáneo, liviana y resistente para comedor diario.",
    description:
      "Silla de madera de lenga con diseño contemporáneo, pensada para acompañar comedores y espacios de estar con una línea limpia y resistente para uso diario. La lenga aporta tonos cálidos y buena durabilidad. Cotiza por WhatsApp para combinar cantidad, terminación y despacho.",
    features: [
      "Madera de lenga seleccionada",
      "Diseño contemporáneo liviano",
      "Resistente al uso diario",
      "Combina con mesas Idea Madera",
    ],
    material: "Madera de lenga",
    finish: "Barniz natural",
    productionDays: 15,
    imageUrl: "/images/silla-milan-lenga-main.jpg",
  },
  {
    id: "perchero-madera-verona",
    name: "Perchero de madera modelo Verona",
    price: 149990,
    category: "Percheros",
    imageUrl: "/images/perchero-verona-1.jpg",
    shortPitch: "Perchero de madera para recibidor con diseño funcional y terminación artesanal.",
    description:
      "El Perchero Verona organiza abrigos, bolsos y accesorios en el recibidor con la calidez de la madera. Su estructura estable y líneas simples aportan orden sin recargar el espacio. Una pieza práctica con acabado cuidado, ideal para entradas de casa u oficina.",
    features: [
      "Estructura estable en madera",
      "Diseño funcional para recibidor",
      "Terminación artesanal",
      "Combina con muebles Idea Madera",
    ],
    dimensions: { width: "90 cm", depth: "45 cm", height: "180 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-redonda-ferrara",
    name: "Mesa de comedor redonda modelo Ferrara",
    price: 799000,
    category: "Mesas",
    imageUrl: "/images/mesa-ferrara-redonda-3.jpg",
    shortPitch: "Mesa de comedor redonda en madera, perfecta para conversar y optimizar el espacio.",
    description:
      "La Mesa Ferrara redonda favorece la cercanía en comedores y cocinas integradas. Su formato circular facilita la circulación y convoca a reuniones informales. Fabricada en madera maciza con base estable, es una pieza de alto impacto visual con terminación artesanal.",
    features: [
      "Formato redondo para mejor convivencia",
      "Base estable en madera maciza",
      "Ideal para espacios compactos",
      "Terminación artesanal Idea Madera",
    ],
    dimensions: { diameter: "140 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "banca-griega",
    name: "Banca Griega",
    price: 279000,
    category: "Bancas",
    imageUrl: "/images/banca-griega-1.jpg",
    shortPitch: "Banca de madera estilo griego para comedor, hall o pie de cama con líneas clásicas.",
    description:
      "La Banca Griega destaca por su silueta clásica y construcción sólida en madera maciza. Funciona como asiento extra en comedor, recibidor o dormitorio. Su diseño atemporal combina con mesas y sillas de la línea Idea Madera.",
    features: [
      "Silueta clásica estilo griego",
      "Madera maciza resistente",
      "Versátil para comedor o recibidor",
      "Terminación natural cuidada",
    ],
    dimensions: { width: "130 cm", depth: "40 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "banca-griega-negra",
    name: "Banca Griega Negra",
    price: 279000,
    category: "Bancas",
  },
  {
    id: "sitial-hank-nogal",
    name: "Sitial Hank Nogal",
    price: 459990,
    category: "Sitiales",
    imageUrl: "/images/sitial-hank-nogal-main.jpg",
    shortPitch: "Sitial de madera nogal con diseño robusto para living, hall o espacios de descanso.",
    description:
      "El Sitial Hank en nogal aporta presencia y comodidad a living y espacios de estar. Su madera nogal ofrece tonos profundos y una construcción sólida pensada para el uso diario. Una pieza de autor que eleva la estética del ambiente.",
    features: [
      "Madera nogal con tonos profundos",
      "Construcción robusta y cómoda",
      "Ideal para living o hall",
      "Diseño con presencia visual",
    ],
    material: "Madera nogal",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "sitial-hank-negro",
    name: "Sitial Hank Negro",
    price: 459990,
    category: "Sitiales",
    imageUrl: "/images/sitial-hank-nero-main.jpg",
    shortPitch: "Sitial Hank en terminación negra, elegante y versátil para living contemporáneo.",
    description:
      "El Sitial Hank Negro comparte la estructura robusta del modelo nogal con una terminación oscura de alto contraste. Ideal para interiores modernos, minimalistas o espacios que buscan un acento sofisticado sin perder calidez en la madera.",
    features: [
      "Terminación negra elegante",
      "Estructura sólida y cómoda",
      "Ideal para interiores modernos",
      "Pieza de autor Idea Madera",
    ],
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
  },
  {
    id: "banca-capri",
    name: "Banca Capri",
    price: 259000,
    category: "Bancas",
    imageUrl: "/images/banca-capri-madera-main.jpg",
    shortPitch: "Banca de madera natural para comedor, recibidor o pie de cama con estilo minimalista.",
    description:
      "La Banca Capri suma asientos extra con un diseño simple y funcional. Funciona en comedores, recibidores o al pie de la cama. Su madera natural aporta calidez y combina con la línea de mesas y sillas Idea Madera. Cotiza medidas y terminación según tu espacio.",
    features: [
      "Diseño minimalista versátil",
      "Madera natural con buena resistencia",
      "Ideal para comedor o recibidor",
      "Combina con línea Capri",
    ],
    dimensions: { width: "120 cm", depth: "35 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "banca-capri-negra",
    name: "Banca Capri Negra",
    price: 259000,
    category: "Bancas",
    imageUrl: "/images/banca-capri-negra-main.jpg",
    shortPitch: "Banca Capri en madera negra, minimalista y versátil para comedor o recibidor.",
    description:
      "La Banca Capri Negra ofrece el mismo diseño funcional de la línea Capri con una terminación oscura contemporánea. Perfecta para sumar asientos en comedor, recibidor o pie de cama. Combina con mesas y sillas de terminación negra Idea Madera.",
    features: [
      "Terminación negra contemporánea",
      "Diseño minimalista Capri",
      "Versátil para varios espacios",
      "Madera maciza resistente",
    ],
    dimensions: { width: "120 cm", depth: "35 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
  },
  {
    id: "mesa-centro-ferrara",
    name: "Mesa Centro Ferrara",
    price: 379000,
    category: "Mesas",
    imageUrl: "/images/mesa-centro-ferrara-main.png",
    shortPitch: "Mesa de centro Ferrara en madera con diseño elegante para living y sala de estar.",
    description:
      "La Mesa Centro Ferrara complementa la línea Ferrara con un formato pensado para living. Su madera maciza y proporciones equilibradas permiten apoyar decoración y objetos del día a día con estilo. Terminación artesanal Idea Madera.",
    features: [
      "Línea Ferrara para living",
      "Madera maciza con acabado prolijo",
      "Proporciones equilibradas",
      "Superficie resistente al uso diario",
    ],
    dimensions: { width: "110 cm", depth: "60 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-centro-roma",
    name: "Mesa Centro Roma",
    price: 359990,
    category: "Mesas",
    imageUrl: "/images/mesa-centro-roma-main.jpg",
    shortPitch: "Mesa de centro en madera con proporciones equilibradas para living y sala de estar.",
    description:
      "La Mesa Centro Roma eleva la sala de estar con madera maciza y líneas contemporáneas. Su tamaño intermedio permite apoyar decoración, café o controles sin invadir el espacio. Es una pieza funcional con acabado cuidado, pensada para durar en el uso diario.",
    features: [
      "Tamaño ideal para living",
      "Madera maciza con terminación prolija",
      "Diseño contemporáneo equilibrado",
      "Superficie resistente al uso diario",
    ],
    dimensions: { width: "120 cm", depth: "60 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-frida-redonda",
    name: "Mesa Frida Redonda",
    price: 699990,
    category: "Mesas",
    imageUrl: "/images/mesa-frida-redonda-main.jpg",
    shortPitch: "Mesa de comedor redonda Frida en madera, diseño cálido para reuniones familiares.",
    description:
      "La Mesa Frida Redonda convoca a la mesa con un formato circular en madera maciza. Su diseño cálido y base estable la hacen ideal para comedores familiares y espacios de convivencia. Cotiza medidas y terminación por WhatsApp.",
    features: [
      "Formato redondo para convivencia",
      "Madera maciza de alta calidad",
      "Base estable y diseño cálido",
      "Ideal para comedor familiar",
    ],
    dimensions: { diameter: "150 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "velador-cubo",
    name: "Velador Cubo",
    price: 270000,
    category: "Veladores",
    imageUrl: "/images/velador-cubo-main.jpg",
    shortPitch: "Velador de madera con diseño cúbico minimalista para dormitorio contemporáneo.",
    description:
      "El Velador Cubo aporta funcionalidad y estética limpia al dormitorio. Su forma cúbica en madera maciza ofrece superficie de apoyo y un diseño que combina con interiores modernos. Terminación cuidada y fabricación chilena Idea Madera.",
    features: [
      "Diseño cúbico minimalista",
      "Madera maciza resistente",
      "Ideal para dormitorio moderno",
      "Superficie práctica de apoyo",
    ],
    dimensions: { width: "45 cm", depth: "45 cm", height: "50 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "arrimo-griego",
    name: "Arrimo Griego",
    price: 289000,
    category: "Mesas",
    imageUrl: "/images/arrimo-griego-main.jpg",
    shortPitch: "Arrimo de madera estilo griego para hall, living o comedor con almacenamiento elegante.",
    description:
      "El Arrimo Griego combina la estética clásica de la línea griega con funcionalidad de apoyo y almacenamiento. Ideal para hall, living o comedor como pieza decorativa y práctica. Fabricado en madera maciza con terminación artesanal.",
    features: [
      "Estilo clásico línea Griega",
      "Función de apoyo y almacenamiento",
      "Madera maciza con buena resistencia",
      "Versátil para hall o living",
    ],
    dimensions: { width: "120 cm", depth: "40 cm", height: "85 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-tripode-redonda-negra",
    name: "Mesa Tripode Redonda Negra",
    price: 820000,
    category: "Mesas",
    imageUrl: "/images/mesa-roma-redonda-negra-main.jpg",
    shortPitch: "Mesa redonda con patas trípode en terminación negra, diseño icónico para comedor moderno.",
    description:
      "La Mesa Trípode Redonda Negra lleva el diseño distintivo de patas inclinadas a una terminación oscura contemporánea. El tablero circular en madera favorece la convivencia en comedores modernos. Pieza de alto impacto visual con fabricación Idea Madera.",
    features: [
      "Patas trípode en terminación negra",
      "Tablero redondo en madera maciza",
      "Ideal para comedores modernos",
      "Diseño icónico de la casa",
    ],
    dimensions: { diameter: "150 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
  },
  {
    id: "mesa-tripode-ratona",
    name: "Mesa Tripode Ratona",
    price: 399990,
    category: "Mesas",
    imageUrl: "/images/1MESATRIPODERATONA.jpg",
    shortPitch: "Mesa ratona con patas trípode en madera, baja y versátil para living o sala de estar.",
    description:
      "La Mesa Trípode Ratona adapta el diseño icónico de patas inclinadas a un formato bajo ideal para living. Perfecta frente al sofá para apoyar bandejas, libros o decoración. Madera maciza con la calidad de terminación Idea Madera.",
    features: [
      "Formato ratona bajo para living",
      "Patas trípode distintivas",
      "Madera maciza resistente",
      "Ideal frente al sofá",
    ],
    dimensions: { width: "100 cm", depth: "60 cm", height: "40 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-tripode-negra",
    name: "Mesa de comedor Tripode Negra",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-tripode-negra-2.jpg",
    shortPitch: "Mesa de comedor trípode en madera negra, pieza central con diseño contemporáneo.",
    description:
      "La Mesa de comedor Trípode Negra combina la silueta icónica de patas inclinadas con una terminación oscura de alto contraste. Ideal para comedores modernos que buscan presencia y calidez en madera. Fabricación a pedido en Chile.",
    features: [
      "Patas trípode en terminación negra",
      "Tablero macizo resistente",
      "Ideal para comedores modernos",
      "Diseño distintivo Idea Madera",
    ],
    dimensions: { width: "220 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-roma-negra",
    name: "Mesa Comedor Roma Madera Negra",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-roma-negra-main.jpg",
    shortPitch: "Mesa de comedor Roma en madera negra, elegante y robusta para espacios contemporáneos.",
    description:
      "La Mesa Comedor Roma Negra ofrece la solidez de la línea Roma con una terminación oscura sofisticada. Su construcción en madera maciza soporta el uso diario en comedores familiares o proyectos de interiorismo moderno.",
    features: [
      "Línea Roma en terminación negra",
      "Madera maciza de alta resistencia",
      "Ideal para comedores contemporáneos",
      "Fabricación chilena Idea Madera",
    ],
    dimensions: { width: "200 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-roma-natural",
    name: "Mesa Comedor Roma Madera Natural",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-comedor-roma-madera-main.jpg",
    shortPitch: "Mesa de comedor Roma en madera natural, cálida y resistente para el uso diario.",
    description:
      "La Mesa Comedor Roma Natural realza la veta y tono de la madera maciza en un formato amplio para comedores. Es una pieza central duradera con estética cálida, pensada para familias y espacios de reunión frecuente.",
    features: [
      "Madera natural con veta visible",
      "Formato amplio para comedor",
      "Construcción sólida y duradera",
      "Terminación artesanal Idea Madera",
    ],
    dimensions: { width: "200 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-cantabria",
    name: "Mesa Comedor Madera Modelo Cantabria",
    price: 999000,
    category: "Mesas",
    imageUrl: "/images/mesa-comedor-madera-modelo-cantabria-main.jpg",
    shortPitch: "Mesa de comedor amplia en madera maciza, diseñada para reuniones grandes y uso intensivo.",
    description:
      "La Mesa Cantabria es una pieza de gran formato para comedores que reciben familia y visitas. Su tablero generoso en madera maciza transmite solidez y presencia. Ideal para quienes buscan una mesa central duradera con estética cálida y fabricación chilena.",
    features: [
      "Gran formato para comedor amplio",
      "Tablero macizo de alta resistencia",
      "Pieza central con fuerte presencia",
      "Fabricación a pedido en taller propio",
    ],
    dimensions: { width: "240 cm", depth: "110 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-redonda-novara",
    name: "Mesa Comedor Redonda Modelo Novara",
    price: 719990,
    category: "Mesas",
    imageUrl: "/images/mesa-comedor-redonda-modelo-novara-main.jpg",
    shortPitch: "Mesa de comedor redonda en madera con estilo moderno y base robusta.",
    description:
      "La Mesa Novara redonda combina diseño moderno con la calidez de la madera maciza. Su base estable y tablero circular favorecen la conversación en comedores y espacios abiertos. Una opción destacada para proyectos residenciales que buscan calidad y estética atemporal.",
    features: [
      "Diseño redondo moderno",
      "Base robusta en madera maciza",
      "Ideal para comedores integrados",
      "Terminación premium Idea Madera",
    ],
    dimensions: { diameter: "150 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "futon-noruega",
    name: "Futon Noruega",
    price: 499990,
    category: "Futon",
    imageUrl: "/images/futon-madera-modelo-noruega-main.jpg",
    shortPitch: "Futón de madera modelo Noruega, funcional y cálido para living o dormitorio de visitas.",
    description:
      "El Futón Noruega combina estructura en madera con un diseño funcional para living o dormitorio de visitas. Aporta asiento extra y posibilidad de descanso sin perder la estética cálida de Idea Madera. Cotiza terminación y medidas por WhatsApp.",
    features: [
      "Estructura en madera maciza",
      "Funcional para living o visitas",
      "Diseño nórdico inspirado",
      "Terminación cuidada en taller propio",
    ],
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "mesa-comedor-bolonia",
    name: "Mesa de comedor Bolonia",
    price: 679900,
    category: "Mesas",
    imageUrl: "/images/mesa-bolonia-main.jpg",
    shortPitch: "Mesa de comedor Bolonia en madera maciza, equilibrio entre elegancia y uso diario.",
    description:
      "La Mesa de comedor Bolonia ofrece un diseño equilibrado para familias y espacios de reunión. Su tablero en madera maciza y líneas sobrias la convierten en una opción versátil para comedores clásicos y contemporáneos. Fabricada en Chile por Idea Madera.",
    features: [
      "Diseño sobrio y versátil",
      "Tablero en madera maciza",
      "Ideal para comedor familiar",
      "Terminación premium en taller propio",
    ],
    dimensions: { width: "200 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
  },
  {
    id: "perchero-sofia",
    name: "Perchero Sofía",
    price: 229990,
    category: "Percheros",
  },
  {
    id: "banca-luisa",
    name: "Banca Luisa",
    price: 289990,
    category: "Bancas",
  },
  {
    id: "rack-oslo",
    name: "Rack Oslo",
    price: 719990,
    category: "Racks",
  },
  {
    id: "repisa-taipei",
    name: "Repisa Taipei",
    price: 69990,
    category: "Repisas",
  },
  {
    id: "mesa-centro-taipei",
    name: "Mesa centro Taipei",
    price: 379990,
    category: "Mesas",
  },
  {
    id: "rack-bali",
    name: "Rack Bali",
    price: 279990,
    category: "Racks",
  },
  {
    id: "mesa-centro-bali",
    name: "Mesa de centro Bali",
    price: 419990,
    category: "Mesas",
  },
  {
    id: "rack-osaka",
    name: "Rack Osaka",
    price: 529990,
    category: "Racks",
  },
  {
    id: "rack-tokio",
    name: "Rack Tokio",
    price: 569990,
    category: "Racks",
  },
  {
    id: "velador-tokio",
    name: "Velador Tokio",
    price: 379990,
    category: "Veladores",
  },
  {
    id: "mesa-comedor-osaka",
    name: "Mesa de comedor Osaka",
    price: 879990,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-luisa",
    name: "Mesa de comedor Luisa",
    price: 789990,
    category: "Mesas",
  },
  {
    id: "rack-kyoto",
    name: "Rack Kyoto",
    price: 789990,
    category: "Racks",
  },
  {
    id: "rack-helsinki",
    name: "Rack Helsinki",
    price: 639990,
    category: "Racks",
  },
  {
    id: "escritorio-mid-century",
    name: "Escritorio Mid Century",
    price: 469990,
    category: "Escritorios",
  },
  {
    id: "escritorio-mid-century-negro",
    name: "Escritorio Mid Century Negro",
    price: 469990,
    category: "Escritorios",
  },
  {
    id: "mesa-comedor-praga",
    name: "Mesa de comedor Praga",
    price: 759990,
    category: "Mesas",
  },
  {
    id: "mesa-centro-seul",
    name: "Mesa de centro Seúl",
    price: 369990,
    category: "Mesas",
  },
];

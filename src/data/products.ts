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
  seoTitle?: string;
  seoDescription?: string;
}

export function getAllProducts(): Product[] {
  return products;
}

export const products: Product[] = [
  {
    id: "mesa-nordica",
    name: "Mesa Nórdica",
    price: 369000,
    category: "Mesas",
    imageUrl: "/images/mesa-nordica-1.jpg",
    shortPitch:
      "Mesa nórdica de madera para comedor: 160 × 90 × 75 cm, líneas simples y barniz a elección.",
    description:
      "Mesa nórdica de madera para comedor. Mide 160 × 90 × 75 cm y vale $369.000. Líneas simples, madera maciza y barniz natural o a elección. Fabricada en Chillán; si necesitas otra medida, cotiza por WhatsApp. El despacho se confirma aparte según comuna. Esta ficha es la mesa nórdica de 160 × 90 cm; el conjunto de mesas nórdicas, sillas y bancas está en [comedores nórdicos](/comedores-nordicos).",
    features: [
      "Mesa de comedor estilo nórdico",
      "160 × 90 × 75 cm",
      "Madera maciza, barniz a elección",
      "Fabricación en Chillán",
    ],
    dimensions: { width: "160 cm", depth: "90 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural o a elección",
    productionDays: 15,
    seoTitle: "Mesa Nórdica de Comedor de 160×90 cm | Madera Maciza",
    seoDescription:
      "La mesa nórdica de comedor mide 160×90×75 cm, es de madera maciza con barniz a elección y vale $369.000. Cotiza por WhatsApp.",
  },
  {
    id: "piso-osaka",
    name: "Piso Osaka",
    price: 139990,
    category: "Pisos",
    imageUrl: "/images/piso-osaka-main.jpg",
    shortPitch: "Piso alto de madera modelo Osaka, con asiento firme y acabado natural, para barras y mesadas.",
    description:
      "El Piso Osaka de Idea Madera es un asiento alto de madera pensado para barras de cocina, mesadas y espacios de estar. Su diseño limpio y su acabado natural se adaptan a interiores contemporáneos. Cotiza por WhatsApp cantidad, terminación y despacho según tu comuna.",
    features: [
      "Asiento alto de madera con acabado natural",
      "Ideal para barras de cocina y mesadas",
      "Diseño limpio y atemporal",
      "Cotización por unidad según cantidad y terminación",
    ],
    material: "Madera seleccionada",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Piso Osaka de Madera | Asiento Alto para Barra",
    seoDescription:
      "Piso Osaka de madera: asiento alto para barra de cocina o mesada, fabricado en Chile. Cotiza cantidad y terminación por WhatsApp con envío a todo el país.",
  },
  {
    id: "silla-kentucky",
    name: "Silla Kentucky",
    price: 279000,
    category: "Sillas",
    imageUrl: "/images/silla-kentucky-1.jpg",
    shortPitch:
      "Silla Kentucky de madera para comedor: respaldo firme, estructura maciza y terminación artesanal.",
    description:
      "La Silla Kentucky es una silla de madera para comedor, fabricada en Chillán. Cuesta $279.000, tiene respaldo firme y sirve en mesas nórdicas o tradicionales. Cotiza cantidad y terminación por WhatsApp; despachamos a todo Chile.",
    features: [
      "Silla de comedor de madera",
      "Respaldo firme para uso diario",
      "Terminación barniz natural o negro",
      "Fabricación en Chillán",
    ],
    material: "Madera maciza",
    finish: "Barniz natural o negro",
    productionDays: 15,
    seoTitle: "Silla Kentucky de madera para comedor",
    seoDescription:
      "Silla Kentucky de madera para comedor, $279.000. Fabricada en Chillán, con envío a todo Chile. Cotiza cantidad y terminación por WhatsApp.",
  },
  {
    id: "mesa-comedor-tripode",
    name: "Mesa de comedor Tripode",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-tripode-1.jpg",
    shortPitch:
      "Mesa de comedor Trípode rectangular en madera natural: 220 × 100 × 75 cm, patas inclinadas para 6 a 8 comensales.",
    description:
      "La Mesa de comedor Trípode es una de las piezas más reconocidas de Idea Madera: patas inclinadas y tablero rectangular de 220 × 100 × 75 cm en madera maciza con barniz natural. Ideal para 6 a 8 comensales en comedores amplios. Distinta de la Trípode negra (misma medida, terminación oscura) y de las Trípode redondas. Revisa la guía de medidas de mesa de comedor o explora otras mesas de la colección. Cotiza terminación y despacho por WhatsApp.",
    features: [
      "Patas trípode de diseño icónico",
      "Tablero rectangular 220 × 100 cm",
      "Ideal para 6 a 8 comensales",
      "Barniz natural, fabricación a pedido en Chile",
    ],
    dimensions: { width: "220 cm", depth: "100 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa Comedor Trípode 220×100 cm | Madera Natural",
    seoDescription:
      "Mesa de comedor Trípode en madera maciza, 220×100 cm con barniz natural. Patas inclinadas para 6 a 8 comensales. Desde $699.000, cotiza por WhatsApp.",
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
    imageUrl: "/images/mesa-de-centro-hairpin-main.webp",
    shortPitch:
      "Mesa de centro Hairpin de 100 × 50 × 45 cm: patas metálicas mid-century y tablero de madera maciza para living.",
    description:
      "La Mesa de Centro Hairpin mide 100 × 50 × 45 cm: tablero de madera maciza con barniz natural y patas metálicas tipo hairpin, el clásico mid-century para living. Es compacta y liviana visualmente, distinta de la Roma (120 × 60 × 45 cm) y de la Trípode ratona (100 × 60 × 40 cm, patas inclinadas). Mira otras piezas en [mesas de centro](/mesas-de-centro) o cotiza por WhatsApp.",
    features: [
      "Estilo mid-century con patas hairpin",
      "Tablero en madera maciza",
      "100 × 50 × 45 cm",
      "Formato compacto para living",
    ],
    dimensions: { width: "100 cm", depth: "50 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa Centro Hairpin 100×50 cm | Living Mid-Century",
    seoDescription:
      "Mesa de centro Hairpin en madera maciza, 100×50×45 cm, patas metálicas mid-century y barniz natural para living. Desde $159.990, cotiza por WhatsApp.",
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
    shortPitch:
      "Mesa de comedor Trípode redonda en madera natural: Ø140 × 75 cm, patas inclinadas y tablero circular.",
    description:
      "La Mesa Trípode Redonda es una mesa de comedor circular de madera maciza de Ø140 cm y 75 cm de alto, con patas inclinadas y barniz natural, fabricada en Chile por Idea Madera. El tablero redondo favorece la conversación; la guía de medidas usa Ø140 cm como referencia para 6-8 personas. Distinta de la Trípode rectangular (220 × 100 cm) y de la Trípode redonda negra (Ø150 cm). Explora otras mesas de la colección o cotiza por WhatsApp con envío a todo Chile.",
    features: [
      "Formato redondo Ø140 cm con patas trípode",
      "Madera maciza con barniz natural",
      "Referencia 6-8 personas (guía de medidas)",
      "Diseño icónico Idea Madera",
    ],
    dimensions: { diameter: "140 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa Comedor Trípode Redonda Ø140 cm | Madera Maciza",
    seoDescription:
      "Mesa de comedor Trípode redonda en madera maciza, Ø140 cm con barniz natural. Formato circular para 6-8 personas. Desde $729.900, cotiza por WhatsApp.",
  },
  {
    id: "silla-milan-lenga",
    name: "Silla Milán Lenga",
    price: 199000,
    category: "Sillas",
    shortPitch: "Silla de lenga con diseño contemporáneo, liviana y resistente para comedor diario.",
    description:
      "La Silla Milán en madera de lenga es una pieza contemporánea fabricada en Chile para comedores y espacios de estar. Con diseño liviano, líneas limpias y madera de lenga seleccionada, aporta tonos cálidos y durabilidad para el uso diario. Ideal para combinar con mesas de comedor de madera maciza. Cotiza cantidad, terminación y despacho por WhatsApp.",
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
    seoTitle: "Silla Milán Lenga | Comedor Madera Maciza",
    seoDescription:
      "Silla Milán en madera de lenga, diseño contemporáneo liviano para comedor diario. Desde $199.000. Cotiza por WhatsApp con envío a todo Chile.",
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
    shortPitch:
      "Mesa de comedor redonda Ferrara, Ø140 cm y 75 cm de alto, en madera maciza con base estable.",
    description:
      "La Mesa Ferrara redonda mide Ø140 cm y 75 cm de alto, en madera maciza con barniz natural y base estable. El formato circular favorece la cercanía y la circulación en espacios compactos. Comparte el diámetro con la Trípode redonda (Ø140 cm, patas inclinadas) y es más chica que la Novara (Ø150 cm). Cotiza por WhatsApp.",
    features: [
      "Formato redondo Ø140 cm",
      "Base estable en madera maciza",
      "Ideal para espacios compactos",
      "Terminación artesanal Idea Madera",
    ],
    dimensions: { diameter: "140 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa Comedor Ferrara Redonda Ø140 cm | Madera Maciza",
    seoDescription:
      "Mesa de comedor redonda Ferrara, Ø140×75 cm, en madera maciza con barniz natural, desde $799.000. Cotiza por WhatsApp.",
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
      "El Sitial Hank Negro es un sillón individual de madera maciza con terminación en barniz negro, fabricado en Chile por Idea Madera. Estructura robusta y cómoda ideal para living, sala de lectura, oficina o dormitorio principal en espacios que buscan un acento sofisticado sin perder la calidez de la madera. Complementa con otros sitiales de madera de la colección. Cotiza por WhatsApp con envío a todo Chile.",
    features: [
      "Terminación negra elegante",
      "Estructura sólida y cómoda",
      "Ideal para interiores modernos",
      "Pieza de autor Idea Madera",
    ],
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
    seoTitle: "Sitial Hank Negro | Sillón Madera Maciza Living",
    seoDescription:
      "Sitial Hank Negro en madera maciza con terminación elegante para living, oficina o dormitorio. Desde $459.990, cotiza por WhatsApp con envío a todo Chile.",
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
    imageUrl: "/images/mesa-centro-ferrara-main.webp",
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
    name: "Mesa de centro Roma",
    price: 359990,
    category: "Mesas",
    imageUrl: "/images/mesa-centro-roma-main.jpg",
    shortPitch:
      "Mesa de centro Roma de madera para living: 120 × 60 × 45 cm, formato ratona frente al sofá.",
    description:
      "La Mesa de Centro Roma es una mesa ratona de madera maciza para living, fabricada en Chillán con medidas 120 × 60 × 45 cm. Pieza baja ideal para colocar frente al sofá, con barniz natural que resalta la calidez de la madera. Distinta de las mesas de comedor Roma. Complementa con otras mesas de centro en madera o explora la colección completa de mesas. Cotiza terminación y despacho por WhatsApp.",
    features: [
      "Mesa de centro / ratona para living",
      "120 × 60 × 45 cm",
      "Madera maciza, barniz natural",
      "No es la mesa de comedor Roma",
    ],
    dimensions: { width: "120 cm", depth: "60 cm", height: "45 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa Centro Roma 120×60 cm | Ratona Madera Living",
    seoDescription:
      "Mesa de centro Roma en madera maciza, 120 × 60 × 45 cm para living. Mesa ratona con barniz natural. Desde $359.990, cotiza por WhatsApp.",
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
    shortPitch:
      "Mesa Trípode redonda negra para comedor: Ø150 × 75 cm, patas inclinadas y terminación oscura.",
    description:
      "La Mesa Trípode Redonda Negra lleva el diseño de patas inclinadas a un tablero circular de Ø150 cm y 75 cm de alto, con terminación en barniz negro. Pieza de comedor contemporánea, distinta de la Trípode redonda en barniz natural (Ø140 cm) y de la Trípode rectangular negra (220 × 100 cm). Revisa la guía de medidas de mesa de comedor o explora otras mesas de la colección. Cotiza por WhatsApp con envío a todo Chile.",
    features: [
      "Patas trípode en terminación negra",
      "Tablero redondo Ø150 cm en madera maciza",
      "Barniz negro para comedores modernos",
      "Diseño icónico de la casa",
    ],
    dimensions: { diameter: "150 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz negro",
    productionDays: 15,
    seoTitle: "Mesa Trípode Redonda Negra Ø150 cm | Madera Maciza",
    seoDescription:
      "Mesa Trípode redonda negra en madera maciza, Ø150 cm con patas inclinadas. Terminación oscura para comedor. Desde $820.000, cotiza por WhatsApp.",
  },
  {
    id: "mesa-tripode-ratona",
    name: "Mesa ratona trípode",
    price: 399990,
    category: "Mesas",
    imageUrl: "/images/1MESATRIPODERATONA.jpg",
    shortPitch:
      "Mesa trípode de madera estilo ratona para living: patas inclinadas, 100 × 60 × 40 cm. Diseño orgánico.",
    description:
      "Mesa trípode de madera en formato ratona (baja) para living. El diseño trípode tiene tres patas inclinadas que dan estabilidad y un toque orgánico. Mide 100 × 60 × 40 cm, vale $399.990 y va frente al sofá. Las patas inclinadas dejan espacio para las piernas y hacen que la mesa se vea liviana visualmente. Si buscas más opciones de mesas ratonas de distintos estilos (Roma, Ferrara, Hairpin, Bali, Seúl, Taipei), revisa nuestra colección completa de mesas ratonas de madera. Fabricada en Chillán; cotiza terminación y despacho por WhatsApp.",
    features: [
      "Mesa trípode de madera maciza",
      "Formato ratona / mesa de centro baja",
      "Patas inclinadas estilo trípode orgánico",
      "100 × 60 × 40 cm",
      "Fabricación en Chillán",
    ],
    dimensions: { width: "100 cm", depth: "60 cm", height: "40 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa Trípode de Madera Estilo Ratona 100x60 | Living",
    seoDescription:
      "Mesa trípode de madera estilo ratona para living (100×60 cm, $399.990). Patas inclinadas, altura 40 cm. Diseño orgánico. Fabricada en Chile, cotiza por WhatsApp.",
  },
  {
    id: "mesa-comedor-tripode-negra",
    name: "Mesa de comedor Tripode Negra",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-tripode-negra-2.jpg",
    shortPitch: "Mesa de comedor trípode en madera negra, pieza central con diseño contemporáneo.",
    description:
      "La Mesa de Comedor Trípode Negra es una pieza de madera maciza de 220×100 cm con patas inclinadas y terminación en barniz negro, fabricada en Chile por Idea Madera. Diseño icónico que combina presencia visual y calidez natural para comedores modernos y contemporáneos. Ideal para proyectos de interiorismo que buscan una mesa de comedor con carácter. Consulta la guía de medidas para mesa de comedor o explora otras mesas de la colección. Fabricación a pedido, cotiza por WhatsApp con envío a todo Chile.",
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
    seoTitle: "Mesa Comedor Trípode Negra 220×100 cm | Madera Maciza",
    seoDescription:
      "Mesa de comedor Trípode Negra en madera maciza, 220×100 cm con terminación negra. Diseño contemporáneo para 6-8 personas. Desde $699.000.",
  },
  {
    id: "mesa-comedor-roma-negra",
    name: "Mesa Comedor Roma Madera Negra",
    price: 699000,
    category: "Mesas",
    imageUrl: "/images/mesa-roma-negra-main.jpg",
    shortPitch: "Mesa de comedor Roma en madera negra, elegante y robusta para espacios contemporáneos.",
    description:
      "La Mesa de Comedor Roma Negra es una pieza de madera maciza de 200×100 cm con terminación en barniz oscuro, fabricada en Chile por Idea Madera. Construcción robusta para uso diario en comedores familiares o proyectos de interiorismo moderno. La línea Roma también está disponible en madera natural. Complementa con sillas de comedor de madera o revisa la guía para elegir medidas de mesa de comedor. Cotiza por WhatsApp con envío a todo Chile.",
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
    seoTitle: "Mesa Comedor Roma Negra 200×100 cm | Madera Maciza",
    seoDescription:
      "Mesa de comedor Roma Negra en madera maciza, 200×100 cm con terminación oscura. Robusta para 6-8 personas. Desde $699.000, cotiza por WhatsApp.",
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
    shortPitch:
      "Mesa de comedor Cantabria de gran formato, 240 × 110 × 75 cm, en madera maciza para reuniones grandes.",
    description:
      "La Mesa Cantabria es una pieza de gran formato: 240 × 110 × 75 cm en madera maciza con barniz natural, para comedores que reciben familia y visitas. El tablero es más largo que la Roma (200 × 100 cm) y que la Trípode rectangular (220 × 100 cm). Cotiza por WhatsApp.",
    features: [
      "Gran formato para comedor amplio",
      "240 × 110 × 75 cm",
      "Tablero macizo de alta resistencia",
      "Fabricación a pedido en taller propio",
    ],
    dimensions: { width: "240 cm", depth: "110 cm", height: "75 cm" },
    material: "Madera maciza",
    finish: "Barniz natural",
    productionDays: 15,
    seoTitle: "Mesa de Comedor Cantabria 240×110 cm | Gran Formato",
    seoDescription:
      "Mesa de comedor Cantabria, gran formato 240×110×75 cm, madera maciza y barniz natural. Más larga que Roma y Trípode. Desde $999.000, cotiza por WhatsApp.",
  },
  {
    id: "mesa-comedor-redonda-novara",
    name: "Mesa Comedor Redonda Modelo Novara",
    price: 719990,
    category: "Mesas",
    imageUrl: "/images/mesa-comedor-redonda-modelo-novara-main.jpg",
    shortPitch: "Mesa de comedor redonda en madera con estilo moderno y base robusta.",
    description:
      "La Mesa de Comedor Redonda Novara es una pieza de madera maciza con diámetro de 150 cm y diseño moderno, fabricada en Chile por Idea Madera. Su base estable y tablero circular favorecen la conversación y optimizan el espacio en comedores integrados, cocinas abiertas o salones familiares. El formato redondo permite acomodar de 6 a 8 personas cómodamente. Explora otras mesas de comedor de madera o consulta la guía de medidas para elegir el tamaño ideal. Cotiza por WhatsApp con envío a todo Chile.",
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
    seoTitle: "Mesa Comedor Redonda Novara Ø150 cm | Madera Maciza",
    seoDescription:
      "Mesa de comedor redonda Novara en madera maciza, Ø150 cm para 6-8 personas. Diseño moderno con base robusta. Desde $719.990, cotiza por WhatsApp.",
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

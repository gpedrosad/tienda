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
 *   imageUrl: "/ruta/a/imagen.jpg" // Opcional
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
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export const products: Product[] = [
  {
    id: "mesa-nordica",
    name: "Mesa Nórdica",
    price: 369000,
    category: "Mesas",
  },
  {
    id: "piso-osaka",
    name: "Piso Osaka",
    price: 139990,
    category: "Pisos",
  },
  {
    id: "silla-kentucky",
    name: "Silla Kentucky",
    price: 279000,
    category: "Sillas",
  },
  {
    id: "mesa-comedor-tripode",
    name: "Mesa de comedor Tripode",
    price: 699000,
    category: "Mesas",
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
  },
  {
    id: "mesa-comedor-tripode-redonda",
    name: "Mesa de comedor Tripode redonda",
    price: 729900,
    category: "Mesas",
  },
  {
    id: "silla-milan-lenga",
    name: "Silla Milán Lenga",
    price: 199000,
    category: "Sillas",
  },
  {
    id: "perchero-madera-verona",
    name: "Perchero de madera modelo Verona",
    price: 149990,
    category: "Percheros",
  },
  {
    id: "mesa-comedor-redonda-ferrara",
    name: "Mesa de comedor redonda modelo Ferrara",
    price: 799000,
    category: "Mesas",
  },
  {
    id: "banca-griega",
    name: "Banca Griega",
    price: 279000,
    category: "Bancas",
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
  },
  {
    id: "sitial-hank-negro",
    name: "Sitial Hank Negro",
    price: 459990,
    category: "Sitiales",
  },
  {
    id: "banca-capri",
    name: "Banca Capri",
    price: 259000,
    category: "Bancas",
  },
  {
    id: "mesa-centro-ferrara",
    name: "Mesa Centro Ferrara",
    price: 379000,
    category: "Mesas",
  },
  {
    id: "mesa-centro-roma",
    name: "Mesa Centro Roma",
    price: 359990,
    category: "Mesas",
  },
  {
    id: "mesa-frida-redonda",
    name: "Mesa Frida Redonda",
    price: 699990,
    category: "Mesas",
  },
  {
    id: "velador-cubo",
    name: "Velador Cubo",
    price: 270000,
    category: "Veladores",
  },
  {
    id: "arrimo-griego",
    name: "Arrimo Griego",
    price: 289000,
    category: "Mesas",
  },
  {
    id: "mesa-tripode-redonda-negra",
    name: "Mesa Tripode Redonda Negra",
    price: 820000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-tripode-negra",
    name: "Mesa de comedor Tripode Negra",
    price: 699000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-roma-negra",
    name: "Mesa Comedor Roma Madera Negra",
    price: 699000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-roma-natural",
    name: "Mesa Comedor Roma Madera Natural",
    price: 699000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-cantabria",
    name: "Mesa Comedor Madera Modelo Cantabria",
    price: 999000,
    category: "Mesas",
  },
  {
    id: "mesa-comedor-redonda-novara",
    name: "Mesa Comedor Redonda Modelo Novara",
    price: 719990,
    category: "Mesas",
  },
  {
    id: "futon-noruega",
    name: "Futon Noruega",
    price: 499990,
    category: "Futon",
  },
  {
    id: "mesa-comedor-bolonia",
    name: "Mesa de comedor Bolonia",
    price: 679900,
    category: "Mesas",
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
    id: "velador-oslo",
    name: "Velador Modelo Oslo",
    price: 359000,
    category: "Veladores",
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

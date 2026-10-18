import { getCategoryOptions } from "@/lib/catalog";

export const ALL_PRODUCTS_COLLECTION_PATH = "/collections/todos-los-productos";

export const collectionNavLinks = getCategoryOptions().map(({ category, handle, count }) => ({
  label: category,
  href: `/collections/${handle}`,
  count,
}));

export const customMadeNavLinks = [
  { label: "Muebles en Chillán", href: "/muebles-chillan" },
  { label: "Puertas", href: "/puertas-a-medida" },
  { label: "Peldaños", href: "/peldanos-a-medida" },
  { label: "Cubiertas", href: "/cubiertas-a-medida" },
  { label: "Molduras", href: "/molduras-a-medida" },
  { label: "Muebles de cocina", href: "/muebles-de-cocina-chillan" },
];

export const KIT_PERGOLA_PATH = "/kit-pergola";

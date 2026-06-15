import { getCategoryOptions } from "@/lib/catalog";

export const ALL_PRODUCTS_COLLECTION_PATH = "/collections/todos-los-productos";

export const collectionNavLinks = getCategoryOptions().map(({ category, handle, count }) => ({
  label: category,
  href: `/collections/${handle}`,
  count,
}));

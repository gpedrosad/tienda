import { products, type Product } from "@/data/products";

export const CATEGORY_PRIORITY = [
  "Mesas",
  "Sillas",
  "Bancas",
  "Racks",
  "Veladores",
  "Sitiales",
  "Repisas",
  "Escritorios",
  "Percheros",
  "Pisos",
  "Futon",
];

export const FEATURED_PRODUCT_IDS = [
  "mesa-nordica",
  "mesa-comedor-tripode",
  "mesa-comedor-cantabria",
  "mesa-comedor-redonda-ferrara",
  "mesa-comedor-niza",
  "mesa-comedor-redonda-novara",
  "silla-milan-lenga",
  "silla-kentucky",
  "banca-capri",
  "mesa-centro-roma",
  "mesa-centro-ferrara",
  "perchero-madera-verona",
];

export function hasProductImage(product: Product) {
  return Boolean(product.imageUrl);
}

export function getVisibleProducts(items: Product[] = products) {
  return items.filter(hasProductImage);
}

export function slugifyCategory(category: string) {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategoryRank(category: string) {
  const index = CATEGORY_PRIORITY.indexOf(category);
  return index === -1 ? CATEGORY_PRIORITY.length : index;
}

export function getCategoryByHandle(handle: string) {
  return CATEGORY_PRIORITY.find((category) => slugifyCategory(category) === handle);
}

export function getCategoryOptions(items: Product[] = getVisibleProducts()) {
  const counts = items.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts)
    .sort((first, second) => {
      const rankDelta = getCategoryRank(first) - getCategoryRank(second);
      return rankDelta || first.localeCompare(second, "es");
    })
    .map((category) => ({
      category,
      count: counts[category],
      handle: slugifyCategory(category),
    }));
}

export function sortProductsForCatalog(items: Product[]) {
  return [...items].sort((first, second) => {
    const firstFeatured = FEATURED_PRODUCT_IDS.indexOf(first.id);
    const secondFeatured = FEATURED_PRODUCT_IDS.indexOf(second.id);

    if (firstFeatured !== -1 || secondFeatured !== -1) {
      if (firstFeatured === -1) return 1;
      if (secondFeatured === -1) return -1;
      return firstFeatured - secondFeatured;
    }

    const categoryDelta = getCategoryRank(first.category) - getCategoryRank(second.category);
    if (categoryDelta) return categoryDelta;

    const imageDelta = Number(!first.imageUrl) - Number(!second.imageUrl);
    if (imageDelta) return imageDelta;

    return first.name.localeCompare(second.name, "es");
  });
}

export function getFeaturedProducts(limit = 12) {
  const productById = new Map(getVisibleProducts().map((product) => [product.id, product]));

  return FEATURED_PRODUCT_IDS.map((id) => productById.get(id))
    .filter((product): product is Product => Boolean(product))
    .slice(0, limit);
}

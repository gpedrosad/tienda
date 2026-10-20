import type { Product } from "@/data/products";
import { getVisibleProducts } from "@/lib/catalog";
import { COFFEE_TABLE_WITH_SIZES, DINING_TABLE_IDS } from "@/lib/mesa-groups";
import { galleryImagesForProduct } from "@/lib/product-gallery";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

/**
 * Feed de productos para Google Merchant Center (listados gratuitos de Shopping).
 * Solo productos con foto (los mismos que son indexables) y solo datos del catálogo:
 * no se inventan GTIN, colores ni costos de envío (el envío se configura en la cuenta).
 */

/** Categorías de la taxonomía de Google (en-US) que corresponden con seguridad a cada categoría del catálogo. */
const GOOGLE_CATEGORY_BY_CATEGORY: Record<string, string> = {
  Sillas: "Furniture > Chairs",
  Bancas: "Furniture > Benches",
  Veladores: "Furniture > Tables > Nightstands",
  Racks: "Furniture > Entertainment Centers & TV Stands",
  Escritorios: "Furniture > Office Furniture > Desks",
  Repisas: "Furniture > Shelving",
  Futon: "Furniture > Futons",
  Sitiales: "Furniture > Chairs > Arm Chairs, Recliners & Sleeper Chairs",
  Pisos: "Furniture > Chairs > Table & Bar Stools",
};

const MAX_ADDITIONAL_IMAGES = 10;

function googleProductCategory(product: Product) {
  if (product.category === "Mesas") {
    if (DINING_TABLE_IDS.has(product.id)) return "Furniture > Tables > Kitchen & Dining Room Tables";
    if (COFFEE_TABLE_WITH_SIZES.has(product.id)) return "Furniture > Tables > Accent Tables > Coffee Tables";
    return "Furniture > Tables";
  }
  return GOOGLE_CATEGORY_BY_CATEGORY[product.category];
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Quita los enlaces markdown `[texto](url)` que usan las descripciones del catálogo. */
function plainText(value: string) {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
}

function cmValue(value?: string) {
  const match = value?.match(/(\d+(?:[.,]\d+)?)/);
  return match ? match[1].replace(",", ".") : undefined;
}

function sizeLabel(product: Product) {
  const { width, depth, height, diameter } = product.dimensions ?? {};
  if (diameter && height) return `Ø${cmValue(diameter)} × ${cmValue(height)} cm`;
  const parts = [width, depth, height].map(cmValue).filter(Boolean);
  return parts.length === 3 ? `${parts.join(" × ")} cm` : undefined;
}

function feedTitle(product: Product) {
  const base = /madera/i.test(product.name) ? product.name : `${product.name} de madera`;
  const size = sizeLabel(product);
  return (size ? `${base} ${size}` : base).slice(0, 150);
}

function feedItem(product: Product) {
  const [primary, ...rest] = galleryImagesForProduct(product);
  const imageLink = primary ?? product.imageUrl!;
  const additional = rest.slice(0, MAX_ADDITIONAL_IMAGES);
  const description = plainText(product.description ?? product.shortPitch ?? product.name).slice(0, 5000);
  const category = googleProductCategory(product);
  const { width, depth, height, diameter } = product.dimensions ?? {};
  const length = cmValue(width ?? diameter);
  const productWidth = cmValue(depth ?? diameter);
  const productHeight = cmValue(height);

  const fields: Array<[string, string | undefined]> = [
    ["g:id", product.handle || product.id],
    ["g:title", feedTitle(product)],
    ["g:description", description],
    ["g:link", absoluteUrl(getProductPath(product))],
    ["g:image_link", absoluteUrl(imageLink)],
    ...additional.map((src): [string, string] => ["g:additional_image_link", absoluteUrl(src)]),
    ["g:availability", product.inStock === false ? "out_of_stock" : "in_stock"],
    ["g:price", `${product.price} CLP`],
    ["g:condition", "new"],
    ["g:brand", SITE_NAME],
    ["g:identifier_exists", "no"],
    ["g:google_product_category", category],
    ["g:product_type", `Muebles > ${product.category}`],
    ["g:material", product.material],
    ["g:product_length", length ? `${length} cm` : undefined],
    ["g:product_width", productWidth ? `${productWidth} cm` : undefined],
    ["g:product_height", productHeight ? `${productHeight} cm` : undefined],
  ];

  const body = fields
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([tag, value]) => `      <${tag}>${escapeXml(value)}</${tag}>`)
    .join("\n");
  return `    <item>\n${body}\n    </item>`;
}

export function buildMerchantFeed(items: Product[] = getVisibleProducts()) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Muebles de madera fabricados en Chillán. Precios con IVA incluido.</description>
${items.map(feedItem).join("\n")}
  </channel>
</rss>
`;
}

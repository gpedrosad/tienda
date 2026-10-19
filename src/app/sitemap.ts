import type { MetadataRoute } from "next";
import { readdirSync } from "fs";
import path from "path";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts } from "@/lib/catalog";
import { ALL_PRODUCTS_HANDLE } from "@/lib/collection-seo";
import {
  FALLBACK_UPDATED_AT,
  updatedAtForCollection,
  updatedAtForRoute,
} from "@/lib/content-updated-at";
import { SITE_URL } from "@/lib/seo";
import { sitemapImagesForProduct, sitemapImagesForRoute } from "@/lib/sitemap-images";
import { getProductPath } from "@/lib/whatsapp";

const APP_DIR = path.join(process.cwd(), "src", "app");

type DiscoveredRoute = { route: string; file: string };

/** Rutas estáticas de `src/app`. Una `page.tsx` nueva entra al sitemap sin lista manual. */
function discoverStaticRoutes(dir = APP_DIR, route = ""): DiscoveredRoute[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const found: DiscoveredRoute[] = [];
  const page = entries.find((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name));

  if (page) {
    found.push({
      route: route || "/",
      file: path.relative(process.cwd(), path.join(dir, page.name)),
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "api" || entry.name === "components" || entry.name.startsWith("_")) continue;
    if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
      found.push(...discoverStaticRoutes(path.join(dir, entry.name), route));
      continue;
    }
    if (entry.name.startsWith("[") || entry.name.startsWith("@")) continue;
    found.push(...discoverStaticRoutes(path.join(dir, entry.name), `${route}/${entry.name}`));
  }

  return found;
}

function staticMeta(route: string): Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority"> {
  if (route === "/") return { changeFrequency: "daily", priority: 1 };
  if (route === "/ofertas") return { changeFrequency: "weekly", priority: 0.9 };
  if (route === "/guias") return { changeFrequency: "monthly", priority: 0.85 };
  if (route.startsWith("/guias/")) return { changeFrequency: "monthly", priority: 0.8 };
  if (
    route === "/kit-pergola" ||
    route === "/tiny-house-dlt" ||
    route === "/comedores-nordicos" ||
    route === "/mesas-de-centro"
  ) {
    return { changeFrequency: "monthly", priority: 0.85 };
  }
  return { changeFrequency: "monthly", priority: 0.9 };
}

function entry(
  url: string,
  meta: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">,
  lastModified: string | undefined,
  images?: string[],
): MetadataRoute.Sitemap[number] {
  return {
    url,
    ...meta,
    lastModified: lastModified || FALLBACK_UPDATED_AT,
    ...(images && images.length > 0 ? { images } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const visibleProducts = getVisibleProducts(products);

  const staticPages = discoverStaticRoutes().map(({ route }) =>
    entry(
      route === "/" ? SITE_URL : `${SITE_URL}${route}`,
      staticMeta(route),
      updatedAtForRoute(route),
      sitemapImagesForRoute(route),
    ),
  );

  const collectionPages: MetadataRoute.Sitemap = [
    entry(
      `${SITE_URL}/collections/${ALL_PRODUCTS_HANDLE}`,
      { changeFrequency: "weekly", priority: 0.85 },
      updatedAtForCollection(ALL_PRODUCTS_HANDLE),
    ),
    ...getCategoryOptions(visibleProducts).map((option) =>
      entry(
        `${SITE_URL}/collections/${option.handle}`,
        { changeFrequency: "weekly", priority: 0.8 },
        updatedAtForCollection(option.handle),
      ),
    ),
  ];

  const productPages: MetadataRoute.Sitemap = visibleProducts.map((product) =>
    entry(
      `${SITE_URL}${getProductPath(product)}`,
      { changeFrequency: "weekly", priority: 0.75 },
      product.updatedAt,
      sitemapImagesForProduct(product),
    ),
  );

  return [...staticPages, ...collectionPages, ...productPages];
}

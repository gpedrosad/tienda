import type { MetadataRoute } from "next";
import { execSync } from "child_process";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts } from "@/lib/catalog";
import { serviceLandingPaths } from "@/lib/service-landings";
import { SITE_URL } from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

const ALL_PRODUCTS_HANDLE = "todos-los-productos";

// lastModified derivado de git log del archivo que define cada recurso (criterio: última modificación del source)
// Para productos: git log de src/data/products.ts; para landings: src/lib/service-landings.ts
function getLastModified(filepath: string): Date | undefined {
  try {
    const timestamp = execSync(`git log --format="%at" --max-count=1 -- ${filepath}`, { encoding: 'utf-8' }).trim();
    return timestamp ? new Date(parseInt(timestamp) * 1000) : undefined;
  } catch {
    return undefined;
  }
}

const productsLastMod = getLastModified('src/data/products.ts');
const landingsLastMod = getLastModified('src/lib/service-landings.ts');

export default function sitemap(): MetadataRoute.Sitemap {
  const visibleProducts = getVisibleProducts(products);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
      lastModified: landingsLastMod,
    },
    {
      url: `${SITE_URL}/ofertas`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: productsLastMod,
    },
    ...serviceLandingPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      lastModified: landingsLastMod,
    })),
    {
      url: `${SITE_URL}/kit-pergola`,
      changeFrequency: "monthly",
      priority: 0.85,
      lastModified: landingsLastMod,
    },
    {
      url: `${SITE_URL}/tiny-house-dlt`,
      changeFrequency: "monthly",
      priority: 0.85,
      lastModified: landingsLastMod,
    },
    {
      url: `${SITE_URL}/comedores-nordicos`,
      changeFrequency: "monthly",
      priority: 0.85,
      lastModified: landingsLastMod,
    },
    {
      url: `${SITE_URL}/mesas-de-centro`,
      changeFrequency: "weekly",
      priority: 0.85,
      lastModified: landingsLastMod,
    },
  ];

  const collectionPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/collections/${ALL_PRODUCTS_HANDLE}`,
      changeFrequency: "weekly",
      priority: 0.85,
      lastModified: productsLastMod,
    },
    ...getCategoryOptions(visibleProducts).map((option) => ({
      url: `${SITE_URL}/collections/${option.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: productsLastMod,
    })),
  ];

  const productPages: MetadataRoute.Sitemap = visibleProducts.map((product) => ({
    url: `${SITE_URL}${getProductPath(product)}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
    lastModified: productsLastMod,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}

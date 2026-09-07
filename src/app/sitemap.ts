import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts } from "@/lib/catalog";
import { serviceLandingPaths } from "@/lib/service-landings";
import { SITE_URL } from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

const ALL_PRODUCTS_HANDLE = "todos-los-productos";

// SEO-05: no hay fechas de edición reales por URL en el catálogo (sin `updatedAt`),
// así que se omite `lastModified` en lugar de renovarlo artificialmente en cada build.
export default function sitemap(): MetadataRoute.Sitemap {
  const visibleProducts = getVisibleProducts(products);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ofertas`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceLandingPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/kit-pergola`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tiny-house-dlt`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/comedores-nordicos`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/mesas-de-centro`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const collectionPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/collections/${ALL_PRODUCTS_HANDLE}`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...getCategoryOptions(visibleProducts).map((option) => ({
      url: `${SITE_URL}/collections/${option.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const productPages: MetadataRoute.Sitemap = visibleProducts.map((product) => ({
    url: `${SITE_URL}${getProductPath(product)}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}

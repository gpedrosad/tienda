import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

const ALL_PRODUCTS_HANDLE = "todos-los-productos";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const visibleProducts = getVisibleProducts(products);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ofertas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/peldanos-a-medida`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const collectionPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/collections/${ALL_PRODUCTS_HANDLE}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...getCategoryOptions(visibleProducts).map((option) => ({
      url: `${SITE_URL}/collections/${option.handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  const productPages: MetadataRoute.Sitemap = visibleProducts.map((product) => ({
    url: `${SITE_URL}${getProductPath(product)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...collectionPages, ...productPages];
}

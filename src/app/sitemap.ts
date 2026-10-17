import type { MetadataRoute } from "next";
import { execSync } from "child_process";
import { readdirSync } from "fs";
import path from "path";
import { products } from "@/data/products";
import { getCategoryOptions, getVisibleProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";
import { getProductPath } from "@/lib/whatsapp";

const ALL_PRODUCTS_HANDLE = "todos-los-productos";
const APP_DIR = path.join(process.cwd(), "src", "app");

function gitLastModified(filepath: string): Date | undefined {
  try {
    const timestamp = execSync(`git log -1 --format=%ct -- ${filepath}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!timestamp) return undefined;
    const date = new Date(Number(timestamp) * 1000);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

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
  lastModified: Date | undefined,
): MetadataRoute.Sitemap[number] {
  return lastModified ? { url, ...meta, lastModified } : { url, ...meta };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const visibleProducts = getVisibleProducts(products);
  const productsLastMod = gitLastModified("src/data/products.ts");

  const staticPages = discoverStaticRoutes().map(({ route, file }) =>
    entry(route === "/" ? SITE_URL : `${SITE_URL}${route}`, staticMeta(route), gitLastModified(file)),
  );

  const collectionPages: MetadataRoute.Sitemap = [
    entry(
      `${SITE_URL}/collections/${ALL_PRODUCTS_HANDLE}`,
      { changeFrequency: "weekly", priority: 0.85 },
      productsLastMod,
    ),
    ...getCategoryOptions(visibleProducts).map((option) =>
      entry(
        `${SITE_URL}/collections/${option.handle}`,
        { changeFrequency: "weekly", priority: 0.8 },
        productsLastMod,
      ),
    ),
  ];

  const productPages: MetadataRoute.Sitemap = visibleProducts.map((product) =>
    entry(
      `${SITE_URL}${getProductPath(product)}`,
      { changeFrequency: "weekly", priority: 0.75 },
      productsLastMod,
    ),
  );

  return [...staticPages, ...collectionPages, ...productPages];
}

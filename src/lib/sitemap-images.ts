import { existsSync } from "fs";
import path from "path";
import type { Product } from "@/data/products";
import { medidasMesaCentroGuideConfig } from "@/lib/centro-guide";
import { medidasMaderaPuertasGuideConfig } from "@/lib/door-guide";
import {
  puertasCorrederasLandingConfig,
  puertasExterioresLandingConfig,
  puertasInterioresLandingConfig,
  puertasMaderaNativaLandingConfig,
} from "@/lib/door-landings";
import {
  cotizarMueblesGuideConfig,
  cuidadoMueblesGuideConfig,
  elegirSillasGuideConfig,
  medidasMesaGuideConfig,
  type GuideConfig,
} from "@/lib/guides";
import {
  escalerasMaderaLandingConfig,
  peldanosChillanLandingConfig,
  peldanosConcretoLandingConfig,
} from "@/lib/peldanos-cluster";
import { elegirMaderaPeldanosGuideConfig, medidasPeldanosGuideConfig } from "@/lib/peldanos-guides";
import { maderaMesonQuinchoGuideConfig } from "@/lib/quincho-guide";
import { galleryImagesForProduct } from "@/lib/product-gallery";
import {
  mesasComedorAMedidaLandingConfig,
  peldanosFlotantesLandingConfig,
  puertasLocalesLandingConfig,
  puertasVidrioLandingConfig,
} from "@/lib/ronda2-landings";
import { SITE_URL } from "@/lib/seo";
import type { ServiceLandingConfig } from "@/lib/service-landings";
import {
  contactoLandingConfig,
  cubiertasLandingConfig,
  moldurasLandingConfig,
  mueblesAMedidaLandingConfig,
  mueblesChillanLandingConfig,
  mueblesCocinaChillanLandingConfig,
  peldanosLandingConfig,
  puertasLandingConfig,
  quienesSomosLandingConfig,
} from "@/lib/service-landings";

/** Fotos que la página del kit muestra. No viven en un ServiceLandingConfig. */
const KIT_PERGOLA_IMAGES = ["/images/kit-pergola-instalada.png", "/images/kit-pergola-sistema.png"];

const landingConfigs: ServiceLandingConfig[] = [
  peldanosLandingConfig,
  cubiertasLandingConfig,
  moldurasLandingConfig,
  puertasLandingConfig,
  quienesSomosLandingConfig,
  contactoLandingConfig,
  mueblesCocinaChillanLandingConfig,
  mueblesChillanLandingConfig,
  mueblesAMedidaLandingConfig,
  puertasInterioresLandingConfig,
  puertasExterioresLandingConfig,
  puertasCorrederasLandingConfig,
  puertasMaderaNativaLandingConfig,
  puertasVidrioLandingConfig,
  puertasLocalesLandingConfig,
  peldanosFlotantesLandingConfig,
  mesasComedorAMedidaLandingConfig,
  peldanosChillanLandingConfig,
  peldanosConcretoLandingConfig,
  escalerasMaderaLandingConfig,
];

function absolutePublicImage(src: string): string | null {
  if (!src.startsWith("/") || src.startsWith("//")) return null;
  const filePath = path.join(process.cwd(), "public", src);
  if (!existsSync(filePath)) return null;
  return `${SITE_URL}${src}`;
}

function uniqueExisting(srcs: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  const images: string[] = [];
  for (const src of srcs) {
    if (!src) continue;
    const absolute = absolutePublicImage(src);
    if (!absolute || seen.has(absolute)) continue;
    seen.add(absolute);
    images.push(absolute);
  }
  return images;
}

function imagesFromLanding(config: ServiceLandingConfig): string[] {
  return uniqueExisting([
    config.heroImage?.src,
    ...(config.gallery ?? []).map((image) => image.src),
  ]);
}

const imagesByRoute = new Map<string, string[]>();

for (const config of landingConfigs) {
  const images = imagesFromLanding(config);
  if (images.length > 0) imagesByRoute.set(config.canonicalPath, images);
}

const kitImages = uniqueExisting(KIT_PERGOLA_IMAGES);
if (kitImages.length > 0) imagesByRoute.set("/kit-pergola", kitImages);

const guideConfigs: GuideConfig[] = [
  cuidadoMueblesGuideConfig,
  medidasMesaGuideConfig,
  medidasMesaCentroGuideConfig,
  cotizarMueblesGuideConfig,
  elegirSillasGuideConfig,
  maderaMesonQuinchoGuideConfig,
  medidasMaderaPuertasGuideConfig,
  medidasPeldanosGuideConfig,
  elegirMaderaPeldanosGuideConfig,
];

for (const config of guideConfigs) {
  const images = uniqueExisting([config.heroImage?.src]);
  if (images.length > 0) imagesByRoute.set(config.canonicalPath, images);
}

export function sitemapImagesForRoute(route: string): string[] | undefined {
  const images = imagesByRoute.get(route);
  return images && images.length > 0 ? images : undefined;
}

export function sitemapImagesForProduct(product: Product): string[] | undefined {
  const images = uniqueExisting(galleryImagesForProduct(product));
  return images.length > 0 ? images : undefined;
}

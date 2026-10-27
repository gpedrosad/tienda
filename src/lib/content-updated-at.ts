import { medidasMesaCentroGuideConfig } from "@/lib/centro-guide";
import { collectionSeoByHandle } from "@/lib/collection-seo";
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
} from "@/lib/guides";
import {
  escalerasMaderaLandingConfig,
  peldanosChillanLandingConfig,
  peldanosConcretoLandingConfig,
} from "@/lib/peldanos-cluster";
import {
  elegirMaderaPeldanosGuideConfig,
  medidasPeldanosGuideConfig,
} from "@/lib/peldanos-guides";
import { maderaMesonQuinchoGuideConfig } from "@/lib/quincho-guide";
import {
  mesasComedorAMedidaLandingConfig,
  peldanosFlotantesLandingConfig,
  puertasLocalesLandingConfig,
  puertasVidrioLandingConfig,
} from "@/lib/ronda2-landings";
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

/**
 * lastmod fijo. Las fechas salen del último commit que tocó el contenido
 * (git blame del 2026-10-17) y quedan escritas en cada config. El build de
 * Vercel no tiene historial suficiente para recalcularlas.
 *
 * Si una ruta no tiene fecha, se usa FALLBACK_UPDATED_AT: 2026-06-15, día en
 * que quedó publicada la mayoría de las fichas con foto. No es la fecha de hoy.
 */
export const FALLBACK_UPDATED_AT = "2026-06-15";

/**
 * Rutas cuyo texto vive en el page.tsx y no en un config de landing, guía,
 * producto o colección.
 */
const PAGE_FILE_UPDATED_AT: Record<string, string> = {
  "/": "2026-10-17",
  "/ofertas": "2026-10-17",
  "/guias": "2026-10-17",
  "/kit-pergola": "2026-10-26",
  "/tiny-house-dlt": "2026-10-17",
  "/comedores-nordicos": "2026-10-26",
  "/mesas-de-centro": "2026-10-27",
};

const datedConfigs: Array<{ canonicalPath: string; updatedAt?: string; updatedDate?: string }> = [
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

const configUpdatedAt = new Map<string, string>();
for (const config of datedConfigs) {
  const iso = [config.updatedAt, config.updatedDate].filter(Boolean).sort().at(-1);
  if (iso) configUpdatedAt.set(config.canonicalPath, iso);
}

export function updatedAtForRoute(route: string): string {
  return configUpdatedAt.get(route) ?? PAGE_FILE_UPDATED_AT[route] ?? FALLBACK_UPDATED_AT;
}

export function updatedAtForCollection(handle: string): string {
  return collectionSeoByHandle[handle]?.updatedAt ?? FALLBACK_UPDATED_AT;
}

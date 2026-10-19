/**
 * Único host donde se mide (GA4, GTM, Pixel y conversiones de Meta).
 * Pruebas en localhost, previews de Vercel y navegadores automatizados no ensucian los datos.
 */
export const ANALYTICS_HOSTNAME = "www.ideamadera.cl";

/** Misma condición en forma de expresión JS, para el script inline del <head>. */
export const ANALYTICS_HOST_CHECK = `location.hostname===${JSON.stringify(ANALYTICS_HOSTNAME)}&&!navigator.webdriver`;

export function isAnalyticsHost(): boolean {
  return (
    typeof window !== "undefined" &&
    window.location.hostname === ANALYTICS_HOSTNAME &&
    !window.navigator.webdriver
  );
}

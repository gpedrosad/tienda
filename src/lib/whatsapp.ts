import type { Product } from "@/data/products";

export const WHATSAPP_PHONE = "56995497838";
export const DEFAULT_SITE_URL = "https://www.ideamadera.cl";

export interface WhatsAppTrackingPayload {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  placement: "sticky" | "inline" | "banner" | "card";
}

export function formatCLP(price: number) {
  return `$${price.toLocaleString("es-CL")}`;
}

export function getProductPath(product: Pick<Product, "id" | "handle">) {
  return `/products/${product.handle || product.id}`;
}

export function getDefaultOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export function buildProductWhatsAppMessage(product: Product, origin = getDefaultOrigin()) {
  const cleanOrigin = origin.replace(/\/$/, "");
  const productPath = getProductPath(product);

  return [
    "Hola Idea Madera",
    `Me interesa cotizar: ${product.name}`,
    `Precio referencia: ${formatCLP(product.price)}`,
    `Link: ${cleanOrigin}${productPath}`,
    `Ref: ${product.handle || product.id}`,
  ].join("\n");
}

export function buildGeneralWhatsAppMessage(context: string, extraLines: string[] = []) {
  return [
    "Hola Idea Madera",
    `Vengo desde: ${context}`,
    ...extraLines,
    "Me gustaría recibir orientación para cotizar.",
  ].join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

// SEO-15: la medición de GA4 se hace vía gtag (instalación actual del sitio).
// El precio se envía solo como contexto de producto (reference_value), no como
// ingreso de venta. No se envían datos personales ni el texto del mensaje.
export async function trackWhatsAppClick({
  productTitle,
  productId,
  productPrice,
  placement,
}: WhatsAppTrackingPayload) {
  if (typeof window === "undefined") return;

  const win = window as Window & {
    gtag?: (...args: unknown[]) => void;
  };

  const eventParams = {
    page_path: `${window.location.pathname}${window.location.search}`,
    product_id: productId,
    product_name: productTitle,
    reference_value: productPrice,
    currency: "CLP",
    placement,
  };

  // Si gtag aún no cargó (scripts diferidos), el evento se deja en dataLayer
  // con el formato estándar de gtag.js para que se procese al cargar.
  if (typeof win.gtag === "function") {
    win.gtag("event", "whatsapp_click", eventParams);
  } else {
    const winWithDataLayer = win as Window & { dataLayer?: unknown[] };
    winWithDataLayer.dataLayer = winWithDataLayer.dataLayer ?? [];
    winWithDataLayer.dataLayer.push(["event", "whatsapp_click", eventParams]);
  }

  try {
    await fetch("/api/facebook-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "MensajeWhatsApp",
        event_source_url: window.location.href,
        content_name: productTitle,
        content_ids: productId ? [productId] : undefined,
        content_type: "product",
        value: productPrice,
        currency: "CLP",
      }),
    });
  } catch {
    // El enlace de WhatsApp debe funcionar aunque el tracking falle.
  }
}

import type { Product } from "@/data/products";

export const WHATSAPP_PHONE = "56995497838";
export const DEFAULT_SITE_URL = "https://ideamadera.cl";

export interface WhatsAppTrackingPayload {
  productTitle: string;
  productId?: string;
  productPrice?: number;
  placement: "sticky" | "inline" | "banner" | "card";
}

interface DataLayerEvent {
  event: "whatsapp_click";
  product_id?: string;
  product_name: string;
  value?: number;
  currency: "CLP";
  placement: WhatsAppTrackingPayload["placement"];
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

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export async function trackWhatsAppClick({
  productTitle,
  productId,
  productPrice,
  placement,
}: WhatsAppTrackingPayload) {
  if (typeof window === "undefined") return;

  const win = window as Window & { dataLayer?: DataLayerEvent[] };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push({
    event: "whatsapp_click",
    product_id: productId,
    product_name: productTitle,
    value: productPrice,
    currency: "CLP",
    placement,
  });

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
}

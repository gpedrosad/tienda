"use client";

import { getCookie } from "cookies-next";

interface CapiEventParams {
  event_name: "PageView" | "AddToCart";
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];  // Array de IDs (aunque sea de un solo producto, se envía en un array)
  content_type?: string;
}

export const enviarEventoCAPI = async ({
  event_name,
  value,
  currency = "CLP",
  content_name,
  content_ids,
  content_type,
}: CapiEventParams) => {
  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc");

  await fetch("/api/facebook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name,
      event_source_url: window.location.href,
      fbp,
      fbc,
      value,
      currency,
      content_name,   // Enviamos el nombre del producto
      content_ids,    // Enviamos el(s) ID(s)
      content_type,   // Enviamos el tipo, p. ej. "product"
    }),
  });
};
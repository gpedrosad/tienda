"use client";

import { getCookie } from "cookies-next";

interface CapiEventParams {
  event_name: "PageView" | "CustomAddToCart"; // Se cambió "AddToCart" por "CustomAddToCart"
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
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

  // Opcional: agregar un log para verificar datos antes de enviar
  console.log("Enviando evento a CAPI:", {
    event_name,
    event_source_url: window.location.href,
    fbp,
    fbc,
    value,
    currency,
    content_name,
    content_ids,
    content_type,
  });

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
      content_name,
      content_ids,
      content_type,
    }),
  });
};
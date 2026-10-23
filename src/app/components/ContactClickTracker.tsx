"use client";

import { useEffect } from "react";
import { trackContactClick } from "@/lib/contact-tracking";

/**
 * Mide los clics en enlaces `tel:` y `mailto:` de todo el sitio (también en componentes de servidor).
 * El enlace indica dónde está con `data-placement`; si no lo tiene, se registra como "sin_etiqueta".
 */
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;
      const kind = link.href.startsWith("tel:") ? "phone" : "email";
      trackContactClick(kind, link.dataset.placement ?? "sin_etiqueta");
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

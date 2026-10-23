import { isAnalyticsHost } from "@/lib/analytics-host";

export type ContactKind = "phone" | "email";

/** Envía a GA4 `phone_click` o `email_click`. Mismo criterio de host que el resto de la medición. */
export function trackContactClick(kind: ContactKind, placement: string) {
  if (!isAnalyticsHost() || typeof window.gtag !== "function") return;

  window.gtag("event", kind === "phone" ? "phone_click" : "email_click", {
    page_path: `${window.location.pathname}${window.location.search}`,
    placement,
  });
}

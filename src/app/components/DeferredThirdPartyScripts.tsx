"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GTM_ID = "GTM-K452JXZZ";
const GA_MEASUREMENT_ID = "G-KBR6DKMXVM";
const FACEBOOK_PIXEL_ID = "1591255851691449";
const FALLBACK_DELAY_MS = 8000;

type FacebookPixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: FacebookPixel;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGoogleTagManager() {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  appendScript("gtm-script", `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
}

function loadGoogleAnalytics() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: `${window.location.pathname}${window.location.search}`,
  });
  appendScript(
    "ga-gtag-script",
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
  );
}

function loadFacebookPixel() {
  if (!window.fbq) {
    const fbq: FacebookPixel = (...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
        return;
      }

      fbq.queue?.push(args);
    };

    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
  }

  appendScript(
    "fb-pixel-script",
    "https://connect.facebook.net/en_US/fbevents.js",
  );
  window.fbq("init", FACEBOOK_PIXEL_ID);
  window.fbq("track", "PageView");
}

export default function DeferredThirdPartyScripts() {
  const pathname = usePathname();
  const gaReadyRef = useRef(false);

  useEffect(() => {
    let loaded = false;

    const loadThirdParties = () => {
      if (loaded) return;
      loaded = true;
      loadGoogleTagManager();
      loadGoogleAnalytics();
      gaReadyRef.current = true;
      loadFacebookPixel();
      cleanup();
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      events.forEach((eventName) => {
        window.removeEventListener(eventName, loadThirdParties);
      });
    };

    const timeoutId = window.setTimeout(loadThirdParties, FALLBACK_DELAY_MS);

    events.forEach((eventName) => {
      window.addEventListener(eventName, loadThirdParties, {
        once: true,
        passive: true,
      });
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (!gaReadyRef.current || !window.gtag) return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: `${pathname}${window.location.search}`,
    });
  }, [pathname]);

  return null;
}

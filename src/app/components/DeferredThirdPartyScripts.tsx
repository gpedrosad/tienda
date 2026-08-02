"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-K452JXZZ";
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
  useEffect(() => {
    let loaded = false;

    const loadThirdParties = () => {
      if (loaded) return;
      loaded = true;
      loadGoogleTagManager();
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

  return null;
}

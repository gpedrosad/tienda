"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-KBR6DKMXVM";

export default function GaPageTracker() {
  const pathname = usePathname();
  const isFirstView = useRef(true);

  useEffect(() => {
    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }

    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: `${pathname}${window.location.search}`,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [pathname]);

  return null;
}

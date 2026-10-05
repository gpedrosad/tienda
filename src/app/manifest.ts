import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Muebles de madera fabricados en Chillán y enviados a todo Chile: mesas, sillas, bancas y piezas a medida con diseño cuidado.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/logonegro.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    lang: "es",
    dir: "ltr",
    orientation: "portrait-primary",
    scope: "/",
    categories: ["shopping", "lifestyle"],
  };
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  async redirects() {
    return [
      // Colecciones Shopify → nuevas rutas
      {
        source: "/collections/all",
        destination: "/collections/todos-los-productos",
        permanent: true,
      },
      {
        source: "/collections/frontpage",
        destination: "/",
        permanent: true,
      },
      {
        source: "/collections/mesas-de-comedor",
        destination: "/collections/mesas",
        permanent: true,
      },
      {
        source: "/collections/mesas-de-centro",
        destination: "/mesas-de-centro",
        permanent: true,
      },
      {
        source: "/collections/bancas-y-bancos",
        destination: "/collections/bancas",
        permanent: true,
      },
      {
        source: "/collections/bancos",
        destination: "/collections/bancas",
        permanent: true,
      },
      {
        source: "/collections/sillones",
        destination: "/collections/sitiales",
        permanent: true,
      },
      {
        source: "/collections/mesas-ratona",
        destination: "/mesas-de-centro",
        permanent: true,
      },
      {
        source: "/collections/escritorios-y-repisas",
        destination: "/collections/todos-los-productos",
        permanent: true,
      },
      {
        source: "/collections/racks-y-repisas",
        destination: "/collections/todos-los-productos",
        permanent: true,
      },
      // Productos legacy Shopify / handles rotos
      {
        source: "/products/mesa-madera",
        destination: "/collections/mesas",
        permanent: true,
      },
      {
        source: "/products/futon-madera-modelo-noruega",
        destination: "/products/futon-noruega",
        permanent: true,
      },
      {
        source: "/products/g800065l",
        destination: "/collections/todos-los-productos",
        permanent: true,
      },
      // Páginas Shopify → nuevas landings
      {
        source: "/pages/cubiertas",
        destination: "/cubiertas-a-medida",
        permanent: true,
      },
      {
        source: "/pages/puertas",
        destination: "/puertas-a-medida",
        permanent: true,
      },
      {
        source: "/pages/quienes-somos-idea-madera",
        destination: "/quienes-somos",
        permanent: true,
      },
      {
        source: "/pages/contacto",
        destination: "/contacto",
        permanent: true,
      },
      {
        source: "/pages/peldanos",
        destination: "/peldanos-a-medida",
        permanent: true,
      },
      {
        source: "/pages/peldanos-a-medida",
        destination: "/peldanos-a-medida",
        permanent: true,
      },
      // Rutas cortas legacy
      {
        source: "/cubiertas",
        destination: "/cubiertas-a-medida",
        permanent: true,
      },
      {
        source: "/molduras",
        destination: "/molduras-a-medida",
        permanent: true,
      },
      {
        source: "/pages/molduras",
        destination: "/molduras-a-medida",
        permanent: true,
      },
      {
        source: "/muebles-chillan-chile",
        destination: "/muebles-chillan",
        permanent: true,
      },
      {
        source: "/pages/muebles-chillan",
        destination: "/muebles-chillan",
        permanent: true,
      },
      {
        source: "/cocinas-chillan",
        destination: "/muebles-de-cocina-chillan",
        permanent: true,
      },
      {
        source: "/muebles-cocina-chillan",
        destination: "/muebles-de-cocina-chillan",
        permanent: true,
      },
      {
        source: "/puertas",
        destination: "/puertas-a-medida",
        permanent: true,
      },
      // Shopify — resto de páginas y utilidades
      {
        source: "/pages/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blogs/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/policies/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },
      {
        source: "/products/new",
        destination: "/",
        permanent: true,
      },
      {
        source: "/collections/new",
        destination: "/",
        permanent: true,
      },
      {
        source: "/collections/best-sellers",
        destination: "/collections/todos-los-productos",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/",
        permanent: true,
      },
      {
        source: "/account",
        destination: "/",
        permanent: true,
      },
      {
        source: "/account/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkouts/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/orders/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

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
        source: "/blogs",
        destination: "/guias",
        permanent: true,
      },
      {
        source: "/blogs/:path*",
        destination: "/guias",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/guias",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/guias",
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
      // Fotos de producto con nombre antiguo
      {
        source: "/images/1ARRMINOGRIEGO.jpg",
        destination: "/images/arrimo-griego-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2ARRMINOGRIEGO.jpg",
        destination: "/images/arrimo-griego-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/1MESACENTROROMA.jpg",
        destination: "/images/mesa-centro-roma-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2MESACENTROROMA.jpg",
        destination: "/images/mesa-centro-roma-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/3MESACENTROROMA.jpg",
        destination: "/images/mesa-centro-roma-vista-3.jpg",
        permanent: true,
      },
      {
        source: "/images/4MESACENTROROMA.jpg",
        destination: "/images/mesa-centro-roma-vista-4.jpg",
        permanent: true,
      },
      {
        source: "/images/1BANCACAPRI.jpg",
        destination: "/images/banca-capri-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2BANCACAPRI.jpg",
        destination: "/images/banca-capri-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/1BANCACAPRINEGRA.jpg",
        destination: "/images/banca-capri-negra-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2BANCACAPRINEGRA.jpg",
        destination: "/images/banca-capri-negra-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/1MESAROMAREDONDAPATASNEGRAS.jpg",
        destination: "/images/mesa-roma-redonda-patas-negras-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2MESAROMAREDONDAPATASNEGRAS.jpg",
        destination: "/images/mesa-roma-redonda-patas-negras-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/3MESAROMAREDONDAPATASNEGRAS.jpg",
        destination: "/images/mesa-roma-redonda-patas-negras-vista-3.jpg",
        permanent: true,
      },
      {
        source: "/images/1BANCAGRIEGA.jpg",
        destination: "/images/banca-griega-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2BANCAGRIEGA.jpg",
        destination: "/images/banca-griega-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/3BANCAGRIEGA.jpg",
        destination: "/images/banca-griega-vista-3.jpg",
        permanent: true,
      },
      {
        source: "/images/4BANCAGRIEGA.jpg",
        destination: "/images/banca-griega-vista-4.jpg",
        permanent: true,
      },
      {
        source: "/images/1MESAFRIDAREDONDA.jpg",
        destination: "/images/mesa-frida-redonda-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2MESAFRIDAREDONDA.jpg",
        destination: "/images/mesa-frida-redonda-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/3MESAFRIDAREDONDA.jpg",
        destination: "/images/mesa-frida-redonda-vista-3.jpg",
        permanent: true,
      },
      {
        source: "/images/1MESATRIPODERATONA.jpg",
        destination: "/images/mesa-tripode-ratona-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2MESATRIPODERATONA.jpg",
        destination: "/images/mesa-tripode-ratona-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/3MESATRIPODERATONA.jpg",
        destination: "/images/mesa-tripode-ratona-vista-3.jpg",
        permanent: true,
      },
      {
        source: "/images/1MESAFERRARACENTRO.jpg",
        destination: "/images/mesa-centro-ferrara-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2MESAFERRARACENTRO.jpg",
        destination: "/images/mesa-centro-ferrara-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/1MESATRIPODEREDONDAMADERA.jpg",
        destination: "/images/mesa-tripode-redonda-vista-1.jpg",
        permanent: true,
      },
      {
        source: "/images/2MESATRIPODEREDONDAMADERA.jpg",
        destination: "/images/mesa-tripode-redonda-vista-2.jpg",
        permanent: true,
      },
      {
        source: "/images/3MESATRIPODEREDONDAMADERA.jpg",
        destination: "/images/mesa-tripode-redonda-vista-3.jpg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

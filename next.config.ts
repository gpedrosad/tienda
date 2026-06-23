import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async redirects() {
    return [
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
        source: "/pages/:slug",
        destination: "/",
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
    ];
  },
};

export default nextConfig;

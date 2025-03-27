import Image from "next/image";
import { shopifyFetch } from "../lib/shopify";
import FAQ from "./components/FAQ";
import FabricaVideo from "./components/FabricaVideo";
import ProductsSection from "./components/ProductSection";

// Definición de tipos para la respuesta de Shopify
interface ShopifyProductImage {
  src: string;
}

interface ShopifyProductEdge {
  node: {
    id: string;
    title: string;
    handle: string;
    images: {
      edges: { node: ShopifyProductImage }[];
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
  };
}

interface ProductsData {
  products: {
    edges: ShopifyProductEdge[];
  };
}

const PRODUCTS_QUERY = `
  {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

// Componente HeroBanner: sobrio, con fondo y llamada a la acción
function HeroBanner() {
  return (
    <section className="relative bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/hero-background.jpg"
          alt="Fondo decorativo"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Bienvenido a Nuestra Tienda
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Descubre productos exclusivos con diseño elegante y calidad excepcional.
        </p>
        <a
          href="#productos"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          Explorar Colección
        </a>
      </div>
    </section>
  );
}

export default async function Home() {
  let products = [];

  try {
    const data = (await shopifyFetch(PRODUCTS_QUERY)) as ProductsData;
    products = data.products.edges.map((edge: ShopifyProductEdge) => edge.node);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Error al cargar productos</h1>
      </div>
    );
  }

  return (
    <>
      <HeroBanner />
      {/* Sección de productos */}
      <ProductsSection products={products} />

      {/* Video a pantalla completa sin padding */}
      <FabricaVideo />

      <FAQ />
    </>
  );
}
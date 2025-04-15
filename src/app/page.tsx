// pages/index.tsx
import React from "react";
import { shopifyFetch } from "@/lib/shopify";
import FAQ from "@/app/components/FAQ";
import FabricaVideo from "@/app/components/FabricaVideo";
import ProductsSection from "@/app/components/ProductSection";
import CollectionsSection, { ShopifyCollection } from "@/app/components/ColecctionsSection";
import HeroBanner from "@/app/components/HeroBanner";  // Importa el nuevo HeroBanner

// Tipos para los productos de Shopify
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
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: ShopifyProductEdge[];
  };
}

// Query de productos con paginación (100 productos por consulta)
const PRODUCTS_PAGINATION_QUERY = `
  query getProducts($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
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

// Función que recorre la paginación para obtener todos los productos
async function getAllProducts() {
  let products: ShopifyProductEdge["node"][] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const variables = { cursor };
    const data = (await shopifyFetch(PRODUCTS_PAGINATION_QUERY, variables)) as ProductsData;
    const fetchedProducts = data.products.edges.map(edge => edge.node);
    products = products.concat(fetchedProducts);
    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }
  return products;
}

// Tipos para las colecciones de Shopify
interface ShopifyCollectionEdge {
  node: {
    id: string;
    title: string;
    handle: string;
    image?: {
      src: string;
    };
  };
}

interface CollectionsData {
  collections: {
    edges: ShopifyCollectionEdge[];
  };
}

const COLLECTIONS_QUERY = `
  {
    collections(first: 16) {
      edges {
        node {
          id
          title
          handle
          image {
            src
          }
        }
      }
    }
  }
`;

// Componente principal Home
export default async function Home() {
  let products: ShopifyProductEdge["node"][] = [];
  let collections: ShopifyCollection[] = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Error al cargar productos de Shopify</h1>
      </div>
    );
  }

  try {
    const dataCollections = (await shopifyFetch(COLLECTIONS_QUERY)) as CollectionsData;
    collections = dataCollections.collections.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error al obtener las colecciones:", error);
    // Se puede dejar la sección vacía o mostrar un mensaje alternativo.
  }

  return (
    <>
      <HeroBanner />
      <CollectionsSection collections={collections} />
      <ProductsSection products={products} />
      <FabricaVideo />
      <FAQ />
    </>
  );
}
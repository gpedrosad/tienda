import { shopifyFetch } from "../lib/shopify";
import FAQ from "./components/FAQ";
import FabricaVideo from "./components/FabricaVideo";
import ProductsSection from "./components/ProductSection";

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

export default async function Home() {
  let products = [];

  try {
    const data = await shopifyFetch(PRODUCTS_QUERY);
    products = data.products.edges.map((edge: any) => edge.node);
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
      {/* Sección de productos */}
      <ProductsSection products={products} />

      {/* Video a pantalla completa sin padding */}
      <FabricaVideo />

      <FAQ />
    </>
  );
}
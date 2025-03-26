import Link from "next/link";
import { shopifyFetch } from "../lib/shopify";
import FAQ from "./components/FAQ";
import FabricaVideo from "./components/FabricaVideo";

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
  let products: any[] = [];

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
      {/* Sección de productos con padding */}
      <div className="min-h-screen p-8 grid gap-8">
        <h1 className="text-2xl font-bold">Nuestros productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={product.images?.edges?.[0]?.node?.src || "/placeholder.png"}
                alt={product.title}
                className="w-full h-auto"
              />
              <h2 className="text-lg font-semibold mt-4">{product.title}</h2>
              <p className="text-gray-600 mt-2">
                ${Math.floor(parseFloat(product.priceRange.minVariantPrice.amount))}
              </p>
              <Link
                href={`/products/${product.handle}`}
                className="mt-4 inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700"
              >
                Ver producto
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Video a pantalla completa sin padding */}
      <FabricaVideo />

      <FAQ />
    </>
  );
}
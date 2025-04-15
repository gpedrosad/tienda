import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";

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

interface CollectionProductsData {
  collectionByHandle: {
    id: string;
    title: string;
    products: {
      edges: ShopifyProductEdge[];
    };
  } | null;
}

const COLLECTION_PRODUCTS_QUERY = `
  query collectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      products(first: 20) {
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
  }
`;

// Al igual que en products, params se espera como Promise
interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  // Desestructuramos tras el await para obtener el parámetro handle
  const { handle } = await params;

  if (!handle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">
          Ruta inválida: Falta el parámetro &apos;handle&apos; en params.
        </h1>
      </div>
    );
  }

  let collectionData: CollectionProductsData | null = null;

  try {
    collectionData = await shopifyFetch<CollectionProductsData>(COLLECTION_PRODUCTS_QUERY, { handle });
  } catch (error) {
    console.error("Error al obtener la colección:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Error al cargar la colección</h1>
      </div>
    );
  }

  if (!collectionData || !collectionData.collectionByHandle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Colección no encontrada</h1>
      </div>
    );
  }

  const collection = collectionData.collectionByHandle;
  const products = collection.products.edges.map((edge) => edge.node);

  // Función para formatear precios: sin decimales y con separador de miles.
  const formatPrice = (price: string) =>
    Number(price).toLocaleString("es-CL", { maximumFractionDigits: 0 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Botón para volver */}
      <div className="mb-8">
        <Link href="/" className="flex items-center text-black hover:underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-left md:text-center mt-10 mb-10 font-poppins">{collection.title}</h1>

      {products.length === 0 ? (
        <p>No se encontraron productos en esta colección.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="flex flex-col items-center border rounded-md p-4 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer bg-white"
            >
              {product.images.edges[0]?.node.src && (
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={product.images.edges[0].node.src}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-center">{product.title}</h2>
              <p className="text-lg font-medium text-gray-700 mt-2">
                ${formatPrice(product.priceRange.minVariantPrice.amount)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
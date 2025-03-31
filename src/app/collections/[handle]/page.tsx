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

interface PageProps {
  params: { handle: string };
}

export default async function CollectionPage({ params }: PageProps) {
  const { handle } = params;
  const data = await shopifyFetch<CollectionProductsData>(COLLECTION_PRODUCTS_QUERY, { handle });
  
  if (!data.collectionByHandle) {
    return <div className="max-w-7xl mx-auto p-8">Colección no encontrada</div>;
  }
  
  const collection = data.collectionByHandle;
  const products = collection.products.edges.map(edge => edge.node);

  // Función para formatear precios: sin decimales y con separador de miles.
  const formatPrice = (price: string) => {
    return Number(price).toLocaleString("es-CL", {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Botón para volver */}
      <div className="mb-8">
        <Link href="/" className="flex items-center text-black hover:underline">
          {/* Ícono inline de flecha izquierda */}
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
      
      <h1 className="text-4xl font-bold mb-8">{collection.title}</h1>
      {products.length === 0 ? (
        <p>No se encontraron productos en esta colección.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="block border rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer items-center justify-center"
            >
              {product.images.edges[0]?.node.src && (
                <Image
                  src={product.images.edges[0].node.src}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="object-cover rounded-md "
                />
              )}
              <h2 className="mt-4 text-xl font-semibold">{product.title}</h2>
              <p className="text-lg font-medium">${formatPrice(product.priceRange.minVariantPrice.amount)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import FAQ from "@/app/components/FAQ";
import FabricaVideo from "@/app/components/FabricaVideo";
import ProductsSection from "@/app/components/ProductSection";

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

// Query que incluye la paginación (se traen 100 productos por consulta)
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
    collections(first: 15) {
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
        <Link
          href="#productos"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
        >
          Explorar Colección
        </Link>
      </div>
    </section>
  );
}

// Componente para mostrar las colecciones con navegación
function CollectionsSection({
  collections,
}: {
  collections: ShopifyCollectionEdge["node"][];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Colecciones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="block border rounded-md p-4 hover:shadow-lg transition-shadow"
          >
            {collection.image && (
              <Image
                src={collection.image.src}
                alt={collection.title}
                width={300}
                height={200}
                className="object-cover rounded-md"
              />
            )}
            <h3 className="mt-4 text-xl font-semibold">
              {collection.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Componente principal Home que utiliza las funciones anteriores
export default async function Home() {
  let products = [];
  let collections: ShopifyCollectionEdge["node"][] = [];

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
    const dataCollections = (await shopifyFetch(
      COLLECTIONS_QUERY
    )) as CollectionsData;
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
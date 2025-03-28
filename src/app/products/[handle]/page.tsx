import { shopifyFetch } from "@/lib/shopify";
import ProductDetails from "@/app/components/ProductDetails";
import RecommendedProductsCarousel from "@/app/components/RecommendedProductsCarousel";
import KeyBenefits from "@/app/components/KeyBenefits";
import Reviews from "@/app/components/Reviews";
import GuaranteeAndReturn from "@/app/components/GuaranteeAndReturn";
import Reel from "@/app/components/Reel";
import Accordion from "@/app/components/Accordion";

const PRODUCT_QUERY = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      descriptionHtml
      options {
        name
        values
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            src
          }
        }
      }
    }
  }
`;

// Interfaces para tipar la respuesta
interface ProductOption {
  name: string;
  values: string[];
}

interface SelectedOption {
  name: string;
  value: string;
}

interface PriceV2 {
  amount: string;
  currencyCode: string;
}

interface VariantNode {
  id: string;
  title: string;
  priceV2: PriceV2;
  selectedOptions: SelectedOption[];
}

interface VariantEdge {
  node: VariantNode;
}

interface ImageNode {
  src: string;
}

interface ImageEdge {
  node: ImageNode;
}

interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  options: ProductOption[];
  variants: {
    edges: VariantEdge[];
  };
  images: {
    edges: ImageEdge[];
  };
}

interface ProductQueryResponse {
  productByHandle: Product | null;
}

// Definimos las props del Page, incluyendo searchParams
interface ProductPageProps {
  params: { handle: string };
  searchParams: { [key: string]: string | string[] };
}

export default async function ProductPage({ params, searchParams: _searchParams }: ProductPageProps) {
  // No es necesario awaitear params, ya que ya se entregan de forma síncrona.
  const { handle } = params;

  if (!handle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">
          Ruta inválida: Falta el parámetro &quot;handle&quot;.
        </h1>
      </div>
    );
  }

  let product: Product | null = null;

  try {
    const data = await shopifyFetch<ProductQueryResponse>(PRODUCT_QUERY, { handle });
    product = data.productByHandle;
  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Error al cargar el producto</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Producto no encontrado</h1>
      </div>
    );
  }

  return (
    <div>
      <ProductDetails product={product} />
      <Accordion />
      <Reviews />
      <KeyBenefits />
      <GuaranteeAndReturn />
      <RecommendedProductsCarousel />
      <Reel
        videoUrls={[
          "https://cdn.shopify.com/videos/c/o/v/66fb5ba10a134e148c473ce5119f34e1.mp4",
          "https://cdn.shopify.com/videos/c/o/v/ba1785080929409aa92d8c9162b3c4c4.mp4",
          "https://cdn.shopify.com/videos/c/o/v/66fb5ba10a134e148c473ce5119f34e1.mp4",
        ]}
      />
    </div>
  );
}
import { shopifyFetch } from "@/lib/shopify";
import ProductDetails from "@/app/components/ProductDetails"; // Componente cliente para los detalles del producto
import Footer from "@/app/components/Footer"; // Componente cliente para el footer
import KeyBenefits from "@/app/components/KeyBenefits";
import Reviews from "@/app/components/Reviews";
import GuaranteeAndReturn from "@/app/components/GuaranteeAndReturn";
import Reel from "@/app/components/Reel";



const PRODUCT_QUERY = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      descriptionHtml
      variants(first: 1) {
        edges {
          node {
            id
            priceV2 {
              amount
              currencyCode
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

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const { handle } = params;

  if (!handle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">Ruta inválida: Falta el parámetro "handle".</h1>
      </div>
    );
  }

  let product;

  try {
    const data = await shopifyFetch(PRODUCT_QUERY, { handle });
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
      <ProductDetails product={product} /> {/* Pasamos el producto al componente */}
      <Reviews />
      <KeyBenefits/>
      <GuaranteeAndReturn/>
      <Reel videoUrl="https://cdn.shopify.com/videos/c/o/v/66fb5ba10a134e148c473ce5119f34e1.mp4" />
      <Footer /> {/* Agregamos el Footer */}
    </div>
  );
}
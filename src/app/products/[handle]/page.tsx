// src/app/products/[handle]/page.tsx

import Reviews from "@/app/components/Reviews";
import Reel from "@/app/components/Reel";
import Accordion from "@/app/components/Accordion";
import ProductGallery from "@/app/components/ProductGallery";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Link from "next/link";
import { products } from "@/data/products";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

const productImagesById: Record<string, string[]> = {
  "silla-milan-lenga": [
    "/images/sillamilan/1sillamilan.jpg",
    "/images/sillamilan/2sillamilan.jpg",
    "/images/sillamilan/3sillamilan.jpg",
    "/images/sillamilan/4sillamilan.jpg",
    "/images/sillamilan/5sillamilan.jpg",
    "/images/sillamilan/6sillamilan.jpg",
  ],
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = products.find((item) => item.handle === handle || item.id === handle);
  const productId = product?.handle || product?.id || handle;
  const galleryImages = productImagesById[productId] ?? (product?.imageUrl ? [product.imageUrl] : []);
  const productDescription = product
    ? product.description ??
      `${product.name} es una pieza de ${product.category.toLowerCase()} fabricada en madera, con foco en calidad, terminaciones cuidadas y durabilidad para uso diario.`
    : null;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-28 pb-12">
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

        <h1 className="text-4xl font-bold mb-8 text-left md:text-center mt-10 mb-10 font-poppins">
          {product ? product.name : `Producto: ${handle}`}
        </h1>

        {product ? (
          <div className="space-y-8">
            <div className="text-left md:text-center">
              <p className="text-3xl md:text-4xl font-bold text-neutral-900">
                ${product.price.toLocaleString("es-CL")}
              </p>
            </div>

            {galleryImages.length > 0 ? (
              <ProductGallery images={galleryImages} productName={product.name} />
            ) : (
              <div className="min-h-[180px] flex items-center justify-center">
                <p className="text-gray-600">Este producto todavía no tiene fotos cargadas.</p>
              </div>
            )}

            {productDescription && (
              <div className="mx-auto w-full max-w-3xl border-t border-neutral-200 pt-6">
                <h2 className="text-2xl font-semibold text-left md:text-center mb-3 font-poppins">
                  Descripción
                </h2>
                <p className="text-base text-gray-700 leading-relaxed text-left md:text-center">
                  {productDescription}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-[180px] flex items-center justify-center">
            <p className="text-gray-600">No encontramos este producto en el catálogo local.</p>
          </div>
        )}
      </div>

      <Accordion />
      <Reviews />
      <Reel
        videoUrls={[
          "https://cdn.shopify.com/videos/c/o/v/66fb5ba10a134e148c473ce5119f34e1.mp4",
          "https://cdn.shopify.com/videos/c/o/v/ba1785080929409aa92d8c9162b3c4c4.mp4",
          "https://cdn.shopify.com/videos/c/o/v/66fb5ba10a134e148c473ce5119f34e1.mp4",
        ]}
      />
      {product && <WhatsAppButton productTitle={product.name} />}
    </div>
  );
}

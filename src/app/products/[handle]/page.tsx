// src/app/products/[handle]/page.tsx

import KeyBenefits from "@/app/components/KeyBenefits";
import Reviews from "@/app/components/Reviews";
import GuaranteeAndReturn from "@/app/components/GuaranteeAndReturn";
import Reel from "@/app/components/Reel";
import Accordion from "@/app/components/Accordion";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  return (
    <div>
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

        <h1 className="text-4xl font-bold mb-8 text-left md:text-center mt-10 mb-10 font-poppins">
          Producto: {handle}
        </h1>

        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-gray-600">Esta página ya no usa Shopify. Implementa tu propia fuente de datos.</p>
        </div>
      </div>

      <Accordion />
      <Reviews />
      <KeyBenefits />
      <GuaranteeAndReturn />
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
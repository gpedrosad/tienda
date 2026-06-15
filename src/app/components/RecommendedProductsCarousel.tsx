"use client";

import ProductCard from "@/app/components/ProductCard";
import { getFeaturedProducts } from "@/lib/catalog";

export default function RecommendedProductsCarousel() {
  const recommendedProducts = getFeaturedProducts(8);

  return (
    <section className="w-full max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
        Productos Recomendados
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// components/ProductsSection.tsx

import Link from "next/link";

interface ProductImageNode {
  src: string;
}

interface ProductImageEdge {
  node: ProductImageNode;
}

interface ProductImages {
  edges: ProductImageEdge[];
}

interface PriceRange {
  minVariantPrice: {
    amount: string;
  };
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  images: ProductImages;
  priceRange: PriceRange;
}

interface ProductsSectionProps {
  products: Product[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <div className="min-h-screen p-8 grid gap-4">
      <h1 className="text-4xl font-bold text-left md:text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
      Productos</h1>
      <p className="text-gray-600 mb-4 text-left md:text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
      Descubre nuestros productos de madera, diseñados para tu hogar y tu estilo.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          // Formatea el precio
          const price = Math.floor(
            parseFloat(product.priceRange.minVariantPrice.amount)
          );
          const formattedPrice = new Intl.NumberFormat("es-CL").format(price);

          // Verifica si el título es muy largo
          const isLongName = product.title.length > 20;

          return (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="border rounded-lg p-0 sm:p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={product.images?.edges?.[0]?.node?.src || "/placeholder.png"}
                alt={product.title}
                className="w-full h-auto"
              />
              <h2 className={`text-sm sm:text-lg font-semibold mt-4 ${isLongName ? "px-4" : ""}`}>
                {product.title}
              </h2>
              <p className="text-gray-600 mt-2">${formattedPrice}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";

const RECOMMENDED_PRODUCTS_QUERY = `
  query RecommendedProducts {
    products(first: 10) {
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
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export default function RecommendedProductsCarousel() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await shopifyFetch(RECOMMENDED_PRODUCTS_QUERY);
        const fetchedProducts = data.products.edges.map((edge: any) => edge.node);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching recommended products", error);
      }
    }
    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return `$${Number(price).toLocaleString("es-ES", { maximumFractionDigits: 0 })}`;
  };

  return (
    <section className="w-full max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Productos Recomendados
      </h2>
      <div className="relative pb-10">
        <Swiper
          loop={true}
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => {
            const imageSrc = product.images?.edges[0]?.node?.src;

            return (
              <SwiperSlide key={product.id}>
                <Link href={`/products/${product.handle}`}>
                  {/* Tarjeta del producto centrada */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3 sm:p-4 h-full flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg duration-300 max-w-xs sm:max-w-full mx-auto">
                    {/* Contenedor con relación de aspecto 1:1 para mostrar la imagen completa */}
                    <div className="relative w-full aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-md">
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt={product.title}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      )}
                    </div>
                    {/* Nombre y precio del producto */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    {product.priceRange?.minVariantPrice?.amount && (
                      <p className="mt-auto text-xl font-bold text-gray-900">
                        {formatPrice(product.priceRange.minVariantPrice.amount)}
                      </p>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Ajuste de la paginación para colocarla debajo del Swiper */}
        <style jsx global>{`
          .swiper-pagination {
            position: relative !important;
            margin-top: 20px;
            bottom: 0 !important;
          }
          .swiper-pagination-bullet {
            background: #000;
          }
          /* Soporte para aspect-ratio en navegadores que no lo tengan nativo */
          .aspect-w-1 {
            aspect-ratio: 1 / 1;
          }
          .aspect-h-1 {
            aspect-ratio: 1 / 1;
          }
        `}</style>
      </div>
    </section>
  );
}
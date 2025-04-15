"use client"; // Asegura que Swiper se ejecute en el cliente

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Define el tipo para las colecciones
export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  image?: {
    src: string;
  };
}

interface CollectionsSectionProps {
  collections: ShopifyCollection[];
}

export default function CollectionsSection({ collections }: CollectionsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2
        className="text-4xl font-bold mb-4 text-left md:text-center"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Colecciones
      </h2>

      {/* Swiper con paginación y breakpoints */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {collections.map((collection) => (
          <SwiperSlide key={collection.id}>
            <Link
              href={`/collections/${collection.handle}`}
              className="block relative group overflow-hidden rounded-lg shadow-lg transition-all "
            >
              {/* Imagen de fondo */}
              {collection.image && (
                <div className="relative w-full h-52 md:h-64 lg:h-72">
                  <Image
                    src={collection.image.src}
                    alt={collection.title}
                    fill
                    className="object-cover object-center"
                  />
                  {/* Capa de superposición para resaltar el texto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                </div>
              )}

              {/* Contenido de la tarjeta */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-white">
                <h3 className="text-xl font-semibold drop-shadow-sm">
                  {collection.title}
                </h3>
                <p className="mt-1 text-sm drop-shadow-sm">
                  Explora nuestra colección
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
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
    </section>
  );
}
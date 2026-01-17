'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { AiFillStar, AiOutlineClose } from 'react-icons/ai';

interface Review {
  id: number;
  rating: number;
  author: string;
  date: string;
  content: string;
  image?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    author: "María García",
    date: "2024-03-15",
    content: "¡Excelente producto! Superó todas mis expectativas. La calidad es increíble.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review1.png?v=1743481113"
  },
  {
    id: 2,
    rating: 4,
    author: "Juan Pérez",
    date: "2024-03-14",
    content: "Muy buen producto, lo recomiendo totalmente.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review2.jpg?v=1743481112"
  },
  {
    id: 3,
    rating: 5,
    author: "Ana Martínez",
    date: "2024-03-13",
    content: "Increíble servicio y producto de primera calidad.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review3.jpg?v=1743481112"
  },
  {
    id: 4,
    rating: 5,
    author: "Carlos Rodríguez",
    date: "2024-03-12",
    content: "No podría estar más satisfecho con mi compra.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review4.jpg?v=1743481112"
  },
  {
    id: 5,
    rating: 5,
    author: "Luis Fernández",
    date: "2024-03-11",
    content: "Producto de buena calidad, cumple con lo prometido.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review5.jpg?v=1743481111"
  },
  {
    id: 6,
    rating: 3,
    author: "Laura López",
    date: "2024-03-10",
    content: "La experiencia fue correcta, aunque esperaba un poco más.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review6.jpg?v=1743481112"
  },
  {
    id: 7,
    rating: 4,
    author: "Diego Sánchez",
    date: "2024-03-09",
    content: "Buen producto, pero con margen de mejora en algunos detalles.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review7.jpg?v=1743481111"
  },
  {
    id: 8,
    rating: 5,
    author: "Sofía Ramírez",
    date: "2024-03-08",
    content: "Estoy encantada con mi compra. ¡Totalmente recomendable!",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review8.jpg?v=1743481111"
  },
  {
    id: 9,
    rating: 5,
    author: "Miguel Torres",
    date: "2024-03-07",
    content: "La calidad del producto es sobresaliente y el envío fue rápido.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review9.jpg?v=1743481111"
  },
  {
    id: 10,
    rating: 4,
    author: "Elena Gómez",
    date: "2024-03-06",
    content: "Muy contenta con mi compra, aunque el empaque podría mejorar.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review10.jpg?v=1743481111"
  },
  {
    id: 11,
    rating: 5,
    author: "Andrés Morales",
    date: "2024-03-05",
    content: "El producto es excelente y superó mis expectativas.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review11.jpg?v=1743481111"
  },
  {
    id: 12,
    rating: 3,
    author: "Isabel Ruiz",
    date: "2024-03-04",
    content: "La experiencia fue buena, pero hay algunos detalles a mejorar.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review12.jpg?v=1743481112"
  },
  {
    id: 13,
    rating: 4,
    author: "Fernando Castro",
    date: "2024-03-03",
    content: "Producto de calidad aceptable y envío en tiempo.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review13.jpg?v=1743481111"
  },
  {
    id: 14,
    rating: 5,
    author: "Verónica Díaz",
    date: "2024-03-02",
    content: "Una compra que vale la pena. ¡Me encantó!",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review14.jpg?v=1743481112"
  },
  {
    id: 15,
    rating: 5,
    author: "Pablo Herrera",
    date: "2024-03-01",
    content: "Excelente calidad y atención. Recomiendo este producto.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review15.jpg?v=1743481111"
  },
  {
    id: 16,
    rating: 4,
    author: "Carmen Navarro",
    date: "2024-02-29",
    content: "Muy buena relación calidad-precio, cumpliendo con lo esperado.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review16.jpg?v=1743481112"
  },
  {
    id: 17,
    rating: 5,
    author: "Ricardo Vargas",
    date: "2024-02-28",
    content: "La atención al detalle y calidad del producto me sorprendieron gratamente.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review17.jpg?v=1743481111"
  },
  {
    id: 18,
    rating: 3,
    author: "Lucía Ortiz",
    date: "2024-02-27",
    content: "Buena experiencia, aunque esperaba un poco más de durabilidad.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review18.jpg?v=1743481111"
  },
  {
    id: 19,
    rating: 5,
    author: "Javier Silva",
    date: "2024-02-26",
    content: "Producto excelente y servicio de primera.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review19.jpg?v=1743481112"
  },
  {
    id: 20,
    rating: 4,
    author: "Patricia Mendoza",
    date: "2024-02-25",
    content: "Muy contenta con mi compra, la recomendaré a mis amigos.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review20.jpg?v=1743481112"
  },
  {
    id: 21,
    rating: 5,
    author: "Sergio Ramos",
    date: "2024-02-24",
    content: "Superó mis expectativas en todos los aspectos.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review21.jpg?v=1743481112"
  },
  {
    id: 22,
    rating: 4,
    author: "Valentina García",
    date: "2024-02-23",
    content: "Un producto muy bueno, cumple lo prometido.",
    image: "https://cdn.shopify.com/s/files/1/0401/9994/6389/files/review22.jpg?v=1743481111"
  },
];

const ReviewStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, index) => (
        <AiFillStar 
          key={index} 
          className={`text-[10px] ${index < rating ? 'text-neutral-900' : 'text-neutral-200'}`}
        />
      ))}
    </div>
  );
};

const Reviews = () => {
  // 2 filas siempre: 4 reseñas (2x2 en mobile, 2x4 en desktop mostrando solo 4)
  const reviewsPerLoad = 4;
  const [visibleReviews, setVisibleReviews] = useState(reviewsPerLoad);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Reseñas actualmente visibles
  const currentReviews = reviews.slice(0, visibleReviews);

  // Calcular promedio de rating
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="w-full bg-neutral-50/30 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Encabezado compacto */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6 mb-6 md:mb-8">
          <h2 className="text-xl md:text-3xl font-light text-neutral-900 tracking-tight">
            Opiniones verificadas
          </h2>
          
          {/* Rating promedio compacto */}
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">
              {averageRating}
            </span>
            <div className="flex flex-col">
              <ReviewStars rating={5} />
              <span className="text-[10px] md:text-xs font-light text-neutral-500 mt-0.5">
                {reviews.length} opiniones
              </span>
            </div>
          </div>
        </div>

        {/* Grid compacto: 2 columnas siempre (2 filas) */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {currentReviews.map((review) => (
            <div 
              key={review.id} 
              className="group bg-white border border-neutral-200/60 hover:border-neutral-300 overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Imagen del producto - más compacta */}
              {review.image && (
                <div
                  className="relative w-full aspect-square bg-neutral-50 cursor-pointer overflow-hidden"
                  onClick={() => setModalImage(review.image!)}
                >
                  <Image
                    src={review.image}
                    alt={`Reseña de ${review.author}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
              )}
              
              {/* Contenido compacto */}
              <div className="p-3 md:p-4 flex flex-col gap-2 flex-1">
                {/* Header minimalista */}
                <div className="flex items-start justify-between gap-1">
                  <p className="text-xs md:text-sm font-light text-neutral-900 tracking-tight truncate flex-1">
                    {review.author}
                  </p>
                  <ReviewStars rating={review.rating} />
                </div>

                {/* Comentario compacto */}
                <p className="text-xs md:text-sm font-light text-neutral-600 leading-relaxed line-clamp-3">
                  {review.content}
                </p>

                {/* Badge verificado minimalista */}
                <div className="mt-auto pt-2 border-t border-neutral-100">
                  <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-light text-neutral-500">
                    <svg 
                      className="w-2.5 h-2.5 md:w-3 md:h-3 text-neutral-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Verificada
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón compacto */}
        {visibleReviews < reviews.length && (
          <div className="flex justify-center mt-6 md:mt-8">
            <button
              onClick={() =>
                setVisibleReviews((prev) => Math.min(prev + reviewsPerLoad, reviews.length))
              }
              className="w-full md:w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-light text-xs md:text-sm tracking-wide transition-all duration-300 active:scale-[0.98]"
            >
              Ver más ({reviews.length - visibleReviews})
            </button>
          </div>
        )}
      </div>

      {/* Modal para imagen ampliada */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={modalImage}
                alt="Imagen ampliada"
                width={1200}
                height={1200}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            
            {/* Botón de cerrar minimalista */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-2 bg-white/95 hover:bg-white text-neutral-900 backdrop-blur-sm transition-all duration-200 active:scale-95 group/close"
              aria-label="Cerrar"
            >
              <AiOutlineClose 
                size={18} 
                className="group-hover/close:rotate-90 transition-transform duration-300" 
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
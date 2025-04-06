'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { AiFillStar, AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';

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

const ReviewStars = () => {
  // Se muestran 5 estrellas llenas
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <AiFillStar key={index} className="text-yellow-400 text-sm mr-1" />
      ))}
    </div>
  );
};

const Reviews = () => {
  // Cantidad de reseñas que se muestran inicialmente y que se agregan en cada clic
  const reviewsPerLoad = 10;
  const [visibleReviews, setVisibleReviews] = useState(reviewsPerLoad);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Reseñas actualmente visibles
  const currentReviews = reviews.slice(0, visibleReviews);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Encabezado */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Opiniones de nuestros clientes</h2>
      </div>

      {/* Grid de reseñas: 2 columnas en mobile, 3 en desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {currentReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {review.image && (
              <div
                className="relative w-full h-56 cursor-pointer"
                onClick={() => setModalImage(review.image!)}
              >
                <Image
                  src={review.image}
                  alt={`Producto reseñado por ${review.author}`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    {review.author}
                  </p>
                  <div className="flex items-center">
                    <AiFillCheckCircle className="text-blue-500 mr-1" />
                    <span className="text-xs text-gray-500">Verificada</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                  <ReviewStars />
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón "Mostrar más reseñas" */}
      {visibleReviews < reviews.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() =>
              setVisibleReviews((prev) => Math.min(prev + reviewsPerLoad, reviews.length))
            }
            className="px-4 py-2 bg-black text-white rounded hover:bg-black/80"
          >
            Mostrar más reseñas
          </button>
        </div>
      )}

      {/* Modal para imagen ampliada */}
      {modalImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative w-11/12 md:w-3/4 max-w-sm md:max-w-lg max-h-[90vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalImage}
              alt="Imagen ampliada"
              width={800}
              height={800}
              className="object-contain"
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-0 right-0 p-2 text-white"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
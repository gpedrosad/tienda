import React from 'react';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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
    image: "/review1.jpg"
  },
  {
    id: 2,
    rating: 4,
    author: "Juan Pérez",
    date: "2024-03-10",
    content: "Muy buen producto, lo recomiendo totalmente.",
  },
  {
    id: 3,
    rating: 5,
    author: "Ana Martínez",
    date: "2024-03-08",
    content: "Increíble servicio y producto de primera calidad.",
    image: "/review3.jpg"
  },
  {
    id: 4,
    rating: 5,
    author: "Carlos Rodríguez",
    date: "2024-03-05",
    content: "No podría estar más satisfecho con mi compra.",
  },
];

const ReviewStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        index < rating 
          ? <AiFillStar key={index} className="text-yellow-400 text-xl" />
          : <AiOutlineStar key={index} className="text-gray-300 text-xl" />
      ))}
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Opiniones de nuestros clientes
      </h2>
      
      <div className="grid grid-cols-6 gap-6">
        {reviews.map((review, index) => (
          <div 
            key={review.id} 
            className={`bg-white p-6 rounded-lg shadow-md ${
              index === 0 ? 'col-span-6 md:col-span-4' : 
              index === 1 ? 'col-span-6 md:col-span-2' :
              index === 2 ? 'col-span-6 md:col-span-3' :
              'col-span-6 md:col-span-3'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <ReviewStars rating={review.rating} />
              <span className="text-gray-500 text-sm">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{review.content}</p>
            
            <div className="flex items-center">
              {review.image && (
                <div className="relative w-10 h-10 mr-3">
                  <Image
                    src={review.image}
                    alt={`${review.author} review`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold">{review.author}</p>
                <p className="text-sm text-gray-500">Cliente verificado</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

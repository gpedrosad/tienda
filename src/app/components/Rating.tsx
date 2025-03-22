"use client";

import React, { useMemo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  reviewCount?: number;
}

export default function Rating({ rating, reviewCount }: RatingProps) {
  // Calcular número de estrellas completas, media y vacías usando memoización
  const fullStars = useMemo(() => Math.floor(rating), [rating]);
  const halfStar = useMemo(() => rating - fullStars >= 0.5, [rating, fullStars]);
  const emptyStars = useMemo(() => 5 - fullStars - (halfStar ? 1 : 0), [fullStars, halfStar]);

  return (
    <div
      className="flex items-center space-x-2 mb-4 transition-all duration-300"
      aria-label={`Calificación de ${rating} estrellas, con ${reviewCount || 0} valoraciones`}
      title={`Calificación: ${rating} estrellas`}
    >
      <div className="flex text-yellow-500 dark:text-yellow-400 transition-colors duration-300">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar key={`full-${index}`} className="transform transition-all duration-300 hover:scale-110" />
        ))}
        {halfStar && <FaStarHalfAlt key="half" className="transform transition-all duration-300 hover:scale-110" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="transform transition-all duration-300 hover:scale-110" />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          ({reviewCount} valoraciones)
        </span>
      )}
    </div>
  );
}
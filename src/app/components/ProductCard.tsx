import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { AiOutlineWhatsApp } from "react-icons/ai";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Formatear precio en formato chileno
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CL")}`;
  };

  // Generar URL de WhatsApp
  const getWhatsAppUrl = (productName: string) => {
    const message = `Hola, me interesa consultar por: ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/56995497838?text=${encodedMessage}`;
  };

  return (
    <div className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-lg border border-neutral-200/60 hover:border-neutral-300 relative flex flex-col h-full">
      {/* Link envolvente para toda la tarjeta */}
      <Link href={`/products/${product.handle || product.id}`} className="block flex-grow">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-[4/3] bg-neutral-50 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
        </div>

        {/* Información del producto */}
        <div className="p-4 md:p-5 space-y-3">
          {/* Categoría minimalista */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-xs font-light tracking-[0.15em] uppercase text-neutral-500">
              {product.category}
            </span>
          </div>

          {/* Nombre del producto */}
          <h3 className="text-base md:text-lg font-normal text-neutral-900 line-clamp-2 leading-snug tracking-tight min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Precio elegante */}
          <div className="pt-0.5">
            <p className="text-xl md:text-2xl font-light text-neutral-900 tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Link>

      {/* Botón de WhatsApp minimalista - fuera del Link para evitar conflictos */}
      <div className="px-4 md:px-5 pb-4 md:pb-5 mt-auto">
        <a
          href={getWhatsAppUrl(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-normal py-2.5 md:py-3 px-4 text-sm tracking-wide transition-all duration-300 group/button relative z-10"
        >
          <span>Consultar</span>
          <AiOutlineWhatsApp 
            size={18} 
            className="group-hover/button:scale-110 transition-transform duration-300" 
          />
        </a>
      </div>
    </div>
  );
}

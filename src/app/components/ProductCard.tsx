import React from "react";
import ProductImage from "@/app/components/ui/ProductImage";
import Link from "next/link";
import { Product } from "@/data/products";
import { productImageAlt } from "@/lib/catalog";
import WhatsAppCTA from "@/app/components/ui/WhatsAppCTA";
import { buttonClasses } from "@/app/components/ui/Button";
import { buildProductWhatsAppMessage, buildWhatsAppUrl, getDefaultOrigin, formatCLP } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  cta?: "whatsapp" | "ficha";
}

export default function ProductCard({ product, priority = false, cta = "whatsapp" }: ProductCardProps) {
  const productPath = `/products/${product.handle || product.id}`;
  const whatsappUrl = buildWhatsAppUrl(buildProductWhatsAppMessage(product, getDefaultOrigin()));
  const hasProductImage = Boolean(product.imageUrl);

  return (
    <div className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-lg border border-line hover:border-wood/40 relative flex flex-col h-full">
      {/* Link envolvente para toda la tarjeta */}
      <Link href={productPath} className="block flex-grow">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-square bg-canvas overflow-hidden">
        {hasProductImage ? (
          <ProductImage
            src={product.imageUrl!}
            alt={productImageAlt(product)}
            priority={priority}
            maxCrop={0.34}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas-deep px-5 text-center text-ink-muted">
            <svg
              className="h-12 w-12"
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
            <p className="mt-3 text-sm font-medium text-ink">Foto por confirmar</p>
            <p className="mt-1 text-xs text-ink-muted">Pídela por WhatsApp</p>
          </div>
        )}
        
        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
        </div>

        {/* Información del producto */}
        <div className="p-4 md:p-5 space-y-3">
          {/* Categoría minimalista */}
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-ink-muted">
              {product.category}
            </span>
          </div>

          {/* Nombre del producto */}
          <h3 className="font-display text-base md:text-lg text-ink line-clamp-2 leading-snug tracking-tight min-h-[2.5rem] font-medium">
            {product.name}
          </h3>

            {/* Precio elegante */}
            <div className="pt-0.5">
              <p className="font-display text-xl md:text-2xl font-semibold text-ink tracking-tight">
              {formatCLP(product.price)}
            </p>
          </div>
        </div>
      </Link>

      {/* Botón de WhatsApp minimalista - fuera del Link para evitar conflictos */}
      <div className="px-4 md:px-5 pb-4 md:pb-5 mt-auto">
        {cta === "ficha" ? (
          <Link
            href={productPath}
            className={buttonClasses({
              variant: "secondary",
              size: "sm",
              fullWidthMobile: false,
              className: "relative z-10 w-full",
            })}
          >
            Ver ficha
          </Link>
        ) : (
          <WhatsAppCTA
            href={whatsappUrl}
            label={hasProductImage ? "Cotizar" : "Pedir foto"}
            placement="product_card"
            size="sm"
            fullWidthMobile={false}
            className="relative z-10 w-full"
            productTitle={product.name}
            productId={product.handle || product.id}
            productPrice={product.price}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Rating from "@/app/components/Rating";
import { AiOutlineCreditCard, AiOutlineArrowLeft } from "react-icons/ai";
import Client from "shopify-buy";
import CartSideBar from "@/app/components/CartSideBar";
import { useCart } from "@/app/context/CartContext";
import { enviarEventoCAPI } from "@/lib/capi";

// Tipos para Shopify
interface ProductOption {
  name: string;
  values: string[];
}

interface SelectedOption {
  name: string;
  value: string;
}

interface ShopifyVariant {
  id: string;
  priceV2: {
    amount: string;
  };
  selectedOptions: SelectedOption[];
}

interface VariantEdge {
  node: ShopifyVariant;
}

interface ShopifyImageNode {
  src: string;
}

interface ImageEdge {
  node: ShopifyImageNode;
}

export interface ShopifyProduct {
  title: string;
  options: ProductOption[];
  variants: {
    edges: VariantEdge[];
  };
  images: {
    edges: ImageEdge[];
  };
  descriptionHtml: string;
}

// Configura el cliente de Shopify
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  apiVersion: "2024-01",
});

export default function ProductDetails({ product }: { product: ShopifyProduct }) {
  const { options = [], variants, images } = product;
  const { setCart, toggleCart } = useCart();
  const router = useRouter();

  // Determina si se deben mostrar opciones de variantes
  const showOptions = variants.edges.length > 1 || options.length > 1;

  // Estado inicial de opciones (ej. color, talla)
  const initialOptionsState: Record<string, string> = {};
  options.forEach((opt: ProductOption) => {
    if (opt.values?.length) {
      initialOptionsState[opt.name] = opt.values[0];
    }
  });
  const [selectedOptionsState, setSelectedOptionsState] = useState<Record<string, string>>(initialOptionsState);

  // Encuentra la variante que coincide con las opciones seleccionadas
  const findMatchingVariant = useCallback((): ShopifyVariant | null => {
    for (const edge of variants.edges) {
      const variant = edge.node;
      const match = variant.selectedOptions.every((selOpt: SelectedOption) => {
        return selectedOptionsState[selOpt.name] === selOpt.value;
      });
      if (match) return variant;
    }
    return null;
  }, [selectedOptionsState, variants.edges]);

  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(findMatchingVariant());

  // Actualiza variante seleccionada cuando cambian las opciones
  useEffect(() => {
    const matchingVariant = findMatchingVariant();
    setSelectedVariant(matchingVariant);
  }, [selectedOptionsState, findMatchingVariant]);

  // Carga el checkout existente para mantener el carrito
  useEffect(() => {
    const fetchCheckout = async () => {
      const checkoutId = localStorage.getItem("checkoutId");
      if (checkoutId) {
        const existingCheckout = await client.checkout.fetch(checkoutId);
        setCart(existingCheckout);
      }
    };
    fetchCheckout();
  }, [setCart]);

  // Calcula el precio base de la variante seleccionada
  const basePrice = selectedVariant?.priceV2?.amount
    ? Math.round(Number(selectedVariant.priceV2.amount))
    : 0;

  // Helper para formatear precios
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-ES", { maximumFractionDigits: 0 })}`;
  };

  // Manejador para cambiar opciones (ej. color, talla)
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptionsState((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Manejador para volver a la página anterior
  const handleGoBack = () => {
    router.back();
  };

  // -------------------------------------------------------------------
  // Estado para controlar el Swiper principal y poder desplazarlo al hacer clic en las miniaturas
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);

  // Renderiza el slider principal + miniaturas
  const renderImages = () => {
    if (!images || !images.edges) return null;
    return (
      <div className="relative flex flex-col items-center mb-4">
        {/* Ícono de volver */}
        <button 
          onClick={handleGoBack}
          className="absolute top-4 left-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          aria-label="Volver"
        >
          <AiOutlineArrowLeft size={24} />
        </button>

        {/* Contenedor responsivo para el slider */}
        <div className="w-full max-w-full md:max-w-[400px] lg:max-w-[500px] mx-auto">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            pagination={{ clickable: true }}
            onSwiper={(swiper) => setMainSwiper(swiper)}
          >
            {images.edges.map((imageEdge: ImageEdge, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={imageEdge.node.src}
                  alt={`Slide ${index}`}
                  width={600}
                  height={375}
                  className="object-cover w-full h-auto"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Miniaturas */}
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          {images.edges.map((thumbEdge: ImageEdge, thumbIndex: number) => (
            <Image
              key={thumbIndex}
              src={thumbEdge.node.src}
              alt={`Thumbnail ${thumbIndex}`}
              width={100}
              height={75}
              className="object-cover border border-gray-300 cursor-pointer hover:opacity-80"
              onClick={() => {
                if (mainSwiper) {
                  mainSwiper.slideTo(thumbIndex);
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  };
  // -------------------------------------------------------------------

  // Agregar producto al carrito y abrir el sidebar sin alert
  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    try {
      const checkoutId = localStorage.getItem("checkoutId");
      let checkout;
      if (!checkoutId) {
        checkout = await client.checkout.create();
        localStorage.setItem("checkoutId", checkout.id);
      } else {
        checkout = await client.checkout.fetch(checkoutId);
      }
      const lineItemsToAdd = [
        {
          variantId: selectedVariant.id,
          quantity: 1,
        },
      ];
      checkout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      setCart(checkout);
      // Abre el CartSideBar en lugar de alertar
      toggleCart();

      // Enviar evento AddToCart a Facebook con datos adicionales
      // Se envía el precio, el nombre del producto, el ID de la variante y se indica que es un producto.
      enviarEventoCAPI({
        event_name: "AddToCart",
        value: Number(selectedVariant.priceV2.amount),
        currency: "CLP",
        content_name: product.title,
        content_ids: [selectedVariant.id],
        content_type: "product",
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  // Comprar ahora
  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    try {
      const checkout = await client.checkout.create();
      const lineItemsToAdd = [
        {
          variantId: selectedVariant.id,
          quantity: 1,
        },
      ];
      const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      window.location.href = updatedCheckout.webUrl;
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  // Renderiza las opciones (si hay más de una)
  const renderOptions = () => {
    return options.map((opt: ProductOption) => {
      const optionName = opt.name;
      const values = opt.values || [];
      return (
        <div key={optionName} className="mb-4">
          <p className="text-sm font-medium mb-2">{optionName}</p>
          <div className="flex flex-wrap gap-2">
            {values.map((val: string) => {
              const isActive = selectedOptionsState[optionName] === val;
              return (
                <button
                  key={val}
                  onClick={() => handleOptionChange(optionName, val)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-black hover:bg-gray-100"
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sección de imágenes */}
        <div className="w-full md:w-1/2 md:p-8 md:flex md:items-center md:justify-center">
          {renderImages()}
        </div>

        {/* Sección de detalles */}
        <div className="w-full md:w-1/2 p-6">
          {/* Título, badge y Rating */}
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <h1 className={`font-bold ${product.title.length > 20 ? "text-2xl" : "text-3xl"}`}>
                {product.title}
              </h1>
              {product.title.length > 20 && (
                <span className="bg-yellow-400 text-black text-xs font-bold uppercase px-2 py-1 rounded">
                  Más Vendido
                </span>
              )}
            </div>
            <div className="mt-2">
              <Rating rating={4.5} reviewCount={Math.round(product.title.length * 0.75)} />
            </div>
          </div>

          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatPrice(basePrice)}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            6 cuotas sin interés de {formatPrice(Math.round(basePrice / 6))}
            <AiOutlineCreditCard className="ml-2" size={20} />
          </div>

          {/* Opciones de variantes */}
          {showOptions && renderOptions()}

          {/* Botones de acción */}
          <div className="flex flex-col gap-4 md:flex-row mt-8 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant}
              className="w-full md:flex-1 px-6 py-3 bg-white text-black border border-black rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-lg font-bold"
            >
              Agregar al carrito
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!selectedVariant}
              className="w-full md:flex-1 px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors text-lg font-bold"
            >
              Comprar
            </button>
          </div>

          {/* Descripción del producto */}
          <div
            className="prose mb-8"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>
      </div>

      <CartSideBar />
    </>
  );
}
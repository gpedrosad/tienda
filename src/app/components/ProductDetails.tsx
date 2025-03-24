"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Rating from "@/app/components/Rating";
import { AiOutlineCreditCard } from "react-icons/ai";
import Client from "shopify-buy";
import CartSideBar from "@/app/components/CartSideBar";
import Header from "@/app/components/Header";
import { useCart } from "@/app/context/CartContext";

// Configura el cliente de Shopify
const client = Client.buildClient({
  domain: "ideamadera.myshopify.com",
  storefrontAccessToken: "e7bfcafb70411824e2d9e65b3d837e02",
  apiVersion: "2024-01",
});

export default function ProductDetails({ product }: { product: any }) {
  const { options = [], variants = { edges: [] }, images } = product;
  const { setCart } = useCart();

  // Se determina si se deben mostrar las opciones:
  // Si hay más de una variante o más de una opción, se muestra la UI de variantes.
  const showOptions = variants.edges.length > 1 || options.length > 1;

  const initialOptionsState: Record<string, string> = {};
  options.forEach((opt: any) => {
    if (opt.values?.length) {
      initialOptionsState[opt.name] = opt.values[0];
    }
  });

  const [selectedOptionsState, setSelectedOptionsState] = useState(initialOptionsState);

  const findMatchingVariant = () => {
    for (const edge of variants.edges) {
      const variant = edge.node;
      const match = variant.selectedOptions.every((selOpt: any) => {
        return selectedOptionsState[selOpt.name] === selOpt.value;
      });
      if (match) return variant;
    }
    return null;
  };

  const [selectedVariant, setSelectedVariant] = useState(findMatchingVariant());

  useEffect(() => {
    const matchingVariant = findMatchingVariant();
    setSelectedVariant(matchingVariant);
  }, [selectedOptionsState]);

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

  const basePrice = selectedVariant?.priceV2?.amount
    ? Math.round(Number(selectedVariant.priceV2.amount))
    : 0;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-ES", { maximumFractionDigits: 0 })}`;
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptionsState((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const renderOptions = () => {
    return options.map((opt: any) => {
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

  const renderImages = () => {
    if (!images || !images.edges) return null;
    return (
      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
      >
        {images.edges.map((imageEdge: any, index: number) => (
          <SwiperSlide key={index}>
            <img
              src={imageEdge.node.src}
              alt={`Slide ${index}`}
              className="w-full h-auto object-contain md:h-[500px] md:object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    try {
      let checkoutId = localStorage.getItem("checkoutId");
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
      console.log("Checkout actualizado:", checkout);
      setCart(checkout);
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

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

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:p-8 md:flex md:items-center md:justify-center">
          {renderImages()}
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="text-sm bg-yellow-400 text-black font-bold uppercase tracking-wide px-4 py-2 inline-block rounded mb-4">
            Más Vendido
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <Rating rating={4.5} reviewCount={213} />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatPrice(basePrice)}
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            6 cuotas sin interés de {formatPrice(Math.round(basePrice / 6))}
            <AiOutlineCreditCard className="ml-2" size={20} />
          </div>
          {/* Solo se muestran las opciones si existen más de una variante o opción */}
          {showOptions && renderOptions()}
          {/* Botones antes de la descripción */}
          <div className="flex flex-col gap-4 md:flex-row mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant}
              className="w-full md:flex-1 px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors text-lg font-bold"
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
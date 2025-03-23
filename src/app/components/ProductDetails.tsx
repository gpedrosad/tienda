"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Rating from "@/app/components/Rating"; // Ajusta la ruta según tu estructura
import { AiOutlineCreditCard } from "react-icons/ai";

export default function ProductDetails({ product }: { product: any }) {
  const { options = [], variants = { edges: [] }, images } = product;

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
      if (match) {
        return variant;
      }
    }
    return null;
  };

  const [selectedVariant, setSelectedVariant] = useState(findMatchingVariant());

  useEffect(() => {
    const matchingVariant = findMatchingVariant();
    setSelectedVariant(matchingVariant);
  }, [selectedOptionsState]);

  const basePrice = selectedVariant?.priceV2?.amount
    ? Math.round(Number(selectedVariant.priceV2.amount))
    : 0;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-ES", { maximumFractionDigits: 0 })}`;
  };

  const calculateInstallments = (total: number) => {
    return Math.round(total / 6);
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
                  className={`px-3 py-1 rounded-full border text-sm ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-black"
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

  return (
    <div className="flex flex-col md:flex-row">
      {/* Columna de la imagen */}
      <div className="w-full md:w-1/2 md:p-8 md:flex md:items-center md:justify-center">
        {renderImages()}
      </div>

      {/* Columna de detalles */}
      <div className="w-full md:w-1/2 p-8">
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

        {renderOptions()}

        <div
          className="prose mb-8"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </div>
    </div>
  );
}
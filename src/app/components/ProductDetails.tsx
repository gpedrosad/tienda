"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules"; // Importación desde "swiper/modules"
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import CheckoutButton from "@/app/components/CheckoutButton";
import { useState } from "react"; // Nuevo import

export default function ProductDetails({ product }: { product: any }) {
  // Obtener información del primer variant
  const variant = product.variants.edges[0]?.node;
  const basePrice = variant?.priceV2?.amount ? Math.round(Number(variant.priceV2.amount)) : 0;
  
  // Nuevo estado para los addons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Nuevo estado para los variantes seleccionados
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: string}>({});

  // Definición de addons disponibles
  const addons = [
    { 
      id: 'barniz', 
      name: 'Barniz', 
      price: 10000,
      description: 'Acabado protector que realza tu producto',
      variants: [
        {
          id: 'barniz-negro',
          name: 'Negro',
          image: '/images/barniz-negro.jpg',
          colorClass: 'bg-black'
        },
        {
          id: 'barniz-blanco',
          name: 'Blanco',
          image: '/images/barniz-blanco.jpg',
          colorClass: 'bg-white border border-gray-200'
        }
      ]
    }
  ];

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    const addonsTotal = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return basePrice + addonsTotal;
  };

  // Función para manejar la selección de addons
  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Función para manejar la selección de variantes
  const handleVariantSelect = (addonId: string, variantId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [addonId]: variantId
    }));
  };

  return (
    <div className="min-h-screen p-8">
      {/* Label destacado */}
      <div className="text-sm bg-yellow-400 text-black font-bold uppercase tracking-wide px-4 py-2 inline-block rounded mb-4">
        Más Vendido
      </div>

      {/* Título del producto */}
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {/* Contenido del producto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carrusel de imágenes */}
        <div>
          <Swiper
            modules={[Pagination]} // Asegúrate de que el módulo esté bien configurado
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }} // Activa los puntos de navegación
          >
            {product.images.edges.map((image: any, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={image.node.src}
                  alt={`Slide ${index}`}
                  className="w-full h-auto mb-4 rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Detalles del producto */}
        <div>
          {/* Precio actualizado */}
          <div className="text-2xl font-bold text-green-600 mb-2">
            ${calculateTotalPrice()}
          </div>

          {/* Nueva sección de addons con selección de color */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Complementos disponibles</h3>
            <div className="space-y-6">
              {addons.map(addon => (
                <div 
                  key={addon.id} 
                  className={`
                    border rounded-lg p-6 transition-all duration-200
                    ${selectedAddons.includes(addon.id) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div className="space-y-4">
                    {/* Cabecera del addon */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{addon.name}</h4>
                        <p className="text-gray-600 text-sm">{addon.description}</p>
                      </div>
                      <div className="text-green-600 font-semibold">
                        +${addon.price}
                      </div>
                    </div>

                    {/* Checkbox para seleccionar el addon */}
                    <div>
                      <label className="inline-flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          id={addon.id}
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => handleAddonToggle(addon.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-5 w-5"
                        />
                        <span className="text-sm text-gray-700">
                          Agregar barniz a mi pedido
                        </span>
                      </label>
                    </div>

                    {/* Selector de color de barniz */}
                    {selectedAddons.includes(addon.id) && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Selecciona el color del barniz:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {addon.variants.map(variant => (
                            <div 
                              key={variant.id}
                              onClick={() => handleVariantSelect(addon.id, variant.id)}
                              className={`
                                group relative cursor-pointer rounded-lg overflow-hidden
                                transition-all duration-200
                                ${selectedVariants[addon.id] === variant.id 
                                  ? 'ring-2 ring-green-500 ring-offset-2' 
                                  : 'hover:opacity-90'}
                              `}
                            >
                              <div className="aspect-square relative">
                                {/* Color del barniz */}
                                <div className={`
                                  absolute inset-0 ${variant.colorClass}
                                  transition-opacity duration-200
                                `}></div>
                                
                                {/* Efecto de hover y nombre */}
                                <div className={`
                                  absolute inset-0 flex items-center justify-center
                                  bg-black bg-opacity-0 group-hover:bg-opacity-30
                                  transition-all duration-200
                                `}>
                                  <span className={`
                                    px-3 py-1.5 rounded-full
                                    ${variant.name === 'Negro' 
                                      ? 'bg-white text-black' 
                                      : 'bg-black text-white'}
                                    text-sm font-medium
                                    opacity-0 group-hover:opacity-100
                                    transform translate-y-2 group-hover:translate-y-0
                                    transition-all duration-200
                                  `}>
                                    {variant.name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Valoraciones */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <span className="text-gray-500 text-sm">(213 valoraciones)</span>
          </div>

          {/* Descripción del producto */}
          <div
            className="prose mb-8"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Botón de compra */}
          {variant?.id && (
            <CheckoutButton 
              variantId={variant.id} 
              selectedAddons={selectedAddons}
              quantity={1}
            />
          )}
        </div>
      </div>
    </div>
  );
}
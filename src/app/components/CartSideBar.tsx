"use client";
import { useState, useEffect, useCallback } from "react";
import Client from "shopify-buy";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
  AiOutlineClose,
} from "react-icons/ai";
import { useCart, CartItem } from "@/app/context/CartContext";

// Build Shopify client (usa una versión estable de la API)
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "",
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  apiVersion: "2023-07",
});

export default function CartSidebar() {
  const { cart, setCart, isCartOpen, toggleCart } = useCart();
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => setIsResizing(true);

  // Usamos useCallback para memoizar la función y poder incluirla en las dependencias
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 240 && newWidth <= 500) {
      setSidebarWidth(newWidth);
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Actualiza la cantidad de un ítem en el carrito
  const updateLineItemQuantity = async (lineItemId: string, newQuantity: number) => {
    if (!cart) return;
    try {
      const updatedCheckout = await client.checkout.updateLineItems(cart.id, [
        { id: lineItemId, quantity: newQuantity },
      ]);
      setCart(updatedCheckout);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remueve un ítem del carrito
  const removeLineItem = async (lineItemId: string) => {
    if (!cart) return;
    try {
      const updatedCheckout = await client.checkout.removeLineItems(cart.id, [
        lineItemId,
      ]);
      setCart(updatedCheckout);
    } catch (error) {
      console.error("Error removing line item:", error);
    }
  };

  // Formatea el precio
  const formatPrice = (amount: number) => {
    return `$${Math.round(amount).toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  if (!isCartOpen) return null;

  return (
    // Overlay que cierra el sidebar al hacer click fuera
    <div className="fixed inset-0 z-50 flex" onClick={toggleCart}>
      {/* Fondo semi-transparente */}
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300" />

      {/* Sidebar con transición */}
      <div
        className="relative ml-auto bg-white border-l border-gray-200 shadow-2xl overflow-auto transition-transform duration-300 transform"
        style={{ width: sidebarWidth }}
        onClick={(e) => e.stopPropagation()} // Evita que los clicks dentro cierren el sidebar
      >
        {/* Botón para cerrar el sidebar */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleCart}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tu Carrito</h2>
          {cart && cart.lineItems && cart.lineItems.length > 0 ? (
            <ul className="space-y-4">
              {cart.lineItems.map((item: CartItem) => (
                <li key={item.id} className="border-b pb-4 flex items-center">
                  {item.variant?.image?.src && (
                    <img
                      src={item.variant.image.src}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">{item.title}</p>
                    <div className="flex items-center mt-2">
                      {/* Decrementar o remover ítem */}
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateLineItemQuantity(item.id, item.quantity - 1);
                          } else {
                            removeLineItem(item.id);
                          }
                        }}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        <AiOutlineMinus size={18} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      {/* Incrementar ítem */}
                      <button
                        onClick={() => updateLineItemQuantity(item.id, item.quantity + 1)}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        <AiOutlinePlus size={18} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeLineItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4 focus:outline-none"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay productos en tu carrito.</p>
          )}
        </div>
        {cart && cart.totalPriceV2 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-800">Total a pagar:</span>
              <span className="font-bold text-gray-900">
                {formatPrice(cart.totalPriceV2.amount)}
              </span>
            </div>
            {cart.webUrl && (
              <button
                onClick={() => (window.location.href = cart.webUrl)}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
              >
                Pagar
              </button>
            )}
          </div>
        )}
        {/* Handle para redimensionar el sidebar */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 h-full w-3 cursor-ew-resize bg-gray-100 hover:bg-gray-200"
        />
      </div>
    </div>
  );
}
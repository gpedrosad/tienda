// app/components/CartSidebar.tsx
"use client";
import { useState, useEffect } from "react";
import Client from "shopify-buy";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
  AiOutlineClose,
} from "react-icons/ai";
import { useCart } from "@/app/context/CartContext";

// Build Shopify client (use a stable API version)
const client = Client.buildClient({
  domain: "ideamadera.myshopify.com",
  storefrontAccessToken: "e7bfcafb70411824e2d9e65b3d837e02",
  apiVersion: "2023-07", // or omit to let the SDK pick a supported default
});

export default function CartSidebar() {
  const { cart, setCart, isCartOpen, toggleCart } = useCart();
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => setIsResizing(true);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 240 && newWidth <= 500) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => setIsResizing(false);

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
  }, [isResizing]);

  // Update the quantity of a line item in the cart
  const updateLineItemQuantity = async (lineItemId: string, newQuantity: number) => {
    if (!cart) return;
    try {
      console.log("Actualizando item", lineItemId, "a cantidad:", newQuantity);

      const updatedCheckout = await client.checkout.updateLineItems(cart.id, [
        { id: lineItemId, quantity: newQuantity },
      ]);

      console.log("Checkout actualizado:", updatedCheckout.lineItems);
      setCart(updatedCheckout);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove a line item from the cart
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

  // Format price (with rounding and thousands separators)
  const formatPrice = (amount: number) => {
    return `$${Math.round(amount).toLocaleString("es-ES", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 h-full bg-white border-l border-gray-200 shadow-2xl overflow-auto transition-all duration-300 z-50"
      style={{ width: sidebarWidth }}
    >
      {/* Close Sidebar Button */}
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
            {cart.lineItems.map((item: any) => (
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
                    {/* Decrement or Remove */}
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
                    {/* Increment */}
                    <button
                      onClick={() => {
                        console.log("Cantidad actual para", item.id, "es", item.quantity);
                        updateLineItemQuantity(item.id, item.quantity + 1);
                      }}
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
      {/* Handle to resize sidebar */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute left-0 top-0 h-full w-3 cursor-ew-resize bg-gray-100 hover:bg-gray-200"
      />
    </div>
  );
}
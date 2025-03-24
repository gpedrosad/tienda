// app/context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MoneyV2 {
  amount: number; // Actualizado a number
  currencyCode: string;
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  variant?: {
    image?: {
      src: string;
    };
  };
}

export interface Cart {
  id: string;
  lineItems: CartItem[];
  webUrl: string;
  totalPriceV2?: MoneyV2; // Propiedad agregada para el total
}

interface CartContextType {
  cart: Cart | null;
  setCart: (cart: Cart | null) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  setCart: () => {},
  isCartOpen: false,
  toggleCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  let cartCount = 0;
  if (cart && cart.lineItems) {
    cartCount = cart.lineItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, isCartOpen, toggleCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
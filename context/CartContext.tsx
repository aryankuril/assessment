"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
};


type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (item: {
  id: string;
  title: string;
  price: number;
  image: string;
}) => {
  setCart((prev) => {
    const existing = prev.find(p => p.id === item.id);

    if (existing) {
      return prev.map(p =>
        p.id === item.id ? { ...p, qty: p.qty + 1 } : p
      );
    }

    return [
      ...prev,
      {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        qty: 1,
      },
    ];
  });
};


  const updateQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside provider");
  return ctx;
};

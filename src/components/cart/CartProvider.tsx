"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CART_STORAGE_KEY, getCartCount, safeParseCart, type StoredCart } from "@/lib/cart";

type CartContextValue = {
  cart: StoredCart;
  count: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function persistCart(cart: StoredCart) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore write errors
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<StoredCart>({});

  useEffect(() => {
    const initial = safeParseCart(
      typeof window !== "undefined" ? window.localStorage.getItem(CART_STORAGE_KEY) : null,
    );
    setCart(initial);
  }, []);

  useEffect(() => {
    persistCart(cart);
  }, [cart]);

  const value = useMemo<CartContextValue>(() => {
    return {
      cart,
      count: getCartCount(cart),
      add(productId, quantity = 1) {
        setCart((prev) => {
          const nextQty = (prev[productId] ?? 0) + Math.max(1, Math.floor(quantity));
          return { ...prev, [productId]: nextQty };
        });
      },
      remove(productId) {
        setCart((prev) => {
          if (!(productId in prev)) return prev;
          const { [productId]: _, ...rest } = prev;
          return rest;
        });
      },
      setQuantity(productId, quantity) {
        const q = Math.floor(quantity);
        setCart((prev) => {
          if (q <= 0) {
            const { [productId]: _, ...rest } = prev;
            return rest;
          }
          return { ...prev, [productId]: q };
        });
      },
      clear() {
        setCart({});
      },
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


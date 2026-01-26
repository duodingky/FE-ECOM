"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CART_STORAGE_KEY,CART_ORDERID_KEY, safeParseCart, CART_COUNT_KEY, type StoredCart, additemIncart } from "@/lib/cart";

type CartContextValue = {
  count: number;
  orderId: string;
  add: (productId: string, quantity?: number) => void;
  setQuantity: ( quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);


function persistCart(orderId: string = "", cartCount: number = 0) {
  try {
    window.localStorage.setItem(CART_ORDERID_KEY, orderId);
    window.localStorage.setItem(CART_COUNT_KEY, cartCount.toString());
  } catch {
    // ignore write errors
  }
}

 
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const OldOOrderId =  window.localStorage.getItem(CART_ORDERID_KEY) || '';
    persistCart(OldOOrderId, count);
    if(OldOOrderId!=='' && orderId===''){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrderId(OldOOrderId);
    }
  }, [orderId, count]);

  const value = useMemo<CartContextValue>(() => {
    return {
      count:count,
      orderId,
      async add(productId, quantity = 1) {
         const newOrderId=  await additemIncart({id:productId, qty:quantity}, orderId);
          setCount((prev) => prev + quantity);
          if(orderId===''){
              setOrderId(newOrderId);
              persistCart(newOrderId, quantity + count);
          } 
      },
      setQuantity(quantity) {
          setCount((prev) => prev + quantity);
      },
      clear() {
          setCount(0);
          setOrderId('');
          persistCart('', 0);
      }
    };
  }, [count, orderId]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


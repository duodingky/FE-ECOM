"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/feedback/ToastProvider";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  sku: string;
  size?: "sm" | "lg";
};

const DISABLE_DURATION_MS = 3000;

export function AddToCartButton({
  productId,
  productName,
  sku,
  size = "lg",
}: AddToCartButtonProps) {
  const { add } = useCart();
  const { addToast } = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (isDisabled) return;
    add(productId, 1);
    addToast({
      title: "Added to cart",
      description: `${productName} - SKU ${sku}`,
    });
    setIsDisabled(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsDisabled(false);
    }, DISABLE_DURATION_MS);
  };

  const sizeClasses =
    size === "sm" ? "h-9 flex-1 px-3 text-sm" : "h-11 w-full px-4 text-sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        sizeClasses,
        isDisabled
          ? "cursor-not-allowed bg-zinc-200 text-zinc-500"
          : "bg-zinc-900 text-white hover:bg-zinc-800",
      ].join(" ")}
    >
      {isDisabled ? "Added" : "Add to cart"}
    </button>
  );
}


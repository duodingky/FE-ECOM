"use client";

import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  productId,
}: {
  productId: string;
}) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add(productId, 1)}
      className={[
        "inline-flex h-11 w-full items-center justify-center rounded-md px-4 text-sm font-medium",
        true
          ? "bg-zinc-900 text-white hover:bg-zinc-800"
          : "cursor-not-allowed bg-zinc-200 text-zinc-500",
      ].join(" ")}
    >
       Add to cart 
    </button>
  );
}


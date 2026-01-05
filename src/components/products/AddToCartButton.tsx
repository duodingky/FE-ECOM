"use client";

import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  productId,
  inStock,
}: {
  productId: string;
  inStock: boolean;
}) {
  const { add } = useCart();

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={() => add(productId, 1)}
      className={[
        "inline-flex h-11 w-full items-center justify-center rounded-md px-4 text-sm font-medium",
        inStock
          ? "bg-zinc-900 text-white hover:bg-zinc-800"
          : "cursor-not-allowed bg-zinc-200 text-zinc-500",
      ].join(" ")}
    >
      {inStock ? "Add to cart" : "Out of stock"}
    </button>
  );
}


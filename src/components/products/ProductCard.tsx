"use client";

import Link from "next/link";
import {  type pProducts } from "@/lib/type/catalog";
import { useCart } from "@/components/cart/CartProvider";

export function ProductCard({ product }: { product: pProducts }) {
  const { add } = useCart();

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-zinc-100 to-zinc-200" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${product.productName}`}
            className="text-sm font-semibold text-zinc-950 hover:underline"
          >
            {product.productName}
          </Link>
          <div className="text-sm font-semibold text-zinc-900">
            {product.price}
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.shortDesc}</p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            href={`/product/${product.productName}`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
          >
            View
          </Link>
          <button
            type="button"
            onClick={() => add(product.id, 1)}
            className={[
              "inline-flex h-9 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium",
              true 
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "cursor-not-allowed bg-zinc-200 text-zinc-500",
            ].join(" ")}
          >
            Add to cart 
          </button>
        </div>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { type pProducts } from "@/lib/type/catalog";
import { AddToCartButton } from "@/components/products/AddToCartButton";

export function ProductCard({ product }: { product: pProducts }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
  
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-zinc-100 to-zinc-200" >
        <Image
           src={product.imageUrl}
            width={500}
            height={500}
            alt={product.productName}
       />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/product/${product.productName}`}
            className="text-sm font-semibold text-zinc-950 hover:underline"
          >
            {product.productName}
          </Link>
          <div className="text-sm font-semibold text-zinc-900">
            {product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.brandName}</p>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.shortDesc}</p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            href={`/product/${product.productName}/${product.id}`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-200 px-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
          >
            View
          </Link>
          <AddToCartButton
            productId={product.id}
            productName={product.productName}
            sku={product.sku ?? product.id}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}


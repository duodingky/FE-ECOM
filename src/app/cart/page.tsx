// app/cart/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import type { pProducts } from "@/lib/type/catalog";

type CartRow = {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  price: number;
};

const SHIPPING_FEE = 100;

function normalizePrice(price: unknown): number {
  if (typeof price === "number" && Number.isFinite(price)) return price;
  if (typeof price === "string") {
    const numeric = Number(price.replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }
  return 0;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CartPage() {
  const { cart } = useCart();
  const [products, setProducts] = useState<pProducts[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const productIds = useMemo(() => Object.keys(cart), [cart]);

  useEffect(() => {
    if (productIds.length === 0) {
      setProducts([]);
      setStatus("idle");
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const load = async () => {
      setStatus("loading");
      try {
        const res = await fetch("/api/products/search", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ids: productIds }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : data?.data ?? []);
          setStatus("idle");
        }
      } catch (error) {
        if (isMounted && !controller.signal.aborted) {
          console.error("Failed to load cart products", error);
          setProducts([]);
          setStatus("error");
        }
      }
    };

    load();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [productIds]);

  const rows = useMemo<CartRow[]>(() => {
    if (productIds.length === 0) return [];
    const byId = new Map(products.map((product) => [product.id, product]));

    return productIds
      .map((id) => {
        const product = byId.get(id);
        if (!product) return null;
        return {
          id,
          sku: product.sku ?? product.id,
          productName: product.productName,
          quantity: cart[id] ?? 0,
          price: normalizePrice(product.price),
        };
      })
      .filter((row): row is CartRow => Boolean(row));
  }, [cart, productIds, products]);

  const subtotal = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = rows.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shippingFee;

  const isEmptyCart = productIds.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Shopping Cart</h1>
        <p className="text-sm text-zinc-600">Review the items in your cart.</p>
      </div>

      {status === "loading" && (
        <div className="rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
          Loading cart items...
        </div>
      )}

      {status === "error" && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Unable to load cart items right now.
        </div>
      )}

      {isEmptyCart ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
          <p className="text-sm text-zinc-600">Your cart is empty.</p>
          <Link
            href="/search"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Back to shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">SKU</th>
                  <th className="px-4 py-3 text-left font-semibold">Product</th>
                  <th className="px-4 py-3 text-right font-semibold">Qty</th>
                  <th className="px-4 py-3 text-right font-semibold">Unit Price</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {rows.map((item) => {
                  const amount = item.price * item.quantity;
                  return (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-zinc-700">{item.sku}</td>
                      <td className="px-4 py-3 font-medium text-zinc-900">
                        {item.productName}
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-700">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-700">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-zinc-900">
                        {formatCurrency(amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-zinc-50">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-right font-semibold">
                    Subtotal
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(subtotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Shipping (Metro Manila)</span>
              <span className="font-medium">{formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Link
                href="/search"
                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Back to shopping
              </Link>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

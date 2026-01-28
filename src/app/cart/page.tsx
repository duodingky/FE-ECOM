// app/cart/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import type { CartProducts } from "@/lib/type/catalog";
 
 

const SHIPPING_FEE = 100;


function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function CartPage() {
  const { count, orderId } = useCart();
  const [products, setProducts] = useState<CartProducts[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  const gotopage = (page:string) => () => {
    router.push(`/${page}`);
  }
  useEffect(() => {
    if (orderId === '') {
      setStatus("idle");
      return;
    }
   console.log("Fetching cart items for orderId:", orderId);
    let isMounted = true;
    const controller = new AbortController();

    const load = async () => {
      setStatus("loading");
      try {
   
        const res = await fetch(`/api/order/${orderId}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();
          setProducts(data.orderItems);
          console.log("Cart items:", data.orderItems);
          setStatus("idle");
      } catch (error) {
        if (isMounted && !controller.signal.aborted) {
         // console.error("Failed to load cart products", error);
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
  }, [orderId]);

useEffect(() => {
  console.log("Products state updated:", products); // ✅ after React updates state
}, [products]);
  const subtotal = 0;
  const shippingFee = 0;
  const total = 0 ;



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

      {products.length===0? (
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
                {products.map((item) => {
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
                onClick={gotopage('checkout')}
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

import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getAllProducts, getCategories } from "@/lib/catalog";

export default function Home() {
  const categories = getCategories();
  const featured = getAllProducts().slice(0, 6);

  return (
    <div className="flex flex-col gap-10">
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="grid gap-6 p-8 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple e-commerce starter
            </h1>
            <p className="text-zinc-600">
              Browse categories, search products, and add items to your cart.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="inline-flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-400" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Featured products</h2>
          <Link href="/search" className="text-sm font-medium text-zinc-700 hover:underline">
            Browse all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

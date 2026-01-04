import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/catalog";
import { notFound } from "next/navigation";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next 16 route params can be async
  return (
    <CategoryPageInner params={params} />
  );
}

async function CategoryPageInner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategorySlug(slug);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-zinc-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Category
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{category.name}</h1>
        {category.description ? (
          <p className="text-zinc-600">{category.description}</p>
        ) : null}
      </div>

      {products.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
          No products found in this category.
        </div>
      )}
    </div>
  );
}


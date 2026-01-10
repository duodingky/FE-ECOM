import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
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
 

 

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-zinc-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Category 
          / {slug}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{slug}</h1>
       
      </div>
    
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
           Product List Here
        </div>
        
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-zinc-700">
           template if no product No products found in this category.
        </div>
    </div>
  );
}


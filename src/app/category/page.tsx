import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import {getCategories} from "@/lib/API/categories"
import {getProductsByCategory} from "@/lib/API/products"
import { notFound } from "next/navigation";
import { CategoriesList } from "@/components/products/CategoriesList";

 

export default async function CategoriesPage() {

  const id = "0"
  const categories =  await getCategories(id,true);
  if(!categories) notFound()
  const cname = Array.isArray(categories) ? categories[0]?.categoryName : categories.categoryName
 
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-zinc-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          / <Link
                key='category'
                href="/categories"
                className="hover:underline"
              >
              Category
              </Link>
          /   <Link
                key={cname}
                href={`/category/${cname}/${id}`}
                className="hover:underline"
              >
                {cname}
           </Link>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight"> Shop On {cname}</h1>
        <div className="border border-zinc-200 bg-white">
           <CategoriesList parent={id}  includeChildren={true} /> 
        </div>
      </div> 
    </div>
  );
}


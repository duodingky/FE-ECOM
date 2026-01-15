import Link from "next/link";
import Image from 'next/image'
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { getProducts} from "@/lib/API/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string , id: string}>;
}) {
   const { id } = await params;
  const product = await getProducts(id);
  console.log('product : ',product)

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-zinc-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href={`/category/${product[0].categoryName}`} className="hover:underline">
          {product[0].categoryName}
        </Link>{" "}
        / Product
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200">
           <Image
              src={product[0].imageUrl===null ? '/images/noImage.png':product[0].imageUrl}
              width={540}
              height={405}
              alt={product[0].productName}
          />
        </div>
                              
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{product[0].productName}</h1>
          <div className="text-lg font-semibold">{product[0].price}</div>
          <p className="text-zinc-700">{product[0].shortDesc}</p>

          <div className="pt-2">
            <AddToCartButton productId={product[0].id} />
          </div>

          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-900">Available</span>
            </div>
          </div>
        </div>
       <div className="col-span-2  p-4 text-md text-zinc-700  rounded-xl border border-zinc-200">  {product[0].longDesc} </div>
      </div>
    </div>
  );
}


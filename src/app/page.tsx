import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoriesList } from "@/components/products/CategoriesList";
import {getFeaturedProducts} from "@/lib/API/products"
import {getHomeBanner} from "@/lib/API/homePageBanner"
import { ImageCarousel } from "@/components/home/ImageCarousel";
import Image from 'next/image'

export default async function Home() {
  const featured = await getFeaturedProducts()
  const banners = await getHomeBanner()

   const NumProductEmptyBox = 3 - featured.length  % 3;
  
    const renderEmptyProductBoxes =(count: number) => {
    const boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(<div key={i}>
        <div>
           <Image
              src="/images/emptyProduct.png"
              width={350}
              height={500}
              alt="empty product"
          />
        </div>
      </div>)
      return boxes;
    }
  }
  return (
    <div className="flex flex-col gap-10">
      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="grid gap-6 p-8 ">
          <ImageCarousel data={banners} strapiBaseUrl={process.env.STRAPI_API_BASE_URL ??'' } />
        </div>
     
      </section>
      <section className="flex flex-col gap-4">
         <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Categories</h2>
          <Link href="/categories" className="text-sm font-medium text-zinc-700 hover:underline">
            Browse all Categories
          </Link>
        </div>
        <CategoriesList parent="0" />

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
          
          {renderEmptyProductBoxes(NumProductEmptyBox)}
        </div>
      </section>
    </div>
  );
}

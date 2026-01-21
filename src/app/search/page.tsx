 
"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryTreeCheckBox  } from "@/components/products/CategoryTreeCheckBox";
import type { pBrand, pProducts, Category } from "@/lib/type/catalog";
import {  useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams(); 
  
    const initialQ = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
    const [q, setQ] = useState(initialQ);
    
   const getBrands = async () => {
      try {
        const res = await fetch("/api/brands");  
        return  await res.json();
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
      }
    };
    
    const { data: brands, error: brandsError, isLoading: brandsLoading } = useQuery({
     queryKey: ["brands"], // unique key for caching
     queryFn: getBrands, // your API function
  });


  const getCategory = async () => {
    try {
      const res = await fetch("/api/category");
      return await res.json();
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const categoryTree = Array.isArray(categories) ? categories : [];
  const  searchProduct = async () => {
      try {
        const  params= {q: searchParams.get("q") ?? "" };
        const res = await fetch("/api/products/search",{method: "POST",body: JSON.stringify( params )}); 
        return  await res.json();
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
      }
    };
    
    const { data: products, error:errorSearch, isLoading:loadingSearch , refetch } = useQuery({
     queryKey: ["searchProducts"+q.replaceAll(" ","_")], // unique key for caching
     queryFn: searchProduct,  
     enabled: false
  });


  
  useEffect(() => {
     if( searchParams.get("q") !== q){
        setQ( searchParams.get("q") ?? "" );
        refetch();
     }
  }, [q, searchParams]); 

  

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Search Page</h1>

      <div className="grid grid-cols-4 gap-4">
         
        <div className="bg-green-300 p-4"> 
          
           <h2 className="text-lg font-semibold">Brand</h2> 
            <div className="mt-3 space-y-3">
                {!brandsLoading &&  brands?.map((brand:pBrand) => (
                  <div key={brand.id}>{brand.brandName}</div>
                ))}
                {brandsLoading && <div>Loading...</div>}
                {brandsError && <div>Error loading brands</div>}
           </div>

            <h2 className="text-lg font-semibold">Catgories</h2>
            <CategoryTreeCheckBox
                categoriesLoading={categoriesLoading}
                categoriesError={!!categoriesError}
                categoryTree={categoryTree}
              />
        </div>
        
          
        <div className="col-span-3 space-y-4 p-0">
         
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {!loadingSearch &&  products?.map((product:pProducts) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
}
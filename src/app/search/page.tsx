 
"use client";
import { useQuery } from "@tanstack/react-query";
import { BrandsFilter } from "@/components/products/BrandsFilter";
import { ProductCard } from "@/components/products/ProductCard";
import type { pProducts } from "@/lib/type/catalog";


export default  function SearchPage() {

   const getBrands = async () => {
      try {
        const res = await fetch("/api/brands");  
        return  await res.json();
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
      }
    };
    
    const { data: brands, error, isLoading } = useQuery({
     queryKey: ["brands"], // unique key for caching
     queryFn: getBrands, // your API function
  });


  const  searchProduct = async () => {
      try {
        const  params= {q: "a"}
        const res = await fetch("/api/products/search",{method: "POST",body: JSON.stringify( params )});  
        return  await res.json();
      } catch (err) {
        console.error("Error fetching brands:", err);
      } finally {
      }
    };
    
    const { data: products, error:errorSearch, isLoading:loadingSearch } = useQuery({
     queryKey: ["searchProducts"],  
     queryFn: searchProduct,  
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Search Page</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-300 p-4"> 
          {!isLoading && <BrandsFilter brands={brands ?? []} />}
          {isLoading && <div>Loading...</div>}
          {error && <div>Error loading brands</div>}
        </div> 
          <div className="col-span-3  p-0 "> 
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
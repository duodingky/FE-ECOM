 
"use client";
import { useQuery } from "@tanstack/react-query";
 




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

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">Search Page</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-green-300 p-4"> 
          {!isLoading &&  brands?.map((brand) => (
            <div key={brand.id}>{brand.brandName}</div>
          ))}
          {isLoading && <div>Loading...</div>}
          {error && <div>Error loading brands</div>}
        </div> 
          <div className="col-span-3 bg-blue-300 p-4"> Spans 3 columns </div>
      </div> 
    </div>
  );
}
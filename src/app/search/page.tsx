 
"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/products/ProductCard";
import type { pBrand, pProducts } from "@/lib/type/catalog";

type CategoryNode = {
  id?: string | number;
  categoryName: string;
  children?: CategoryNode[];
};

export default function SearchPage() {
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});

  const getCategoryKey = (category: CategoryNode) =>
    String(category.id ?? category.categoryName);

  const getCategoryChildren = (category: CategoryNode) =>
    Array.isArray(category.children) ? category.children : [];

  const collectCategoryKeys = (category: CategoryNode): string[] => {
    const children = getCategoryChildren(category);
    return children.flatMap((child) => [
      getCategoryKey(child),
      ...collectCategoryKeys(child),
    ]);
  };

  const toggleCategory = (category: CategoryNode) => {
    const key = getCategoryKey(category);
    setSelectedCategories((prev) => {
      const isSelected = !!prev[key];
      if (!isSelected) {
        return { ...prev, [key]: true };
      }

      const next = { ...prev };
      delete next[key];
      collectCategoryKeys(category).forEach((childKey) => {
        delete next[childKey];
      });
      return next;
    });
  };

  const renderCategoryNode = (category: CategoryNode, depth = 0) => {
    const key = getCategoryKey(category);
    const isSelected = !!selectedCategories[key];
    const children = getCategoryChildren(category);

    return (
      <div key={key} className={depth > 0 ? "pl-4" : ""}>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleCategory(category)}
          />
          <span className="text-sm">{category.categoryName}</span>
        </label>
        {children.length > 0 && isSelected && (
          <div className="mt-2 space-y-2">
            {children.map((child) => renderCategoryNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

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
  } = useQuery<CategoryNode[]>({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const categoryTree = Array.isArray(categories) ? categories : [];

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
          {!brandsLoading &&  brands?.map((brand:pBrand) => (
            <div key={brand.id}>{brand.brandName}</div>
          ))}
          {brandsLoading && <div>Loading...</div>}
          {brandsError && <div>Error loading brands</div>}
        </div> 
        <div className="col-span-3 space-y-4 p-0">
          <div className="rounded-md border border-zinc-200 bg-white p-4">
            <h2 className="text-lg font-semibold">Categories</h2>
            <div className="mt-3 space-y-3">
              {categoriesLoading && <div>Loading categories...</div>}
              {categoriesError && <div>Error loading categories</div>}
              {!categoriesLoading && !categoriesError && categoryTree.length === 0 && (
                <div>No categories found</div>
              )}
              {!categoriesLoading && !categoriesError && categoryTree.length > 0 && (
                <div className="space-y-3">
                  {categoryTree.map((category) => renderCategoryNode(category))}
                </div>
              )}
            </div>
          </div>
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
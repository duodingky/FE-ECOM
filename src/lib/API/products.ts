import { fetchApi } from "@/lib/API/fetchApi";
import type { pProducts } from "@/lib/type/catalog";
 

export async function getFeaturedProducts(): Promise<pProducts[]> {
    const result =   await fetchApi("/products?featured=" + true);
    return result.data;
}

export async function getProducts(id: string): Promise<pProducts[]> {
  const result = await fetchApi("/products/" + id);
  return result.data ?? [result];
}

export async function getProductsByCategory(id: string): Promise<pProducts[]> {
  const result = await fetchApi("/products/getByCategory/" + id);
  return result.data;
}
  

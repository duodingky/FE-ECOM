import { fetchApiGet } from "@/lib/API/fetchApi";
import type { pBrand } from "@/lib/type/catalog";

export async function getBrands(): Promise<pBrand[]> {
  const result = await fetchApiGet("/brands");
  return result.data;
}
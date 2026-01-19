import { fetchApi } from "@/lib/API/fetchApi";
import type { Brand } from "@/lib/type/catalog";

export async function getBrands(): Promise<Brand[]> {
  const result = await fetchApi("/brands");
  return result.data;
}
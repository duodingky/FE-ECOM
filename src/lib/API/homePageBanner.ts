import { fetchApi } from "@/lib/API/fetchApi";
import type { HomePageBanners } from "@/lib/type/catalog";
 

export async function getHomeBanner(): Promise<HomePageBanners[]> {
    const strapiUrl =  process.env.STRAPI_API_BASE_URL  
    const result =  await fetchApi("/api/banners?populate=*" ,strapiUrl, false);
    return result.data;
}
  

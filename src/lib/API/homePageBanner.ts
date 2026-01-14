import { fetchApi } from "@/lib/API/fetchApi";
import type { HomePageBanners } from "@/lib/type/catalog";
 

export async function getHomeBanner(): Promise<HomePageBanners[]> {
    const strapiUrl =  process.env.STRAPI_API_BASE_URL 
    try {
        const result =  await fetchApi("/api/banners?populate=*" ,strapiUrl, false);
        return result.data;
    } catch (error) {
        console.error("Error fetching home banners:", error);
        return [];
    }
}
  

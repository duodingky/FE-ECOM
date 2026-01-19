import { fetchApiGet } from "@/lib/API/fetchApi";
import type { pCategory } from "@/lib/type/catalog";

export async function getCategories(parent:string= "0", includeChildren: boolean = false): Promise<pCategory[] | pCategory > {
    const result =   await fetchApiGet("/categories/" + parent + "?includeChildren=" + includeChildren);
    return result.data ?? result
}

 


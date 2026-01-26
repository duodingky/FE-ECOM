
import { feApiCallPost } from "@/lib/feApiCall";

export type StoredCart = Record<string, number>; // productId -> quantity
export type CartItem = {id: string, qty: number};
export  {feApiCallPost, feApiCallGet, feApiCallDel} from "@/lib/feApiCall";

export const CART_STORAGE_KEY = "fe_ecom_cart_v1";
export const CART_ORDERID_KEY = "myOrderID_v1";
export const CART_COUNT_KEY = "myCartCount_v1"

export function safeParseCart(json: string | null): StoredCart {
  if (!json) return {};
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const obj = parsed as Record<string, unknown>;
    const out: StoredCart = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof k !== "string") continue;
      if (typeof v !== "number" || !Number.isFinite(v) || v <= 0) continue;
      out[k] = Math.floor(v);
    }
    return out;
  } catch {
    return {};
  }
}

export async function additemIncart(items: CartItem, orderId:string) : Promise<string>{
  if(orderId===''){
      orderId = await createOrder(items);
  }else{
      await updateOrder(items, orderId);
  }

  return  orderId;
}
  

async function createOrder(items: CartItem):Promise<string> {
  const orderId = await feApiCallPost("/api/order/createOrder", {items}) as string;
  console.log("Added item to cart, orderId:", orderId);
  return orderId;
}

async function updateOrder(items: CartItem, orderId:string):Promise<void> {
   await feApiCallPost(`/api/order/addItem/${orderId}`, {items});
}
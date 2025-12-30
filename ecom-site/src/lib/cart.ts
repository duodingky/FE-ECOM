export type StoredCart = Record<string, number>; // productId -> quantity

export const CART_STORAGE_KEY = "fe_ecom_cart_v1";

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

export function getCartCount(cart: StoredCart): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}


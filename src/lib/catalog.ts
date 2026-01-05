export type Category = {
  slug: string;
  name: string;
  description?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: "USD";
  categorySlug: string;
  imageUrl?: string;
  tags?: string[];
  inStock: boolean;
};

const categories: Category[] = [
  { slug: "electronics", name: "Electronics", description: "Gadgets & gear" },
  { slug: "home", name: "Home", description: "Make your space better" },
  { slug: "fashion", name: "Fashion", description: "Everyday essentials" },
];

const products: Product[] = [
  {
    id: "p_usb_c_charger_65w",
    slug: "usb-c-charger-65w",
    name: "USB‑C Charger 65W",
    description:
      "Compact GaN charger with dual ports for fast charging laptops and phones.",
    priceCents: 3999,
    currency: "USD",
    categorySlug: "electronics",
    tags: ["charger", "usb-c", "gan"],
    inStock: true,
  },
  {
    id: "p_wireless_mouse",
    slug: "wireless-mouse",
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with silent clicks and long battery life.",
    priceCents: 2499,
    currency: "USD",
    categorySlug: "electronics",
    tags: ["mouse", "wireless"],
    inStock: true,
  },
  {
    id: "p_coffee_mug",
    slug: "ceramic-coffee-mug",
    name: "Ceramic Coffee Mug",
    description:
      "A sturdy 12oz mug with a smooth glaze—great for coffee, tea, or cocoa.",
    priceCents: 1499,
    currency: "USD",
    categorySlug: "home",
    tags: ["mug", "kitchen"],
    inStock: true,
  },
  {
    id: "p_throw_blanket",
    slug: "soft-throw-blanket",
    name: "Soft Throw Blanket",
    description: "Cozy throw blanket with a soft feel for sofa or bed.",
    priceCents: 3299,
    currency: "USD",
    categorySlug: "home",
    tags: ["blanket", "cozy"],
    inStock: true,
  },
  {
    id: "p_basic_tee",
    slug: "basic-tee",
    name: "Basic Tee",
    description:
      "Everyday cotton tee with a clean fit. Easy to layer and easy to wear.",
    priceCents: 1999,
    currency: "USD",
    categorySlug: "fashion",
    tags: ["t-shirt", "cotton"],
    inStock: true,
  },
  {
    id: "p_cap",
    slug: "classic-cap",
    name: "Classic Cap",
    description: "A classic adjustable cap with breathable fabric.",
    priceCents: 1799,
    currency: "USD",
    categorySlug: "fashion",
    tags: ["cap", "hat"],
    inStock: false,
  },
];

export function getCategories(): Category[] {
  return categories.slice();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllProducts(): Product[] {
  return products.slice();
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategorySlug(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.description,
      p.categorySlug,
      ...(p.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function formatPriceUSD(priceCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceCents / 100);
}


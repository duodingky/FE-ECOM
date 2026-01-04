"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-zinc-200 text-zinc-900" : "text-zinc-700 hover:bg-zinc-100",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const { count } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialQ = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
  const [q, setQ] = useState(initialQ);

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="mr-2 text-base font-semibold tracking-tight">
          FE-ECOM
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/search">Search</NavLink>
          <NavLink href="/cart">Cart</NavLink>
        </nav>

        <form
          className="ml-auto flex w-full max-w-md items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const next = q.trim();
            router.push(next ? `/search/${encodeURIComponent(next)}` : "/search");
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none ring-zinc-300 focus:ring-2"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-md bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Search
          </button>
        </form>

        <Link
          href="/cart"
          className={[
            "ml-2 hidden rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 sm:inline-flex",
            pathname === "/cart" ? "bg-zinc-50" : "",
          ].join(" ")}
        >
          Cart
          <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white">
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}


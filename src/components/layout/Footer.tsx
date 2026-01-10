"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Image from 'next/image'

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {

  return (
    <Link
      href={href}
      className={[
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "text-zinc-700 hover:bg-zinc-100",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export function Footer() {

  return (
    <footer className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">


        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/search">Search</NavLink>
          <NavLink href="/categories">Categories</NavLink>
          <NavLink href="/categories">About Us</NavLink>
          <NavLink href="/categories"> Term / Condition</NavLink>
          <NavLink href="/categories">  Rerturn </NavLink>
          <NavLink href="/categories">  contact us </NavLink>
        </nav>

       
 
      </div>
    </footer>
  );
}


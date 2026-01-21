"use client";

import type { pBrand } from "@/lib/type/catalog";

type BrandsFilterProps = {
  brands: pBrand[];
};

export function BrandsFilter({ brands }: BrandsFilterProps) {
  if (!brands.length) {
    return <div className="text-sm text-zinc-600">No brands found.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {brands.map((brand) => {
        const inputId = `brand-${String(brand.id)}`;

        return (
          <label
            key={brand.id}
            htmlFor={inputId}
            className="flex items-center gap-2 text-sm text-zinc-800"
          >
            <input
              id={inputId}
              type="checkbox"
              name="brands"
              value={brand.id}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900"
            />
            <span>{brand.brandName}</span>
          </label>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { pBrand } from "@/lib/type/catalog";

type BrandFilterCheckBoxProps = {
  brands: pBrand[];
};

export function BrandFilterCheckBox({ brands }: BrandFilterCheckBoxProps) {
  const [selectedBrands, setSelectedBrands] = useState<Record<string, boolean>>(
    {},
  );

  const getBrandKey = (brand: pBrand) => String(brand.id ?? brand.brandName);

  const toggleBrand = (brand: pBrand) => {
    const key = getBrandKey(brand);
    setSelectedBrands((prev) => {
      if (prev[key]) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: true };
    });
  };

  if (brands.length === 0) {
    return <div>No brands found</div>;
  }

  return (
    <div className="space-y-2">
      {brands.map((brand) => {
        const key = getBrandKey(brand);
        return (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!selectedBrands[key]}
              onChange={() => toggleBrand(brand)}
            />
            <span className="text-sm">{brand.brandName}</span>
          </label>
        );
      })}
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import {  pProducts,   Category as CategoryNode}  from "@/lib/type/catalog";
import Image from 'next/image'

 

type CategoryTreeCheckBoxProps = {
    categoriesLoading: boolean;
    categoriesError: boolean;
    categoryTree: CategoryNode[]; 
 }


export  function CategoryTreeCheckBox({ 
     categoriesLoading, 
     categoriesError,
     categoryTree,
    }: CategoryTreeCheckBoxProps) {

  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});

  const getCategoryKey = (category: CategoryNode) =>
    String(category.id ?? category.categoryName);

  const getCategoryChildren = (category: CategoryNode) =>
    Array.isArray(category.children) ? category.children : [];

  const collectCategoryKeys = (category: CategoryNode): string[] => {
    const children = getCategoryChildren(category);
    return children.flatMap((child) => [
      getCategoryKey(child),
      ...collectCategoryKeys(child),
    ]);
  };

  const toggleCategory = (category: CategoryNode) => {
    const key = getCategoryKey(category);
    setSelectedCategories((prev) => {
      const isSelected = !!prev[key];
      if (!isSelected) {
        return { ...prev, [key]: true };
      }

      const next = { ...prev };
      delete next[key];
      collectCategoryKeys(category).forEach((childKey) => {
        delete next[childKey];
      });
      return next;
    });
  };

  const renderCategoryNode = (category: CategoryNode, depth = 0) => {
    const key = getCategoryKey(category);
    const isSelected = !!selectedCategories[key];
    const children = getCategoryChildren(category);

    return (
      <div key={key} className={depth > 0 ? "pl-4" : ""}>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleCategory(category)}
          />
          <span className="text-sm">{category.categoryName}</span>
        </label>
        {children.length > 0 && isSelected && (
          <div className="mt-2 space-y-2">
            {children.map((child) => renderCategoryNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

     
  return (

            <div className="mt-3 space-y-3">
              {categoriesLoading && <div>Loading categories...</div>}
              {categoriesError && <div>Error loading categories</div>}
              {!categoriesLoading && !categoriesError && categoryTree.length === 0 && (
                <div>No categories found</div>
              )}
              {!categoriesLoading && !categoriesError && categoryTree.length > 0 && (
                <div className="space-y-3">
                  {categoryTree.map((category) => renderCategoryNode(category))}
                </div>
              )}
            </div>
  );
}


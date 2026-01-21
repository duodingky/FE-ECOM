import { render, screen } from "@testing-library/react";
import CategoryPage from "@/app/category/[slug]/[id]/page";
import { getCategories } from "@/lib/API/categories";
import { getProductsByCategory } from "@/lib/API/products";
import { notFound } from "next/navigation";

jest.mock("@/components/products/ProductCard", () => ({
  ProductCard: () => <div data-testid="product-card" />,
}));

jest.mock("@/components/products/CategoriesList", () => ({
  CategoriesList: () => <div data-testid="categories-list" />,
}));

jest.mock("@/lib/API/categories", () => ({
  getCategories: jest.fn(),
}));

jest.mock("@/lib/API/products", () => ({
  getProductsByCategory: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Category detail page", () => {
  it("renders category heading and products", async () => {
    (getCategories as jest.Mock).mockResolvedValue([
      { categoryName: "Shoes" },
    ]);
    (getProductsByCategory as jest.Mock).mockResolvedValue([
      { id: "p1", productName: "Sneaker" },
      { id: "p2", productName: "Boot" },
    ]);

    const element = await CategoryPage({
      params: Promise.resolve({ slug: "shoes", id: "12" }),
    });
    render(element);

    expect(notFound).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /shop on shoes/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("categories-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });
});

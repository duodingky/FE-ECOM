import { render, screen } from "@testing-library/react";
import CategoriesPage from "@/app/category/page";
import { getCategories } from "@/lib/API/categories";
import { notFound } from "next/navigation";

jest.mock("@/components/products/CategoriesList", () => ({
  CategoriesList: () => <div data-testid="categories-list" />,
}));

jest.mock("@/lib/API/categories", () => ({
  getCategories: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Categories page", () => {
  it("renders categories list and heading", async () => {
    (getCategories as jest.Mock).mockResolvedValue([
      { categoryName: "Electronics" },
    ]);

    const element = await CategoriesPage();
    render(element);

    expect(notFound).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /shop on electronics/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("categories-list")).toBeInTheDocument();
  });
});

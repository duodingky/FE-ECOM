import { render, screen } from "@testing-library/react";
import SearchPage from "@/app/search/page";
import { useQuery } from "@tanstack/react-query";

jest.mock("@/components/products/ProductCard", () => ({
  ProductCard: () => <div data-testid="product-card" />,
}));

jest.mock("@/components/products/CategoryTreeCheckBox", () => ({
  CategoryTreeCheckBox: () => <div data-testid="category-tree" />,
}));

jest.mock("@/components/products/BrandFilterCheckBox", () => ({
  BrandFilterCheckBox: () => <div data-testid="brand-filter" />,
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "shoes",
  }),
}));

describe("Search page", () => {
  it("renders filters and search results layout", () => {
    (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
      const key = Array.isArray(queryKey) ? queryKey[0] : queryKey;

      if (key === "brands") {
        return { data: [{ id: "b1", brandName: "Brand A" }], isLoading: false, error: null };
      }

      if (key === "categories") {
        return { data: [{ id: "c1", categoryName: "Sneakers", children: [] }], isLoading: false, error: null };
      }

      if (typeof key === "string" && key.startsWith("searchProducts")) {
        return {
          data: [{ id: "p1", productName: "Running Shoe" }],
          isLoading: false,
          error: null,
          refetch: jest.fn(),
        };
      }

      return { data: [], isLoading: false, error: null, refetch: jest.fn() };
    });

    render(<SearchPage />);

    expect(
      screen.getByRole("heading", { name: /search page/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("brand-filter")).toBeInTheDocument();
    expect(screen.getByTestId("category-tree")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(1);
  });
});

import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { getFeaturedProducts } from "@/lib/API/products";
import { getHomeBanner } from "@/lib/API/homePageBanner";

jest.mock("@/components/products/ProductCard", () => ({
  ProductCard: () => <div data-testid="product-card" />,
}));

jest.mock("@/components/products/CategoriesList", () => ({
  CategoriesList: () => <div data-testid="categories-list" />,
}));

jest.mock("@/components/home/ImageCarousel", () => ({
  ImageCarousel: () => <div data-testid="image-carousel" />,
}));

jest.mock("@/lib/API/products", () => ({
  getFeaturedProducts: jest.fn(),
}));

jest.mock("@/lib/API/homePageBanner", () => ({
  getHomeBanner: jest.fn(),
}));

describe("Home page", () => {
  it("renders core home components", async () => {
    (getFeaturedProducts as jest.Mock).mockResolvedValue([
      { id: "p1", productName: "Product 1" },
    ]);
    (getHomeBanner as jest.Mock).mockResolvedValue([{ id: "b1" }]);

    const element = await Home();
    render(element);

    expect(screen.getByTestId("image-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("categories-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(1);
  });
});

import { render, screen } from "@testing-library/react";
import ProductPage from "@/app/product/[slug]/[id]/page";
import { getProducts } from "@/lib/API/products";
import { notFound } from "next/navigation";

jest.mock("@/components/products/AddToCartButton", () => ({
  AddToCartButton: () => <button data-testid="add-to-cart" />,
}));

jest.mock("@/lib/API/products", () => ({
  getProducts: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("Product detail page", () => {
  it("renders product information and add-to-cart action", async () => {
    (getProducts as jest.Mock).mockResolvedValue([
      {
        id: "p1",
        productName: "Trail Shoe",
        categoryName: "Footwear",
        price: "$50",
        shortDesc: "Lightweight and durable",
      },
    ]);

    const element = await ProductPage({
      params: Promise.resolve({ slug: "trail-shoe", id: "p1" }),
    });
    render(element);

    expect(notFound).not.toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /trail shoe/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/\$50/)).toBeInTheDocument();
    expect(screen.getByText(/lightweight and durable/i)).toBeInTheDocument();
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });
});

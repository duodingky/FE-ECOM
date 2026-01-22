import { fireEvent, render, screen } from "@testing-library/react";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { useCart } from "@/components/cart/CartProvider";
import { useToast } from "@/components/feedback/ToastProvider";

jest.mock("@/components/cart/CartProvider", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/components/feedback/ToastProvider", () => ({
  useToast: jest.fn(),
}));

const addMock = jest.fn();
const addToastMock = jest.fn();

describe("AddToCartButton", () => {
  beforeEach(() => {
    addMock.mockClear();
    addToastMock.mockClear();
    (useCart as jest.Mock).mockReturnValue({ add: addMock });
    (useToast as jest.Mock).mockReturnValue({ addToast: addToastMock });
  });

  it("renders the add-to-cart button", () => {
    render(
      <AddToCartButton productId="p1" productName="Trail Shoe" sku="SKU-1" />
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("adds to cart and shows a toast on click", () => {
    render(
      <AddToCartButton productId="p1" productName="Trail Shoe" sku="SKU-1" />
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(addMock).toHaveBeenCalledWith("p1", 1);
    expect(addToastMock).toHaveBeenCalledWith({
      title: "Added to cart",
      description: "Trail Shoe - SKU SKU-1",
    });
    expect(button).toBeDisabled();
  });
});

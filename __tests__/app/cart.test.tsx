import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";
import { useCart } from "@/components/cart/CartProvider";

jest.mock("@/components/cart/CartProvider", () => ({
  useCart: jest.fn(),
}));

describe("Cart page", () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cart: { p1: 2 },
      count: 2,
      add: jest.fn(),
      remove: jest.fn(),
      setQuantity: jest.fn(),
      clear: jest.fn(),
    });

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        { id: "p1", sku: "SKU-1", productName: "Sneaker", price: 250 },
      ],
    });
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders cart items with subtotal and actions", async () => {
    render(<CartPage />);

    expect(
      screen.getByRole("heading", { name: /shopping cart/i })
    ).toBeInTheDocument();
    expect(await screen.findByText("SKU-1")).toBeInTheDocument();
    expect(screen.getByText("Sneaker")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping (Metro Manila)")).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: /back to shopping/i });
    expect(backLink).toHaveAttribute("href", "/search");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/products",
      expect.objectContaining({
        method: "POST",
      })
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.ids).toEqual(["p1"]);
  });
});

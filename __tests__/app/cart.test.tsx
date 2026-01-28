import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";
import { useCart } from "@/components/cart/CartProvider";

jest.mock("@/components/cart/CartProvider", () => ({
  useCart: jest.fn(),
}));

describe("Cart page", () => {
  const fetchMock = jest.fn();

  const buildCart = (overrides: Partial<ReturnType<typeof useCart>> = {}) => ({
    count: 0,
    orderId: "",
    add: jest.fn(),
    setQuantity: jest.fn(),
    clear: jest.fn(),
    ...overrides,
  });

  const createDeferred = () => {
    let resolve: (value: unknown) => void = () => undefined;
    const promise = new Promise((res) => {
      resolve = res;
    });
    return { promise, resolve };
  };

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete (globalThis as typeof globalThis & { fetch?: typeof fetch }).fetch;
  });

  it("renders empty state when orderId is missing", () => {
    (useCart as jest.Mock).mockReturnValue(buildCart({ orderId: "" }));

    render(<CartPage />);

    expect(
      screen.getByRole("heading", { name: /shopping cart/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: /back to shopping/i });
    expect(backLink).toHaveAttribute("href", "/search");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches order items and renders totals", async () => {
    const orderId = "order-123";
    (useCart as jest.Mock).mockReturnValue(buildCart({ orderId, count: 2 }));
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        orderItems: [
          {
            id: 1,
            sku: "SKU-1",
            productName: "Sneaker",
            price: 250,
            quantity: 2,
          },
        ],
      }),
    });

    render(<CartPage />);

    expect(await screen.findByText("SKU-1")).toBeInTheDocument();
    expect(screen.getByText("Sneaker")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping (Metro Manila)")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("250.00")).toBeInTheDocument();
    expect(screen.getByText("500.00")).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: /back to shopping/i });
    expect(backLink).toHaveAttribute("href", "/search");

    expect(fetchMock).toHaveBeenCalledWith(
      `/api/order/${orderId}`,
      expect.objectContaining({
        method: "GET",
        headers: { "content-type": "application/json" },
      })
    );
  });

  it("shows a loading state while fetching items", async () => {
    const orderId = "order-456";
    (useCart as jest.Mock).mockReturnValue(buildCart({ orderId }));
    const deferred = createDeferred();
    fetchMock.mockReturnValue(deferred.promise);

    render(<CartPage />);

    expect(
      await screen.findByText(/loading cart items/i)
    ).toBeInTheDocument();

    deferred.resolve({
      ok: true,
      json: async () => ({ orderItems: [] }),
    });

    expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("shows an error state when the request fails", async () => {
    const orderId = "order-789";
    (useCart as jest.Mock).mockReturnValue(buildCart({ orderId }));
    fetchMock.mockResolvedValue({ ok: false, status: 500 });

    render(<CartPage />);

    expect(
      await screen.findByText(/unable to load cart items right now/i)
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledWith(
      `/api/order/${orderId}`,
      expect.objectContaining({ method: "GET" })
    );
  });
});

import { render, screen } from "@testing-library/react";
import CartPage from "@/app/cart/page";

describe("Cart page", () => {
  it("renders cart placeholder content", () => {
    render(<CartPage />);

    expect(screen.getByText(/cart\s+here/i)).toBeInTheDocument();
  });
});

// app/cart/page.tsx
import { Suspense } from "react";
 

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
       cart  here...
    </Suspense>
  );
}

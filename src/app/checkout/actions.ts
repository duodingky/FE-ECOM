"use server";

import type { CheckoutFormValues } from "@/lib/type/checkout";

export type CheckoutSubmissionResult = {
  ok: boolean;
  message: string;
  orderReference: string;
};

export async function submitCheckout(
  values: CheckoutFormValues,
): Promise<CheckoutSubmissionResult> {
  const orderReference = `MOCK-${Date.now()}`;

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    ok: true,
    message: `Order ${orderReference} submitted. We'll confirm COD delivery soon.`,
    orderReference,
  };
}

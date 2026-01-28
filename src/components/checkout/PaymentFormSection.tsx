"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { CheckoutFormValues } from "@/lib/type/checkout";

type PaymentFormSectionProps = {
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
};

export function PaymentFormSection({ control, errors }: PaymentFormSectionProps) {
  const paymentError = errors.payment_method?.message;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <FormControl component="fieldset" error={Boolean(paymentError)}>
        <FormLabel component="legend" className="text-sm font-semibold">
          Payment method
        </FormLabel>
        <Controller
          name="payment_method"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="COD"
                control={<Radio />}
                label="Cash on Delivery (COD)"
              />
            </RadioGroup>
          )}
        />
        {paymentError ? (
          <FormHelperText>{paymentError}</FormHelperText>
        ) : null}
      </FormControl>
    </section>
  );
}

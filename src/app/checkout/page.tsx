"use client";

import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Button } from "@mui/material";
import { AddressFormSection } from "@/components/checkout/AddressFormSection";
import { PaymentFormSection } from "@/components/checkout/PaymentFormSection";
import type { AddressFields, CheckoutFormValues } from "@/lib/type/checkout";
import { submitCheckout } from "./actions";

const addressSchema: yup.ObjectSchema<AddressFields> = yup
  .object({
    first_name: yup.string().trim().required("First name is required"),
    last_name: yup.string().trim().required("Last name is required"),
    address1: yup.string().trim().required("Address is required"),
    city: yup.string().trim().required("City is required"),
    zip_code: yup
      .string()
      .required("Zip code is required")
      .matches(/^\d{6}$/, "Zip code must be 6 digits"),
    province: yup.string().trim().required("Province is required"),
    country: yup.string().trim().required("Country is required"),
  })
  .required();

const checkoutSchema: yup.ObjectSchema<CheckoutFormValues> = yup
  .object({
    billing: addressSchema.required(),
    shipping: addressSchema.required(),
    payment_method: yup
      .string()
      .oneOf(["COD"], "Select a payment method")
      .required("Payment method is required"),
  })
  .required();

const defaultAddress: AddressFields = {
  first_name: "",
  last_name: "",
  address1: "",
  city: "",
  zip_code: "",
  province: "",
  country: "",
};

const defaultValues: CheckoutFormValues = {
  billing: { ...defaultAddress },
  shipping: { ...defaultAddress },
  payment_method: "COD",
};

export default function CheckoutPage() {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    defaultValues,
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    setSubmissionStatus("idle");
    setSubmissionMessage("");

    try {
      const result = await submitCheckout(values);
      if (result.ok) {
        setSubmissionStatus("success");
        setSubmissionMessage(result.message);
        reset(defaultValues);
        return;
      }
      setSubmissionStatus("error");
      setSubmissionMessage(result.message);
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage("Unable to submit checkout. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-zinc-600">
          Complete your billing, shipping, and payment details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AddressFormSection
          title="Billing address"
          prefix="billing"
          register={register}
          control={control}
          errors={errors}
        />

        <AddressFormSection
          title="Shipping address"
          prefix="shipping"
          register={register}
          control={control}
          errors={errors}
        />

        <PaymentFormSection control={control} errors={errors} />

        {submissionStatus !== "idle" ? (
          <Alert severity={submissionStatus}>
            {submissionMessage}
          </Alert>
        ) : null}

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Place order"}
          </Button>
        </div>
      </form>
    </div>
  );
}

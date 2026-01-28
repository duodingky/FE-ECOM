"use client";

import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import Link from "next/link";

type Address = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  zipCode: string;
  province: string;
  country: string;
};

type AddressErrors = Partial<Record<keyof Address, string>>;

const CITY_OPTIONS = [
  "Manila",
  "Quezon City",
  "Makati",
  "Pasig",
  "Cebu City",
  "Davao City",
];

const PROVINCE_OPTIONS = ["Metro Manila", "Cebu", "Davao del Sur"];

const COUNTRY_OPTIONS = ["Philippines", "Singapore", "Malaysia"];

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  address1: "",
  city: "",
  zipCode: "",
  province: "",
  country: "",
};

const baseFieldClass =
  "h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2";

function fieldClassName(hasError: boolean) {
  return [
    baseFieldClass,
    hasError ? "border-red-300 ring-red-200 focus:ring-red-200" : "",
  ].join(" ");
}

function validateAddress(address: Address): AddressErrors {
  const nextErrors: AddressErrors = {};

  if (!address.firstName.trim()) {
    nextErrors.firstName = "First name is required.";
  }
  if (!address.lastName.trim()) {
    nextErrors.lastName = "Last name is required.";
  }
  if (!address.address1.trim()) {
    nextErrors.address1 = "Address is required.";
  }
  if (!address.city.trim()) {
    nextErrors.city = "City is required.";
  }
  if (!address.zipCode.trim()) {
    nextErrors.zipCode = "Zip code is required.";
  }
  if (!address.province.trim()) {
    nextErrors.province = "Province is required.";
  }
  if (!address.country.trim()) {
    nextErrors.country = "Country is required.";
  }

  return nextErrors;
}

function hasAddressErrors(errors: AddressErrors) {
  return Object.values(errors).some(Boolean);
}

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  containerClassName?: string;
};

function InputField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  containerClassName,
}: InputFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={["space-y-1", containerClassName].filter(Boolean).join(" ")}>
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={fieldClassName(!!error)}
        aria-invalid={!!error}
        aria-describedby={errorId}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
  autoComplete?: string;
  containerClassName?: string;
};

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  autoComplete,
  containerClassName,
}: SelectFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={["space-y-1", containerClassName].filter(Boolean).join(" ")}>
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className={fieldClassName(!!error)}
        aria-invalid={!!error}
        aria-describedby={errorId}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

type AddressFieldsProps = {
  idPrefix: "shipping" | "billing";
  address: Address;
  errors: AddressErrors;
  onFieldChange: (field: keyof Address, value: string) => void;
};

function AddressFields({
  idPrefix,
  address,
  errors,
  onFieldChange,
}: AddressFieldsProps) {
  const autoCompletePrefix = idPrefix === "shipping" ? "shipping" : "billing";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InputField
        id={`${idPrefix}-first-name`}
        label="First name"
        value={address.firstName}
        onChange={(value) => onFieldChange("firstName", value)}
        error={errors.firstName}
        autoComplete={`${autoCompletePrefix} given-name`}
      />
      <InputField
        id={`${idPrefix}-last-name`}
        label="Last name"
        value={address.lastName}
        onChange={(value) => onFieldChange("lastName", value)}
        error={errors.lastName}
        autoComplete={`${autoCompletePrefix} family-name`}
      />
      <InputField
        id={`${idPrefix}-address1`}
        label="Address"
        value={address.address1}
        onChange={(value) => onFieldChange("address1", value)}
        error={errors.address1}
        autoComplete={`${autoCompletePrefix} address-line1`}
        containerClassName="sm:col-span-2"
      />
      <SelectField
        id={`${idPrefix}-city`}
        label="City"
        value={address.city}
        onChange={(value) => onFieldChange("city", value)}
        options={CITY_OPTIONS}
        placeholder="Select city"
        error={errors.city}
        autoComplete={`${autoCompletePrefix} address-level2`}
      />
      <InputField
        id={`${idPrefix}-zip-code`}
        label="Zip code"
        value={address.zipCode}
        onChange={(value) => onFieldChange("zipCode", value)}
        error={errors.zipCode}
        inputMode="numeric"
        autoComplete={`${autoCompletePrefix} postal-code`}
      />
      <SelectField
        id={`${idPrefix}-province`}
        label="Province"
        value={address.province}
        onChange={(value) => onFieldChange("province", value)}
        options={PROVINCE_OPTIONS}
        placeholder="Select province"
        error={errors.province}
        autoComplete={`${autoCompletePrefix} address-level1`}
      />
      <SelectField
        id={`${idPrefix}-country`}
        label="Country"
        value={address.country}
        onChange={(value) => onFieldChange("country", value)}
        options={COUNTRY_OPTIONS}
        placeholder="Select country"
        error={errors.country}
        autoComplete={`${autoCompletePrefix} country`}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const [shipping, setShipping] = useState<Address>(emptyAddress);
  const [billing, setBilling] = useState<Address>(emptyAddress);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<{
    shipping: AddressErrors;
    billing: AddressErrors;
    payment: string;
  }>({
    shipping: {},
    billing: {},
    payment: "",
  });

  const handleAddressChange = (
    section: "shipping" | "billing",
    field: keyof Address,
    value: string,
  ) => {
    setFormStatus("idle");
    if (section === "shipping") {
      setShipping((prev) => ({ ...prev, [field]: value }));
    } else {
      setBilling((prev) => ({ ...prev, [field]: value }));
    }

    setErrors((prev) => {
      if (!prev[section][field]) {
        return prev;
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: "",
        },
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const shippingErrors = validateAddress(shipping);
    const billingErrors = sameAsShipping ? {} : validateAddress(billing);
    const paymentError = paymentMethod ? "" : "Select a payment method.";

    const hasErrors =
      hasAddressErrors(shippingErrors) ||
      hasAddressErrors(billingErrors) ||
      Boolean(paymentError);

    setErrors({
      shipping: shippingErrors,
      billing: billingErrors,
      payment: paymentError,
    });
    setFormStatus(hasErrors ? "idle" : "success");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-zinc-600">
          Enter your shipping, billing, and payment details.
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        {formStatus === "success" && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            All set. Your details look good for the next step.
          </div>
        )}

        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Shipping address</h2>
            <p className="text-sm text-zinc-600">
              Where should we deliver your order?
            </p>
          </div>
          <div className="mt-5">
            <AddressFields
              idPrefix="shipping"
              address={shipping}
              errors={errors.shipping}
              onFieldChange={(field, value) =>
                handleAddressChange("shipping", field, value)
              }
            />
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Billing address</h2>
              <p className="text-sm text-zinc-600">
                Use your billing details for payment.
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setSameAsShipping(checked);
                  setFormStatus("idle");
                  if (checked) {
                    setErrors((prev) => ({ ...prev, billing: {} }));
                  }
                }}
              />
              Billing same as shipping
            </label>
          </div>

          <div className="mt-5">
            {sameAsShipping ? (
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
                Billing address will match the shipping address.
              </div>
            ) : (
              <AddressFields
                idPrefix="billing"
                address={billing}
                errors={errors.billing}
                onFieldChange={(field, value) =>
                  handleAddressChange("billing", field, value)
                }
              />
            )}
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-sm text-zinc-600">
              Choose how you want to pay.
            </p>
          </div>
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">Payment method</legend>
            <label className="flex items-center gap-2 rounded-md border border-zinc-200 p-3 text-sm">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => {
                  setPaymentMethod("cod");
                  setFormStatus("idle");
                  setErrors((prev) => ({ ...prev, payment: "" }));
                }}
              />
              Cash on delivery (COD)
            </label>
          </fieldset>
          {errors.payment && (
            <p className="mt-2 text-xs text-red-600">{errors.payment}</p>
          )}
        </section>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/cart"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Back to cart
          </Link>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

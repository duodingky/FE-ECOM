"use client";

import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import type { CheckoutFormValues } from "@/lib/type/checkout";

type AddressFormSectionProps = {
  title: string;
  prefix: "billing" | "shipping";
  register: UseFormRegister<CheckoutFormValues>;
  control: Control<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
};

const CITY_OPTIONS = ["Manila", "Makati", "Quezon City", "Taguig"];
const PROVINCE_OPTIONS = ["Metro Manila", "Cebu", "Davao del Sur"];
const COUNTRY_OPTIONS = ["Philippines"];

export function AddressFormSection({
  title,
  prefix,
  register,
  control,
  errors,
}: AddressFormSectionProps) {
  const sectionErrors = errors[prefix];

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          label="First name"
          fullWidth
          {...register(`${prefix}.first_name` as const)}
          error={Boolean(sectionErrors?.first_name)}
          helperText={sectionErrors?.first_name?.message}
        />
        <TextField
          label="Last name"
          fullWidth
          {...register(`${prefix}.last_name` as const)}
          error={Boolean(sectionErrors?.last_name)}
          helperText={sectionErrors?.last_name?.message}
        />
        <TextField
          className="sm:col-span-2"
          label="Address"
          fullWidth
          {...register(`${prefix}.address1` as const)}
          error={Boolean(sectionErrors?.address1)}
          helperText={sectionErrors?.address1?.message}
        />
        <Controller
          name={`${prefix}.city` as const}
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="City"
              fullWidth
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              {...field}
              value={field.value ?? ""}
              error={Boolean(sectionErrors?.city)}
              helperText={sectionErrors?.city?.message}
            >
              <MenuItem value="">Select city</MenuItem>
              {CITY_OPTIONS.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <TextField
          label="Zip code"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
          {...register(`${prefix}.zip_code` as const)}
          error={Boolean(sectionErrors?.zip_code)}
          helperText={sectionErrors?.zip_code?.message}
        />
        <Controller
          name={`${prefix}.province` as const}
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Province"
              fullWidth
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              {...field}
              value={field.value ?? ""}
              error={Boolean(sectionErrors?.province)}
              helperText={sectionErrors?.province?.message}
            >
              <MenuItem value="">Select province</MenuItem>
              {PROVINCE_OPTIONS.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name={`${prefix}.country` as const}
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Country"
              fullWidth
              SelectProps={{ displayEmpty: true }}
              InputLabelProps={{ shrink: true }}
              {...field}
              value={field.value ?? ""}
              error={Boolean(sectionErrors?.country)}
              helperText={sectionErrors?.country?.message}
            >
              <MenuItem value="">Select country</MenuItem>
              {COUNTRY_OPTIONS.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>
    </section>
  );
}

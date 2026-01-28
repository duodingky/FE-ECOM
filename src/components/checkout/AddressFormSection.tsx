"use client";

import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
          render={({ field }) => {
            const { ref, ...fieldProps } = field;
            return (
              <FormControl fullWidth error={Boolean(sectionErrors?.city)}>
                <InputLabel shrink id={`${prefix}-city-label`}>
                  City
                </InputLabel>
                <Select
                  {...fieldProps}
                  labelId={`${prefix}-city-label`}
                  label="City"
                  displayEmpty
                  value={field.value ?? ""}
                  inputRef={ref}
                  renderValue={(selected) =>
                    selected ? (
                      selected
                    ) : (
                      <span className="text-zinc-400">Select city</span>
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    Select city
                  </MenuItem>
                  {CITY_OPTIONS.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{sectionErrors?.city?.message}</FormHelperText>
              </FormControl>
            );
          }}
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
          render={({ field }) => {
            const { ref, ...fieldProps } = field;
            return (
              <FormControl fullWidth error={Boolean(sectionErrors?.province)}>
                <InputLabel shrink id={`${prefix}-province-label`}>
                  Province
                </InputLabel>
                <Select
                  {...fieldProps}
                  labelId={`${prefix}-province-label`}
                  label="Province"
                  displayEmpty
                  value={field.value ?? ""}
                  inputRef={ref}
                  renderValue={(selected) =>
                    selected ? (
                      selected
                    ) : (
                      <span className="text-zinc-400">Select province</span>
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    Select province
                  </MenuItem>
                  {PROVINCE_OPTIONS.map((province) => (
                    <MenuItem key={province} value={province}>
                      {province}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {sectionErrors?.province?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />
        <Controller
          name={`${prefix}.country` as const}
          control={control}
          render={({ field }) => {
            const { ref, ...fieldProps } = field;
            return (
              <FormControl fullWidth error={Boolean(sectionErrors?.country)}>
                <InputLabel shrink id={`${prefix}-country-label`}>
                  Country
                </InputLabel>
                <Select
                  {...fieldProps}
                  labelId={`${prefix}-country-label`}
                  label="Country"
                  displayEmpty
                  value={field.value ?? ""}
                  inputRef={ref}
                  renderValue={(selected) =>
                    selected ? (
                      selected
                    ) : (
                      <span className="text-zinc-400">Select country</span>
                    )
                  }
                >
                  <MenuItem value="" disabled>
                    Select country
                  </MenuItem>
                  {COUNTRY_OPTIONS.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {sectionErrors?.country?.message}
                </FormHelperText>
              </FormControl>
            );
          }}
        />
      </div>
    </section>
  );
}

export type AddressFields = {
  first_name: string;
  last_name: string;
  address1: string;
  city: string;
  zip_code: string;
  province: string;
  country: string;
};

export type PaymentMethod = "COD";

export type CheckoutFormValues = {
  billing: AddressFields;
  shipping: AddressFields;
  payment_method: PaymentMethod;
};

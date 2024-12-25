import { array, number, object, string } from "yup";

export const signUpSchema = object({
  first_name: string().required(),
  last_name: string().required(),
  email: string().required().email(),
  password: string()
    .required()
    .min(8)
    .max(20)
    .matches(
      /(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
      "password must include at least one number and one special character"
    ),
});

export const signInSchema = object({
  email: string().required().email(),
  password: string().required(),
});

export const confirmationCodeSchema = object({
  confirmation_code: number().required(),
});

export const dessertSchema = object({
  name: string().required(),
  description: string().required(),
  dessert_type: string().required("dessert type required"),
  prices: array().of(
    object({
      size: string()
        .required("size required")
        .min(1, "At least one size is required"),
      base: number()
        .required("price required")
        .min(1, "At least one price is required"),
    })
  ),
  ingredients: array()
    .of(string().required("Each ingredient must have a name"))
    .min(1, "At least one ingredient is required"),
});

import { object, array, string, number } from "yup";

export const signUpSchema = object({
  first_name: string().required(),
  last_name: string().required(),
  email: string().required().email(),
  password: string().required().min(8).max(20),
});

export const signInSchema = object({
  email: string().required().email(),
  password: string().required(),
});

export const confirmationCodeSchema = object({
  confirmation_code: number().required(),
});

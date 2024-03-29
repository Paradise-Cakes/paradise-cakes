import { object, array, string, number } from "yup";

export const signUpSchema = object({
	email: string().required(),
	password: string().required()
});

export const signInSchema = object({
	email: string().required(),
	password: string().required()
});

export const confirmationCodeSchema = object({
	code: number().required()
});
import axios from "axios";
const API_URL = "https://paradisecakes.cloud/v1";

export const getDessertById = async (dessert_id) => {
  const response = await axios.get(`${API_URL}/desserts/${dessert_id}`);
  return response;
};

export const getDesserts = async (dessert_type) => {
  const response = await axios.get(
    `${API_URL}/desserts?dessert_type=${dessert_type}`
  );
  return response;
};

export const postSignUp = async (payload) => {
  const response = await axios.post(`${API_URL}/signup`, payload);
  return response;
}

export const postConfirmSignUp = async (payload) => {
  const response = await axios.post(`${API_URL}/confirm_signup`, payload);
  return response;
}

export const postResendConfirmationCode = async (payload) => {
  const response = await axios.post(`${API_URL}/resend_confirmation_code`, payload);
  return response;
}

export const postSignIn = async (payload) => {
  const response = await axios.post(`${API_URL}/signin`, payload);
  return response;
}

export const postForgotPassword = async (payload) => {
  const response = await axios.post(`${API_URL}/forgot_password`, payload);
  return response;
}
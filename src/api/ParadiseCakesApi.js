import axios from "axios";

const deployEnv = import.meta.env.VITE_DEPLOY_ENV;
const API_URL =
  deployEnv === "prod"
    ? "https://api.megsparadisecakes.com/v1"
    : "https://dev-api.megsparadisecakes.com/v1";

export const getDessertById = async (dessert_id) => {
  const response = await axios.get(`${API_URL}/desserts/${dessert_id}`);
  return response;
};

export const getDesserts = async () => {
  const response = await axios.get(`${API_URL}/desserts`);
  return response;
};

export const getDisplayImages = async () => {
  const response = await axios.get(`${API_URL}/display-images`);
  return response;
};

export const postSignUp = async (payload) => {
  const response = await axios.post(`${API_URL}/signup`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

export const postConfirmSignUp = async (payload) => {
  const response = await axios.post(`${API_URL}/confirm_signup`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

export const postResendConfirmationCode = async (payload) => {
  const response = await axios.post(
    `${API_URL}/resend_confirmation_code`,
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response;
};

export const postSignIn = async (payload) => {
  const response = await axios.post(`${API_URL}/signin`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

export const postForgotPassword = async (payload) => {
  const response = await axios.post(`${API_URL}/forgot_password`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

export const postLogout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response;
};

export const postDessertImage = async (dessert_id, payload) => {
  const response = await axios.post(
    `${API_URL}/desserts/${dessert_id}/images`,
    payload
  );
  return response;
};

export const postDessert = async (payload) => {
  const response = await axios.post(`${API_URL}/desserts`, payload);
  return response;
};

export const patchDessert = async (dessert_id, payload) => {
  const response = await axios.patch(
    `${API_URL}/desserts/${dessert_id}`,
    payload
  );
  return response;
};

export const deleteDessert = async (dessert_id) => {
  const response = await axios.delete(`${API_URL}/desserts/${dessert_id}`);
  return response;
};

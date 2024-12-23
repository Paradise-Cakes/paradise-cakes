import axios from "axios";

const deployEnv = import.meta.env.VITE_DEPLOY_ENV;
const API_URL =
  deployEnv === "prod"
    ? "https://users-api.megsparadisecakes.com/v1"
    : "https://users-dev-api.megsparadisecakes.com/v1";

export const postConfirmForgotPassword = async (payload) => {
  const response = await axios.post(
    `${API_URL}/confirm_forgot_password`,
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
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

export const postSignUp = async (payload) => {
  const response = await axios.post(`${API_URL}/signup`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

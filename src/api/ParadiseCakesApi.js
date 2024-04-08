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
  const response = await axios.post(`${API_URL}/desserts/${dessert_id}/images`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
}

export const postDessert = async (payload) => {
  console.log(payload);
  const response = await axios.post(`${API_URL}/desserts`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
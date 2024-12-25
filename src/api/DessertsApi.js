import axios from "axios";

const deployEnv = import.meta.env.VITE_DEPLOY_ENV;
const API_URL =
  deployEnv === "prod"
    ? "https://desserts-api.megsparadisecakes.com/v1"
    : deployEnv === "dev"
      ? "https://desserts-dev-api.megsparadisecakes.com/v1"
      : "http://localhost:8000/v1";

export const deleteDessert = async (dessert_id) => {
  const response = await axios.delete(`${API_URL}/desserts/${dessert_id}`, {
    headers: {
      Bearer: localStorage.getItem("access_token"),
    },
  });
  return response;
};

export const getDessertById = async (dessert_id) => {
  const response = await axios.get(`${API_URL}/desserts/${dessert_id}`);
  return response;
};

export const getDessertsByDessertType = async (dessert_type) => {
  const response = await axios.get(
    `${API_URL}/desserts?dessert_type=${dessert_type}`
  );
  return response;
};

export const patchDessert = async (dessert_id, payload) => {
  const response = await axios.patch(
    `${API_URL}/desserts/${dessert_id}`,
    payload,
    {
      headers: {
        Bearer: localStorage.getItem("access_token"),
      },
    }
  );
  return response;
};

export const postDessert = async (payload) => {
  const response = await axios.post(`${API_URL}/desserts`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Bearer: localStorage.getItem("access_token"),
    },
  });
  return response;
};

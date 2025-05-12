import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const deployEnv = import.meta.env.VITE_DEPLOY_ENV;
const API_URL =
  deployEnv === "prod"
    ? "https://desserts-api.megsparadisecakes.com/v1"
    : "https://desserts-dev-api.megsparadisecakes.com/v1";

export const deleteDessert = async (dessert_id) => {
  const accessToken = await fetchAuthSession().then((session) =>
    session?.tokens?.accessToken?.toString()
  );
  const response = await axios.delete(`${API_URL}/desserts/${dessert_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const getDessertById = async (dessert_id) => {
  const response = await axios.get(`${API_URL}/desserts/${dessert_id}`);
  return response;
};

export const getDesserts = async (dessert_type) => {
  const response = await axios.get(`${API_URL}/desserts`);
  return response;
};

export const patchDessert = async (dessert_id, payload) => {
  const accessToken = await fetchAuthSession().then((session) =>
    session?.tokens?.accessToken?.toString()
  );
  const response = await axios.patch(
    `${API_URL}/desserts/${dessert_id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const postDessert = async (payload) => {
  const accessToken = await fetchAuthSession().then((session) =>
    session?.tokens?.accessToken?.toString()
  );
  const response = await axios.post(`${API_URL}/desserts`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

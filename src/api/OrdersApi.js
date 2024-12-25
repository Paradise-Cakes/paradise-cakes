import axios from "axios";

const deployEnv = import.meta.env.VITE_DEPLOY_ENV;
const API_URL =
  deployEnv === "prod"
    ? "https://orders-api.megsparadisecakes.com/v1"
    : deployEnv === "dev"
    ? "https://orders-dev-api.megsparadisecakes.com/v1"
    : "http://localhost:8001/v1";

export const getOrderById = async (order_id) => {
  const response = await axios.get(`${API_URL}/orders/${order_id}`);
  return response;
};

export const getOrdersForCustomer = async (customer_full_name) => {
  const response = await axios.get(
    `${API_URL}/orders?customer_full_name=${customer_full_name}`
  );
  return response;
};

export const patchOrder = async (order_id, payload) => {
  const response = await axios.patch(`${API_URL}/orders/${order_id}`, payload);
  return response;
};

export const postOrder = async (payload) => {
  const response = await axios.post(`${API_URL}/orders`, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

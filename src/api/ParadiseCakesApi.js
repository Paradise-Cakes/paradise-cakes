import axios from "axios";
const API_URL = "https://paradisecakes.cloud/v1";

export const getDessertById = async (dessert_id) => {
  const response = await axios.get(`${API_URL}/desserts/${dessert_id}`);
  return response;
};

export const getDesserts = async (dessert_type = null) => {
  const response = await axios.get(`${API_URL}/desserts`);
  return response;
};

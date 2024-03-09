import axios from "axios";
const API_URL = "https://paradisecakes.cloud/v1";

export const getDessertById = async (uid) => {
  const response = await axios.get(`${API_URL}/desserts/${uid}`);
  return response;
}

export const getDesserts = async (dessert_type = null) => {
  let response;
  if (dessert_type) {
    response = await axios.get(`${API_URL}/desserts?dessert_type=${dessert_type}`);
    return response;
  } else {
    response = await axios.get(`${API_URL}/desserts`);
    return response;
  }
}
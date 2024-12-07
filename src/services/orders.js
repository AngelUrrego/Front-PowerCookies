import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/api";;

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};

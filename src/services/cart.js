import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getCart = async (userId) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return response.data;
};

export const addToCart = async (data) => {
  const response = await axios.post(`${API_URL}/cart/add`, data);
  return response.data;
};

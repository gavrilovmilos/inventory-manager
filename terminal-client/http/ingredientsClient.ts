import axios from "axios";

const SERVER_URL = 'http://localhost:5405/ingredients';

export const createNewIngredient = async (name: string, unit: string, cost: number, stock: number) => {
  const response = await axios.post(SERVER_URL, {name, unit, cost, stock});
  return response.data;
}

export const getIngredientFromServer = async (id: number) => {
  const response = await axios.get(`${SERVER_URL}/${id}`);
  return response.data;
}

export const updateIngredientStock = async (id: number, newStock: number) => {
  const response = await axios.patch(`${SERVER_URL}/${id}`, {stock: newStock});
  return response.data;
}
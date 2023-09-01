import axios from "axios";

const SERVER_URL = 'http://localhost:5405/orders';

export const createNewOrder = async (recipeId: number, quantity: number) => {
  const response = await axios.post(SERVER_URL, {recipeId, quantity});
  return response.data;
}

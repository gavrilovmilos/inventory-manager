import axios from "axios";

const SERVER_URL = 'http://localhost:5405/ingredients';

export const createNewIngredient = async (name: string, unit: string, cost: number) => {
  const response =  await axios.post(SERVER_URL, { name, unit, cost });
  return response.data;
}
import axios from "axios";

const SERVER_URL = 'http://localhost:5405/recipes';

export const getAllRecipes = async () => {
  const response = await axios.get(SERVER_URL);
  return response.data;
}

import { getLogger } from '../logger';
import { knexInstance as knex } from './knexDb';

const logger = getLogger('recipeRepository');



export const getRecipes = async () => {
  return knex('recipes').select();
};


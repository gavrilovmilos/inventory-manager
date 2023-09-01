import { getLogger } from '../logger';
import { knexInstance as knex } from './knexDb';

const logger = getLogger('recipeRepository');

export const getRecipes = async () => {
  return knex('recipes').select();
};

export const getRecipeIngredients = async (recipeId) => {
  return knex('recipe_ingredients')
    .select('ingredient_id as ingredientId', 'recipe_ingredients.quantity as quantity', 'ingredients.stock as currentStock')
    .where({ recipe_id: recipeId })
    .leftJoin('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
    ;
};

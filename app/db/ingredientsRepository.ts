import { getLogger } from '../logger';
import { knexInstance as knex } from './knexDb';

const logger = getLogger('ingredientsRepository');

/**
 * Returns
 * @param kitId
 */
export const getIngredientById = async (id: number) => {
  return knex('ingredients').select().where({ id }).first();
};

export const getIngredients = async () => {
  return knex('ingredients').select();
};

export const updateIngredient = async (id, ingredient: object) => {
  // @ts-ignore
  ingredient.updated_at = new Date();
  return (
    knex('ingredients')
      .update(ingredient)
      // @ts-ignore
      .where({ id: id })
  );
};

export const createNewIngredient = async (ingredient: object) => {
  // @ts-ignore
  ingredient.created_at = new Date();

  // @ts-ignore
  ingredient.updated_at = new Date();
  return knex('ingredients').insert(ingredient);
};

export const deleteIngredient = async (id: number) => {
  return knex('ingredients').where('id', id).del();

};


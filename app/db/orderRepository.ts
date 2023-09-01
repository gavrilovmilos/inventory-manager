import { getLogger } from '../logger';
import { knexInstance as knex } from './knexDb';

const logger = getLogger('recipeRepository');

export const getRecipes = async () => {
  return knex('recipes').select();
};

export const createNewOrder = async (order: object) => {
  // @ts-ignore
  order.created_at = new Date();

  // @ts-ignore
  order.updated_at = new Date();
  return knex('orders').insert(order);
};

export const getOrderById = async (id: number) => {
  return knex('orders').select().where({ id }).first();
};


import {Request, Response} from 'express';

import {getLogger} from '../logger';
import {NOT_ENOUGH_STOCK, NOT_FOUND} from "../helper/errorReport";
import {getRecipeIngredients} from "../db/recipeRepository";
import {createNewOrder, getOrderById} from "../db/orderRepository";
import {getIngredientById, updateIngredient} from "../db/ingredientsRepository";

const logger = getLogger('ingredientService');



export const createOrder = async (req: Request, res: Response) => {
  const orderItem = req.body;
  const numberOfPortions = req.body.quantity;

  const recipeIngredients = await getRecipeIngredients(orderItem.recipeId);
  if (recipeIngredients.length === 0) {
    throw NOT_FOUND;
  }
  const ingredientStockUpdates = [];
  for (let ingredientInfo of recipeIngredients) {
    let desiredQuantity = ingredientInfo.quantity * numberOfPortions;
    if (desiredQuantity > ingredientInfo.currentStock) {
      throw NOT_ENOUGH_STOCK;
    }
    ingredientStockUpdates.push({id: ingredientInfo.ingredientId, stock: ingredientInfo.currentStock - desiredQuantity})
  }
  for (let updateOp of ingredientStockUpdates) {
    await updateIngredient(updateOp.id, { stock: updateOp.stock} );
  }

  const orderCreated = await createNewOrder({recipe_id: orderItem.recipeId, quantity: numberOfPortions});

  return res.status(200).send(await getOrderById(orderCreated[0]));
};

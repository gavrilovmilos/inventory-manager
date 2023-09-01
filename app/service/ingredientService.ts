import {Request, Response} from 'express';
import {
  createNewIngredient,
  deleteIngredient,
  getIngredientById,
  getIngredients,
  updateIngredient
} from "../db/ingredientsRepository";

import {getLogger} from '../logger';
import {INTERNAL_SERVER_ERROR, NOT_FOUND} from "../helper/errorReport";

const logger = getLogger('ingredientService');

export const getAll = async (req: Request, res: Response) => {
  res.status(200).send(await getIngredients());
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const ingredient = await getIngredientById(parseInt(id));
  if (!ingredient) {
    throw NOT_FOUND;
  }
  return res.status(200).send(ingredient);
};

export const create = async (req: Request, res: Response) => {
  const newIngrID = await createNewIngredient(req.body);
  return res.status(200).send(await getIngredientById(newIngrID[0]));
};

export const update = async (req: Request, res: Response) => {
  const updateObject = req.body;
  const id = parseInt(req.params.id);
  const updateResponse = await updateIngredient(id, updateObject);
  if (updateResponse == 0) {
    throw NOT_FOUND;
  }

  return res.status(200).send(await getIngredientById(id));
};

export const updateStock = async (req: Request, res: Response) => {
  const updateObject = req.body;
  const id = parseInt(req.params.id);
  const newStock = parseFloat(req.body.stock);
  const updateResponse = await updateIngredient(id, {stock: newStock});
  if (updateResponse == 0) {
    throw NOT_FOUND;
  }

  return res.status(200).send(await getIngredientById(id));
};

export const deleteIng = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updateResponse = await deleteIngredient(id);

  return res.status(200).send();
};

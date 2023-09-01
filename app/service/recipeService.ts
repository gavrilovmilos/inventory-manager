import {Request, Response} from 'express';

import {getLogger} from '../logger';
import {getRecipes} from "../db/recipeRepository";

const logger = getLogger('recipeService');

export const getAllRecipes = async (req: Request, res: Response) => {
  res.status(200).send(await getRecipes());
};

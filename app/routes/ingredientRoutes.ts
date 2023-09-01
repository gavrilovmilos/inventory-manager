import {bodySchemaValidationMiddleware} from "../middleware/schemaValidator";
import {create, deleteIng, getAll, getById, update, updateStock} from "../service/ingredientService";
import Joi from "joi";

const express = require('express');
const router = express.Router();

const ingredientCreateSchema = Joi.object({
  name: Joi.string().required(),
  unit: Joi.string().required(),
  cost: Joi.number().positive().required(),
  stock: Joi.number().positive().required(),
});

const ingredientStockPatchSchema = Joi.object({
  stock: Joi.number().positive().required(),
});

router.get('/', getAll);

router.get('/:id', getById);


router.post('/', bodySchemaValidationMiddleware(ingredientCreateSchema), create);

router.put('/:id', bodySchemaValidationMiddleware(ingredientCreateSchema), update);

router.patch('/:id', bodySchemaValidationMiddleware(ingredientStockPatchSchema), updateStock);

router.delete('/:id', deleteIng);

export const ingredientRoutes = router;

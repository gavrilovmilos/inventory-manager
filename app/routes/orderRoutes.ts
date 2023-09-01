import {bodySchemaValidationMiddleware} from "../middleware/schemaValidator";
import Joi from "joi";
import {createOrder} from "../service/orderService";

const express = require('express');
const router = express.Router();

const createOrderSchema = Joi.object({
  recipeId: Joi.number().required(),
  quantity: Joi.number().positive().required(),
});

router.post('/', bodySchemaValidationMiddleware(createOrderSchema), createOrder);

export const orderRoutes = router;

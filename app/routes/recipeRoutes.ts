import {getAllRecipes} from "../service/recipeService";

const express = require('express');
const router = express.Router();

router.get('/', getAllRecipes);

export const recipeRoutes = router;

import { input, select, rawlist, Separator } from '@inquirer/prompts';
import {createNewIngredient, updateIngredientStock, getIngredientFromServer} from "./http/ingredientsClient";
import {getAllRecipes} from "./http/recipesClient";
import {createNewOrder} from "./http/ordersClient";

const getIngredient = async () => {
  const id = await input({ message: 'Ingredient identifier:' });
  try {
    const addedIngr = await getIngredientFromServer(parseInt(id));
    console.log(`>>> Full ingredient report: id[${addedIngr.id}] | name[${addedIngr.name}] | unit[${addedIngr.unit}] | cost[${addedIngr.cost}] | stock[${addedIngr.stock}] <<<\n`);
  } catch (e) {
    if (e.response && e.response.status === 404) {
      console.log(`Ingredient with identifier[${id}] does not exist.`);
    } else {
      console.log('An error occurred, server is unresponsive. Please contact your admin.');
    }
  }
  return inventoryModuleHandler();
}

const addIngredients = async () => {
  const name = await input({ message: 'Ingredient name:' });
  const unit = await rawlist({
    message: 'Ingredient unit:',
    choices: [
      { name: 'kg', value: 'kg' },
      { name: 'l', value: 'l' },
      { name: 'quantity', value: 'quantity' },
    ],
  });
  const cost = await input({ message: 'Ingredient cost (Eur):' });
  const stock = await input({ message: 'Ingredient stock:' });
  try {
    const addedIngr = await createNewIngredient(name, unit, parseInt(cost), parseFloat(stock));
    console.log(`>>> New ingredient added: id[${addedIngr.id}] | name[${addedIngr.name}] | unit[${addedIngr.unit}] | cost[${addedIngr.cost}] | stock[${addedIngr.stock}] <<< \n`);
  } catch (e) {
    console.log('An error occurred, server is unresponsive. Please contact your admin.\n');
  }
  return inventoryModuleHandler();
}

const updateStock = async () => {
  const id = await input({ message: 'Please input/scan ingredient id:' });
  const stock = await input({ message: 'Please add new stock:' });

  try {
    const updatedIngr = await updateIngredientStock(parseInt(id), parseFloat(stock));
    console.log(`>>> Stock for ingredient: id[${updatedIngr.id}] / name[${updatedIngr.name}] is updated to [${updatedIngr.stock}] <<< \n`);
  } catch (e) {
    if (e.response && e.response.status === 404) {
      console.log(`Ingredient with identifier[${id}] does not exist.\n`);
      return start();
    }
    console.log('An error occurred, server is unresponsive. Please contact your admin.\n');
  }
  return inventoryModuleHandler();
}

const inventoryModuleHandler = async () => {
  const inventoryAnswer = await select({
    message: 'Select an action',
    choices: [
      {
        name: 'Ingredient report',
        value: 1,
        description: 'Get full ingredient report.',
      },
      {
        name: 'Add ingredients',
        value: 2,
        description: 'Add ingredients.',
      },
      {
        name: 'Update stock',
        value: 3,
        description: 'Update stock for ingredients',
      },
      new Separator(),
      {
        name: 'Back',
        value: 4,
        description: 'Go back',
      },
    ],
  });
  switch (inventoryAnswer) {
    case 1:
      return getIngredient();
    case 2:
      return addIngredients();
    case 3:
      return updateStock();
    case 4:
      return start();
    default:
      break;
  }
}

const showRecipes = async () => {
  const recipes = await getAllRecipes();
  for (let recipe of recipes) {
    console.log(`${recipe.id} - ${recipe.name}`);
  }
  return pocModuleHandler();
}

const createOrderActionHandler = async () => {
  const recipeId = await input({ message: 'Please enter recipe identifier:' });
  const quantity = await input({ message: 'Please enter number of servings:' });
  try {
    const response = await createNewOrder(parseInt(recipeId), parseInt(quantity));
    console.log('>>> Order received. Bon appetit. <<< \n');
  } catch (e) {
    if (e.response && e.response.status === 409) {
      console.log(`Not enough stock! Please refill the stock or chose different recipe. \n`);
    } else {
      console.log(`An error occurred, please contact your admin. \n`);
    }
  }
  return pocModuleHandler();

}

const pocModuleHandler = async () => {
  const pocModuleAnswer = await select({
    message: 'Select an action:',
    choices: [
      {
        name: 'Get all recipes',
        value: 1,
        description: 'Get all recipes list.',
      },
      {
        name: 'Submit an order',
        value: 2,
        description: 'Submit an order',
      },
      new Separator(),
      {
        name: 'Back',
        value: 3,
        description: 'Go back',
      },
    ],
  });
  switch (pocModuleAnswer) {
    case 1:
      return showRecipes();
    case 2:
      return createOrderActionHandler();
    case 3:
      return start();
    default:
      break;
  }
}

const start = async () => {
  const answer = await select({
    message: 'Please select module',
    choices: [
      {
        name: 'Inventory management',
        value: 1,
        description: 'Inventory management operations',
      },
      new Separator(),
      {
        name: 'PoS',
        value: 2,
        description: 'Point of sale operations',
      },
      new Separator(),
    ],
  });
  if (answer === 1) {
    return inventoryModuleHandler();
  } else {
    return pocModuleHandler();
  }

}

start()
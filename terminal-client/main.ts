import { input, select } from '@inquirer/prompts';
import {createNewIngredient} from "./http/ingredientsClient";

const start = async () => {
  const answer = await select({
    message: 'Select a action',
    choices: [
      {
        name: 'Update inventory',
        value: 1,
        description: 'npm is the most popular package manager',
      },
      {
        name: 'PoS',
        value: 2,
        description: 'Point of sale operations',
        disabled: true,
      },
    ],
  });
  if (answer === 1) {
    return handleInventoryActions();
  } else {
    console.log('PoS unavalible')
  }

}
const handleInventoryActions = async () => {
  const inventoryAnswer = await select({
    message: 'Select a action',
    choices: [
      {
        name: 'Add ingredients',
        value: 1,
        description: 'Add ingredients desc',
      },
      {
        name: 'Back',
        value: 2,
        description: 'Go back',
      },
    ],
  });
  if (inventoryAnswer === 1) {
    return addIngredients();
  } else {
    return start();
  }
}

const addIngredients = async () => {
  const name = await input({ message: 'Ingredient name:' });
  const unit = await input({ message: 'Ingredient unit:' });
  const cost = await input({ message: 'Ingredient cost:' });
  const addedIngr = await createNewIngredient(name, unit, parseInt(cost));
  console.log(`New ingredient added: id[${addedIngr.id}] / name[${addedIngr.name}] / unit[${addedIngr.unit}] / cost[${addedIngr.cost}]`);
}

start()
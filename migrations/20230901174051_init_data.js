/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {

    await knex('recipes').insert([
        {
            id: 1,
            name: "Spaghetti Bolognese"
        },
        {
            id: 2,
            name: "Banana Shake"
        }
    ]);
    await knex('ingredients').insert([
        {
            id: 1,
            name: "Spaghetti",
            unit: "kg",
            cost: "5",
            stock: 10
        },
        {
            id: 2,
            name: "Pork",
            unit: "kg",
            cost: 10,
            stock: 14
        },
        {
            id: 3,
            name: "Tomato sauce",
            unit: "kg",
            cost: 7,
            stock: 14
        },
        {
            id: 4,
            name: "Banana",
            unit: "kg",
            cost: 2,
            stock: 7
        },
        {
            id: 5,
            name: "Milk",
            unit: "l",
            cost: 1.5,
            stock: 7
        }
    ]);
    await knex('recipe_ingredients').insert([
        {
            recipe_id: 1,
            ingredient_id: 1,
            quantity: 0.3
        },
        {
            recipe_id: 1,
            ingredient_id: 2,
            quantity: 0.4
        },
        {
            recipe_id: 1,
            ingredient_id: 3,
            quantity: 0.4
        },
        {
            recipe_id: 2,
            ingredient_id: 4,
            quantity: 0.5
        },
        {
            recipe_id: 2,
            ingredient_id: 5,
            quantity: 0.3
        },
    ]);

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex('ingredients').del();
    await knex('recipes').del();
    await knex('recipe_ingredients').del();
    await knex('orders').del();
};

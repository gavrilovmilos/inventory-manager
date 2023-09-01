/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    const ingredientsExists = await knex.schema.hasTable('ingredients');
    if (!ingredientsExists) {
        await knex.schema.createTable('ingredients', function (table) {
            table.increments('id', 8).primary();
            table.string('name', 64);
            table.string('unit', 16);
            table.double('cost', 64);
            table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    const recipesExists = await knex.schema.hasTable('recipes');
    if (!recipesExists) {
        await knex.schema.createTable('recipes', function (table) {
            table.increments('id', 8).primary();
            table.string('name', 40).defaultTo(null);
            table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    const recipeIngredientsExists = await knex.schema.hasTable('recipe_ingredients');
    if (!recipeIngredientsExists) {
        await knex.schema.createTable('recipe_ingredients', function (table) {
            table.integer('recipe_id', 8);
            table.integer('ingredient_id', 8);
            table.double('quantity', 40).defaultTo(null);
            table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.primary(['recipe_id', 'ingredient_id']);
        });
    }

    const ordersExists = await knex.schema.hasTable('orders');
    if (!ordersExists) {
        await knex.schema.createTable('orders', function (table) {
            table.string('id', 8).primary();
            table.integer('quantity', 8);
            table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
            table.timestamp('updated_at').nullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {

    await knex.schema.dropTable('ingredients');
    await knex.schema.dropTable('recipes');
    await knex.schema.dropTable('recipe_ingredients');
    await knex.schema.dropTable('orders');
};

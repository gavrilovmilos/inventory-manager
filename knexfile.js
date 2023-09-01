/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'inventory_manager',
      timezone: 'Z',
      user: 'root',
      password: 'root',
      host: '127.0.0.1'
    }
  },


};

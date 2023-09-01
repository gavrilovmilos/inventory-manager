import { knex } from 'knex';
import { getConfig } from '../configManager';

const dbConfig = getConfig().DB;

export const knexInstance = knex({
  client: 'mysql',
  connection: {
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASS,
    database: dbConfig.NAME,
  },
  pool: { min: 1, max: 7 },
});

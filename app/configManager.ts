import config from 'config';
import * as console from "console";

const DB_CONFIG: any = config.get('db');
const LOGGER_CONFIG: any = config.get('logger');

const DB = {
  HOST: process.env.DB_HOST ? process.env.DB_HOST : DB_CONFIG.host,
  NAME: process.env.DB_NAME ? process.env.DB_NAME : DB_CONFIG.name,
  USER: process.env.DB_USER ? process.env.DB_USER : DB_CONFIG.user,
  PASS: process.env.DB_PASS ? process.env.DB_PASS : DB_CONFIG.pass,
};
console.log(`Using db config: ${JSON.stringify(DB)}`);

export const getConfig = () => {
  return {
    PORT: process.env.PORT ? process.env.PORT : 5405,
    DB,
    loggerConfig: LOGGER_CONFIG
  };
};

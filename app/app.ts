/* eslint-disable no-process-exit */
import http from 'http';
import express from 'express';
require('express-async-errors');
import { healthRoutes } from './routes/healthRoutes';
import { globalErrorHandlingMiddleware } from './middleware/globalErrorHandling';
import { getConfig } from './configManager';
import { getLogger } from './logger';
import {ingredientRoutes} from "./routes/ingredientRoutes";

const PORT_NUMBER = getConfig().PORT;

const logger = getLogger('app');

// Create a new express application instance
export const app: express.Application = express();
app.use(express.json({ limit: '1mb', type: 'application/json' }));

app.use(logger.getExpressLogger());

// ########################################## Setup HTTP endpoints ##########################################

app.use('/health', healthRoutes);
app.use('/ingredients', ingredientRoutes);

// ########################################## Setup middlewares ##########################################

app.use(globalErrorHandlingMiddleware);

// ########################################## Run HTTP server ##########################################
export const httpApp = http.createServer(app);

const startHttpServer = () =>
  new Promise((resolve, reject) => {
    try {
      httpApp.listen(PORT_NUMBER, () => {
        logger.info(`Nory Inventory Server is listening for HTTP traffic on port [${PORT_NUMBER}]!`);
        resolve(true);
      });
    } catch (error) {
      reject(`Could not start Nory Inventory Server: ${JSON.stringify(error, null, 4)}`);
    }
  });

startHttpServer();


process.on('uncaughtException', (error) => {
  if (error['code'] === 'EADDRINUSE') {
    console.error(`Can't start server, PORT ${PORT_NUMBER} is already in use`);
    process.exit(1);
  }
  if (error['code'] === 'ETIMEDOUT') {
    console.error('A socket connection timed out. Probably a database connection.');
    process.exit(2);
  }
  console.error('Uncaught exception', error.message);
});


export const server = httpApp;

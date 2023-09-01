/* eslint-disable @typescript-eslint/no-unused-vars */
import { createLogger, transports, format } from 'winston';
const { combine, timestamp, label, prettyPrint, printf, json } = format;
import { getConfig } from './configManager';

import * as expressWinston from 'express-winston';

const loggerConfig = getConfig().loggerConfig;

const localTransports = [];

const logFileFormat = {
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
};

const logFormat = printf(({ level, message, label, timestamp, t, x }) => {
  return `${timestamp} ${level} [${label}]: ${message}`;
});

const consoleLogConfig = {
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
};

const expressFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
});
localTransports.push(new transports.Console(consoleLogConfig));

const logger = createLogger({
  transports: localTransports,
});

export function getLogger(loggerName: string) {
  return {
    debug: (message) => {
      logger.log({ label: loggerName, level: 'debug', message: message });
    },

    info: (message) => {
      logger.log({ label: loggerName, level: 'info', message: message });
    },

    warn: (message) => {
      logger.log({ label: loggerName, level: 'warn', message: message });
    },

    error: (message, error?) => {
      logger.log({ label: loggerName, level: 'error', message: message, error });
    },

    getExpressLogger: () => {
      const expressTransports = [];
      // @ts-ignore
      if (loggerConfig.express && loggerConfig.express.streams) {
        // @ts-ignore
        if (loggerConfig.express.streams.console) {
          // @ts-ignore
          expressTransports.push(new transports.Console(loggerConfig.express.streams.console));
        }
      }

      return expressWinston.logger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
        msg: '[HTTP] {{req.method}} {{req.url}} status[{{res.statusCode}}] {{res.responseTime}}ms',
        transports: expressTransports,
        responseWhitelist: ['body'],
        dynamicMeta(req, res) {
          if (res.statusCode < 400) {
            return {
              res: {
                statusCode: res.statusCode,
              },
            };
          }

          return {
            res: {
              statusCode: res.statusCode,
              body: req.body,
            },
          };
        },
      });
    },
  };
}

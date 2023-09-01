import { INTERNAL_SERVER_ERROR, isErrorReport } from '../helper/errorReport';
import { getLogger } from '../logger';
import { Request, Response, NextFunction } from 'express';

const logger = getLogger('globalErrorHandlingMiddleware');

export const globalErrorHandlingMiddleware = function errorHandler(err, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  if (!isErrorReport(err)) {
    logger.error(err.message);
    logger.error(err.stack);
    err = INTERNAL_SERVER_ERROR;
  }
  return res.status(err.httpStatus).send(err.body);
};

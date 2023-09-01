import Joi from '@hapi/joi';
import { BAD_REQUEST, ErrorReport } from '../helper/errorReport';
import { Request, Response, NextFunction } from 'express';

const joiSchemaValidationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: false, // allow unknown keys that will be ignored
  stripUnknown: false, // remove unknown keys from the validated data
  convert: false,
};

const checkSchema = (data: any, schema: Joi.Schema, options: any = joiSchemaValidationOptions): any => {
  const result = schema.validate(data, options);
  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      return {
        error: value.message.replace(/['"]/g, ''),
        path: value.path,
        type: value.type,
      };
    });
    return errorDetails;
  }
  return null;
};

export const bodySchemaValidationMiddleware = (schema: Joi.Schema, errorReport: ErrorReport = BAD_REQUEST) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = checkSchema(req.body, schema);
    if (result) {
      throw errorReport.withDetails(result);
    }
    return next();
  };
};

export const queryParamValidationMiddleware = (mandatoryParams: string[], errorReport: ErrorReport = BAD_REQUEST) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingParams = [];
    mandatoryParams.forEach((param) => {
      if (!req.query[param] || req.query[param] === '') {
        missingParams.push({ field: param });
      }
    });
    if (missingParams.length > 0) {
      throw errorReport.withDetails(missingParams);
    }
    return next();
  };
};

export const paramsSchemaValidationMiddleware = (schema: Joi.Schema, errorReport: ErrorReport = BAD_REQUEST) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = checkSchema(req.params, schema);
    if (result) {
      throw errorReport.withDetails(result);
    }
    return next();
  };
};

export const querySchemaValidationMiddleware = (schema: Joi.Schema, errorReport: ErrorReport = BAD_REQUEST) => {
  const queryValidationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
    convert: true, // express makes all numbers and booleans as strings, we need to convert them
  };

  return (req: Request, res: Response, next: NextFunction) => {
    const result = checkSchema(req.query, schema, queryValidationOptions);
    if (result) {
      throw errorReport.withDetails(result);
    }
    return next();
  };
};

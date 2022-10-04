import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { SchemaOf, ValidationError } from "yup";


type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<T>;

type TAllSchemas = Record<TProperty, SchemaOf<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (request, response, next) => {
  const schemas = getAllSchemas((schema) => schema);

  const errorResults: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(request[key as TProperty], {  abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (error.path === undefined) return;

        errors[error.path] = error.message;
      });

      errorResults[key] = errors;

    }
  });

  if (Object.entries(errorResults).length === 0) {
    return next();
  } else {
    return response.status(StatusCodes.BAD_REQUEST).json({ errors: errorResults });
  }
};
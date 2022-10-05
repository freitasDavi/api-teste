import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middlewares";

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    id: yup.number().integer().notRequired().default(0),
    filter: yup.string().notRequired()
  }))
}));

export const getAll = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {
  const result = await CidadesProvider.getAll(
    request.query.page || 1, 
    request.query.limit || 7,
    request.query.filter || "",
    Number(request.query.id));
  const count = await CidadesProvider.count(request.query.filter);

  if (result instanceof Error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  } else if (count instanceof Error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message
      }
    });
  }

  response.setHeader("access-control-expose-headers", "x-total-count");
  response.setHeader("x-total-count", count);

  return response.status(StatusCodes.OK).json(result);
};
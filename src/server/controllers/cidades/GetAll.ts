import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired()
  }))
}));

export const getAll = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {
  response.setHeader("access-control-expose-headers", "x-total-count");
  response.setHeader("x-total-count", 1);

  return response.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Caxias do Sul"
    }
  ]);
};
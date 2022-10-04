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
  console.log(request.query);

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
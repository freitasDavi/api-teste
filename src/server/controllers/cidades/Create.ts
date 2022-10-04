import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
  nome: string;
}

// Validação 
export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));


export const create = async (request: Request<{}, {}, ICidade>, response: Response) => {
  return response.status(StatusCodes.CREATED).json(1);
};
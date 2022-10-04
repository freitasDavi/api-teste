import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICidade } from "../../database/models";
import { validation } from "../../shared/middlewares";

interface IBodyProps extends Omit<ICidade, "id"> {}

// Validação 
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3)
  }))
}));


export const create = async (request: Request<{}, {}, ICidade>, response: Response) => {
  return response.status(StatusCodes.CREATED).json(1);
};
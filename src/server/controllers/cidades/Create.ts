import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middlewares";

interface IBodyProps extends Omit<ICidade, "id"> {}

// Validação 
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150)
  }))
}));


export const create = async (request: Request<{}, {}, ICidade>, response: Response) => {
  const result = await CidadesProvider.create(request.body);

  if (result instanceof Error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }
  
  return response.status(StatusCodes.CREATED).json(result);
};
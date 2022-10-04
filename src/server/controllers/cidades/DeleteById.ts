import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const deleteById = async (request: Request<IParamProps>, response: Response) => {
  if (Number(request.params.id) === 99999) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: "Registro não encontrado"
    }
  });

  return response.status(StatusCodes.NO_CONTENT).send();
};
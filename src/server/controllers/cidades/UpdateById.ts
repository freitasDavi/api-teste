import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICidade } from "../../database/models";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<ICidade, "id"> {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3)
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const updateById = async (request: Request<IParamProps, {}, IBodyProps>, response: Response ) => {
  if (Number(request.params.id) === 99999) return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: "Registro não encontrado"
    }
  });

  return response.status(StatusCodes.NO_CONTENT).send();
};
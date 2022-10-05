import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";
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
  if (!request.params.id) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' deve ser informado"
      }
    });
  }

  const result = await CidadesProvider.updateById(request.params.id, request.body);
  if (result  instanceof Error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return response.status(StatusCodes.NO_CONTENT).json(result);
};
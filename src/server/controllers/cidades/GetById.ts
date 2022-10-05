import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const getById = async (request: Request<IParamProps>, response: Response ) => {
  
  if (!request.params.id) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id' deve ser informado"
      }
    });
  }

  const result = await CidadesProvider.getById(request.params.id);

  if (result instanceof Error) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return response.status(StatusCodes.OK).json(result);

};
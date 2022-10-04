import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
}

interface IFilter {
  filter?: string;
}

// Validação 
const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3)
});

const queryValidation: yup.SchemaOf<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3)
});

export const createBodyValidator: RequestHandler = async (request, response, next) => {
  try {
    await bodyValidation.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    // Itera pelos erros, armazenando em uma variável para mostrar
    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;

      errors[error.path] = error.message;
    });

    return response.status(StatusCodes.BAD_REQUEST).json({ errors });

  }
}; 

export const createQueryValidator: RequestHandler = async (request, response, next) => {
  try {
    await queryValidation.validate(request.query, { abortEarly: false });

    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;

      errors[error.path] = error.message;
    });

    return response.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

export const create = async (req: Request<{}, {}, ICidade>, resp: Response) => {
  console.log(req.body);

  return resp.send("Create!");
};
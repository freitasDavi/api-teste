import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
}

// Validação 
const bodyValidation: yup.SchemaOf<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3)
});


export const create = async (req: Request<{}, {}, ICidade>, resp: Response) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    // Yup tenta validar os campos de acordo com as informações
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    // Itera pelos erros, armazenando em uma variável para mostrar
    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;

      errors[error.path] = error.message;
    });

    return resp.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  console.log(validatedData);

  return resp.send("Create!");
};
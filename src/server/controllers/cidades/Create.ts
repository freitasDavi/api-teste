import { Request, Response } from "express";
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
    validatedData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return resp.json({
      errors: {
        default: yupError.message,
      }
    });
  }

  console.log(validatedData);

  return resp.send("Create!");
};
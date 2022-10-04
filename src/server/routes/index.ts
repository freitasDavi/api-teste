import { Router } from "express";
import { CidadesController } from "../controllers";

const router = Router();

router.get("/", (request, response) => {
  return response.send("Olá, Dev!");
});

router.post("/cidades", 
  CidadesController.createValidation,
  CidadesController.create);

router.get("/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);
  
export  { router };
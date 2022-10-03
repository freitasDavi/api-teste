import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (request, response) => {
  return response.send("Olá, Dev!");
});

router.post("/teste", (request, response) => {
  console.log(request.body);

  return response.status(StatusCodes.ACCEPTED).json(request.body);
});






export  { router };
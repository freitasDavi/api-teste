import express from "express";


const server = express();

server.get("/", (request, response) => {
  return response.send("Olá, Dev!");
});

export { server };
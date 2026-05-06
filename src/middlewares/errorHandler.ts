import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  return res.status(500).json({
    success: false,
    error: "INTERNAL_SERVER_ERROR",
    message: "Ocorreu um erro interno ao processar a solicitação."
  });
};
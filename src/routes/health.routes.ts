import { Router } from "express";

export const healthRoutes = Router();

healthRoutes.get("/", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "API LUMINA FEST running!"
  });
});
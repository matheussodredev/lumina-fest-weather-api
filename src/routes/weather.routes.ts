import { Router } from "express";
import { getLuminaFestWeatherController } from "../controllers/weather.controller";

export const weatherRoutes = Router();

weatherRoutes.get("/lumina-fest", getLuminaFestWeatherController);
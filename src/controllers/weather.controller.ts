import { Request, Response, NextFunction } from "express";
import { getLuminaFestWeather } from "../services/weather.service";

export async function getLuminaFestWeatherController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const weather = await getLuminaFestWeather();

    return res.status(200).json(weather);
  } catch (error) {
    next(error);
  }
}
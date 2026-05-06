import { EVENT_CONFIG } from "../config/event.config";
import { OpenMeteoHourlyResponse } from "../types/weather.types";

export async function getOpenMeteoForecast(): Promise<OpenMeteoHourlyResponse> {
  const params = new URLSearchParams({
    latitude: String(EVENT_CONFIG.weather.latitude),
    longitude: String(EVENT_CONFIG.weather.longitude),
    timezone: EVENT_CONFIG.weather.timezone,
    start_date: EVENT_CONFIG.weather.startDate,
    end_date: EVENT_CONFIG.weather.endDate,
    hourly: "temperature_2m,apparent_temperature,precipitation_probability,weather_code"
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao consultar a Open-Meteo");
  }

  const data = await response.json();

  return data as OpenMeteoHourlyResponse;
}
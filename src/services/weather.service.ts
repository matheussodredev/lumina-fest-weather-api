import { EVENT_CONFIG } from "../config/event.config";
import { getOpenMeteoForecast } from "../clients/openMeteo.client";
import { WeatherDaySummary, LuminaWeatherResponse } from "../types/weather.types";
import { isDateTimeInRange } from "../utils/date";
import { getMostRelevantWeatherCode, translateWeatherCode } from "../utils/weatherCode";

function roundValue(value: number): number {
  return Math.round(value);
}

function buildAnswer(days: WeatherDaySummary[]): string {
  const daysText = days
    .map((day) => {
      return `${day.displayDate}: ${day.condition}, com temperatura entre ${day.temperatureMin}°C e ${day.temperatureMax}°C e sensação térmica entre ${day.apparentTemperatureMin}°C e ${day.apparentTemperatureMax}°C. Chance de chuva: ${day.rainProbability}%.`;
    })
    .join("\n\n");

  return `Aqui está a previsão para os 3 dias do ${EVENT_CONFIG.eventName}, considerando o período principal do evento, das ${EVENT_CONFIG.periodLabel}:\n\n${daysText}`;
}

export async function getLuminaFestWeather(): Promise<LuminaWeatherResponse> {
  const forecast = await getOpenMeteoForecast();

  const days: WeatherDaySummary[] = EVENT_CONFIG.days.map((eventDay) => {
    const indexes = forecast.hourly.time
      .map((time, index) => ({ time, index }))
      .filter(({ time }) =>
        isDateTimeInRange(time, eventDay.startDateTime, eventDay.endDateTime)
      )
      .map(({ index }) => index);

    if (indexes.length === 0) {
      throw new Error(`Nenhum dado climático encontrado para ${eventDay.date}`);
    }

    const temperatures = indexes.map((index) => forecast.hourly.temperature_2m[index]);
    const apparentTemperatures = indexes.map(
      (index) => forecast.hourly.apparent_temperature[index]
    );
    const rainProbabilities = indexes.map(
      (index) => forecast.hourly.precipitation_probability[index]
    );
    const weatherCodes = indexes.map((index) => forecast.hourly.weather_code[index]);

    const mostRelevantWeatherCode = getMostRelevantWeatherCode(weatherCodes);

    return {
      date: eventDay.date,
      displayDate: eventDay.displayDate,
      period: EVENT_CONFIG.periodLabel,
      condition: translateWeatherCode(mostRelevantWeatherCode),
      temperatureMin: roundValue(Math.min(...temperatures)),
      temperatureMax: roundValue(Math.max(...temperatures)),
      apparentTemperatureMin: roundValue(Math.min(...apparentTemperatures)),
      apparentTemperatureMax: roundValue(Math.max(...apparentTemperatures)),
      rainProbability: roundValue(Math.max(...rainProbabilities))
    };
  });

  return {
    success: true,
    event: EVENT_CONFIG.eventName,
    city: EVENT_CONFIG.publicCityName,
    weatherReferenceCity: EVENT_CONFIG.weather.referenceCity,
    period: EVENT_CONFIG.periodLabel,
    source: "Open-Meteo",
    generatedAt: new Date().toISOString(),
    days,
    answer: buildAnswer(days)
  };
}
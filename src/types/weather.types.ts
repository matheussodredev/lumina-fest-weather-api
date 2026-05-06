export type EventDayConfig = {
  date: string;
  displayDate: string;
  startDateTime: string;
  endDateTime: string;
};

export type OpenMeteoHourlyResponse = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
};

export type WeatherDaySummary = {
  date: string;
  displayDate: string;
  period: string;
  condition: string;
  temperatureMin: number;
  temperatureMax: number;
  apparentTemperatureMin: number;
  apparentTemperatureMax: number;
  rainProbability: number;
};

export type LuminaWeatherResponse = {
  success: true;
  event: string;
  city: string;
  weatherReferenceCity: string;
  period: string;
  source: string;
  generatedAt: string;
  days: WeatherDaySummary[];
  answer: string;
};
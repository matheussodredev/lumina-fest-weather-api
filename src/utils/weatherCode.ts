export function translateWeatherCode(code: number): string {
  const weatherCodeMap: Record<number, string> = {
    0: "céu limpo",
    1: "predominantemente claro",
    2: "parcialmente nublado",
    3: "nublado",

    45: "neblina",
    48: "neblina com formação de gelo",

    51: "garoa leve",
    53: "garoa moderada",
    55: "garoa intensa",

    56: "garoa congelante leve",
    57: "garoa congelante intensa",

    61: "chuva leve",
    63: "chuva moderada",
    65: "chuva forte",

    66: "chuva congelante leve",
    67: "chuva congelante forte",

    71: "neve leve",
    73: "neve moderada",
    75: "neve forte",
    77: "grãos de neve",

    80: "pancadas de chuva leves",
    81: "pancadas de chuva moderadas",
    82: "pancadas de chuva fortes",

    85: "pancadas de neve leves",
    86: "pancadas de neve fortes",

    95: "temporal",
    96: "temporal com granizo leve",
    99: "temporal com granizo forte"
  };

  return weatherCodeMap[code] ?? "condição climática não identificada";
}

export function getWeatherSeverity(code: number): number {
  if ([95, 96, 99].includes(code)) return 6; // temporal
  if ([82, 65, 67].includes(code)) return 5; // chuva forte
  if ([80, 81, 61, 63, 66].includes(code)) return 4; // chuva/pancadas
  if ([51, 53, 55, 56, 57].includes(code)) return 3; // garoa
  if ([45, 48, 3].includes(code)) return 2; // neblina/nublado
  if ([1, 2].includes(code)) return 1; // parcialmente claro/nublado
  if ([0].includes(code)) return 0; // céu limpo

  return 0;
}

export function getMostRelevantWeatherCode(codes: number[]): number {
  if (codes.length === 0) {
    return 0;
  }

  return codes.reduce((mostRelevantCode, currentCode) => {
    const currentSeverity = getWeatherSeverity(currentCode);
    const mostRelevantSeverity = getWeatherSeverity(mostRelevantCode);

    if (currentSeverity > mostRelevantSeverity) {
      return currentCode;
    }

    return mostRelevantCode;
  }, codes[0]);
}
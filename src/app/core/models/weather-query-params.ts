export interface WeatherQueryParams {
    q: string; // city name
    lang?: string; // language
    cnt?: number; // result count
    unit?: 'metric' | 'imperial', // Celsius or Fahrenheit
}

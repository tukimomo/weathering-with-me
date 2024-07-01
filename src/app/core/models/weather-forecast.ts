import { RawWeatherForecast } from "./raw-weather-forecast";

export interface WeatherForecast {
    [date: string]: {
        [time: string]: RawWeatherForecast,
    }
}

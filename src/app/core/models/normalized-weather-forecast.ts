import { TimeBasedWeatherForecast } from "./time-based-weather-forecast";

export interface NormalizedWeatherForecast {
    [date: string]: {
        [time: string]: TimeBasedWeatherForecast,
    }
}

import { RawWeatherForecast } from "./raw-weather-forecast";

export interface RawWeatherData {
    cod: any; // internal
    message: any; // internal
    cnt: number; // a number of timestamps returned in the API response
    list: Array<RawWeatherForecast>,
    city: {
        id: any;
        name: string;
        coord: {
            lat: number;
            lon: number;
        },
        country: string,
        population: number;
        timezone: any;
        sunrise: number;
        sunset: number
    }
}

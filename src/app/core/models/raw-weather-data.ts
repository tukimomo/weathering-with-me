import { RawWeatherForecast } from "./raw-weather-forecast";
import {RawCityInfo} from "./raw-city-info";

export interface RawWeatherData {
    cod: any; // internal
    message: any; // internal
    cnt: number; // a number of timestamps returned in the API response
    list: Array<RawWeatherForecast>,
    city: RawCityInfo
}

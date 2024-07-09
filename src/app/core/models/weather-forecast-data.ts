import {TimeBasedWeatherForecast} from "./time-based-weather-forecast";
import {City} from "./units/city";

export interface WeatherForecastData {
  cod: any;
  message: any;
  cnt: number;
  list: Array<TimeBasedWeatherForecast>;
  city: City;
}

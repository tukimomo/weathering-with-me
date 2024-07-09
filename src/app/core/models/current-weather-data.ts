import {Coord} from "./units/coord";
import {Weather} from "./units/weather";
import {Main} from "./units/main";
import {Wind} from "./units/wind";
import {Clouds} from "./units/clouds";

export interface CurrentWeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

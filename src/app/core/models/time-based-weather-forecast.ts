import {Weather} from "./units/weather";
import {Clouds} from "./units/clouds";
import {Wind} from "./units/wind";
import {Main} from "./units/main";
import {Sys} from "./units/sys";
import {Rain} from "./units/rain";

export interface TimeBasedWeatherForecast {
  dt: number;
  main: Main;
  weather: Array<Weather>;
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
}

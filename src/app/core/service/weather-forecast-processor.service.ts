import {TimeBasedWeatherForecast} from "../models/time-based-weather-forecast";
import {NormalizedWeatherForecast} from "../models/normalized-weather-forecast";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastProcessorService {

  /**
   @description This method will group the weather forecast data by date and time
   @return map: NormalizedWeatherForecast
   @example
   weatherForecastMap = {
   "2024-06-27": {
   "15:00:00": {},
   "18:00:00": {},
   }
   }
   * @param forecasts
   **/
  processData(forecasts: TimeBasedWeatherForecast[]): NormalizedWeatherForecast {
    let weatherForecastMap: NormalizedWeatherForecast = {};
    if (!!forecasts) {
      forecasts.forEach(item => {
        let dateTimeArray: Array<string> = item.dt_txt.split(" "); // 2024-06-27 03:00:00
        let date: string = dateTimeArray[0];
        let time: string = dateTimeArray[1];

        if (!!weatherForecastMap[date]) {
          weatherForecastMap[date][time] = item;
        } else {
          weatherForecastMap[date] = {
            [time]: item
          }
        }
      });
      return weatherForecastMap;
    }

    return {};
  }

  getHighestAndLowestTemperature(forecast: { [time: string]: TimeBasedWeatherForecast }) {
    return {
      highest: Math.ceil(Object.values(forecast)
        .sort((a, b) => b.main.temp_max - a.main.temp_max)[0].main.temp_max),
      lowest: Math.ceil(Object.values(forecast)
        .sort((a, b) => a.main.temp_min - b.main.temp_min)[0].main.temp_min),
    }
  }
}

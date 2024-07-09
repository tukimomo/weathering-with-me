import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, BASE_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { WeatherForecastData } from '../models/weather-forecast-data';
import { WeatherQueryParams } from '../models/weather-query-params';
import {CurrentWeatherData} from "../models/current-weather-data";

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  DEFAULT_COUNT = 40;
  DEFAULT_UNIT = "metric";
  DEFAULT_LANGUAGE = "en";
  weatherDataUrl = `${BASE_URL}/data/2.5/forecast`;
  currentWeatherDataUrl: string = `${BASE_URL}/data/2.5/weather`;

  constructor(private httpClient: HttpClient) { }

  getWeatherForecastForFiveDays(weatherQueryParams: WeatherQueryParams): Observable<WeatherForecastData> {
    return this.httpClient.get<WeatherForecastData>(`${this.weatherDataUrl}`,
      {
        params: {
          q: weatherQueryParams.q,
          lang: this.DEFAULT_LANGUAGE,
          cnt: this.DEFAULT_COUNT,
          units: this.DEFAULT_UNIT,
          appid: API_KEY
        }
      }
    );
  }

  getCurrentWeatherForecast(weatherQueryParams: WeatherQueryParams): Observable<CurrentWeatherData> {
    return this.httpClient.get<CurrentWeatherData>(`${this.currentWeatherDataUrl}`, {
      params: {
        q: weatherQueryParams.q,
        lang: this.DEFAULT_LANGUAGE,
        units: this.DEFAULT_UNIT,
        appid: API_KEY
      }
    })
  }
}

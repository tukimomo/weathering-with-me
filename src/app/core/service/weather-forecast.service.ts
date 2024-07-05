import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, BASE_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { RawWeatherData } from '../models/raw-weather-data';
import { WeatherQueryParams } from '../models/weather-query-params';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  DEFAULT_COUNT = 40;
  DEFAULT_UNIT = "metric";
  DEFAULT_LANGUAGE = "en";
  weatherDataUrl = `${BASE_URL}/data/2.5/forecast`;

  constructor(private httpClient: HttpClient) { }

  getWeatherForecastForFiveDays(weatherQueryParams: WeatherQueryParams): Observable<RawWeatherData> {
    return this.httpClient.get<RawWeatherData>(`${this.weatherDataUrl}`,
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
}

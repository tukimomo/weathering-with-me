import {Component, inject, signal, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SearchFormComponent} from "./components/search-form/search-form.component";
import {WeatherForecastService} from "./core/service/weather-forecast.service";
import {NormalizedWeatherForecast} from "./core/models/normalized-weather-forecast";
import {WeatherForecastProcessorService} from "./core/service/weather-forecast-processor.service";
import {TimeBasedWeatherForecast} from "./core/models/time-based-weather-forecast";
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {BehaviorSubject, zip} from "rxjs";
import {CurrentWeatherData} from "./core/models/current-weather-data";
import {WeatherForecastData} from "./core/models/weather-forecast-data";
import {SimpleForecastCardComponent} from "./components/simple-forecast-card/simple-forecast-card.component";
import { ChartComponent } from "./components/chart/chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleForecastCardComponent, SearchFormComponent, DatePipe, AsyncPipe, ChartComponent, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  weatherForecastService = inject(WeatherForecastService);
  weatherForecastProcessorService = inject(WeatherForecastProcessorService);
  current = signal<CurrentWeatherData | undefined>(undefined);
  forecasts = signal<NormalizedWeatherForecast>({});
  resultList = new BehaviorSubject<Array<{ date: string; data: { [time: string]: TimeBasedWeatherForecast } }>>([]);
  activeSelectedIndex = signal<number>(0);
  popChartData = signal<{ [time: string]: TimeBasedWeatherForecast }>({});

  ngOnInit() {
    if(!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(result => {
        this._fetchWeatherByCoords(result.coords.latitude, result.coords.longitude);
      })
    }
  }

  _fetchWeatherBySearchValue(value: string) {
    zip(
      this.weatherForecastService.getCurrentWeatherForecast({
        q: value,
      }),
      this.weatherForecastService.getWeatherForecastForFiveDays({
        q: value,
      })
    ).subscribe(value => {
      this.current.set(value[0] as CurrentWeatherData);
      this.forecasts.set(this.weatherForecastProcessorService.processData((value[1] as WeatherForecastData).list))
      this.generateDisplayedForecastList();
    });
  }

  _fetchWeatherByCoords(lat: number, lon: number) {
    zip(
      this.weatherForecastService.getCurrentWeatherForecastByCoords(
        lat,
        lon
      ),
      this.weatherForecastService.getWeatherForecastForFiveDaysByCoords(
        lat,
        lon
      )
    ).subscribe(value => {
      this.current.set(value[0] as CurrentWeatherData);
      this.forecasts.set(this.weatherForecastProcessorService.processData((value[1] as WeatherForecastData).list))
      this.generateDisplayedForecastList();
    });
  }

  handleCardClick(index: number) {
    this.activeSelectedIndex.set(index);
    this.popChartData.set(this.resultList.value[index].data);
  }

  handleSearch(locationName: string) {
    this._fetchWeatherBySearchValue(locationName);
  }

  generateDisplayedForecastList() {
    let result: Array<{ date: string; data: { [time: string]: TimeBasedWeatherForecast } }> = [];
    Object.entries(this.forecasts()).map(([date, value]) => result.push(
      {date: date, data: value}
    ));
    this.resultList.next(result);
  }

  getHighestAndLowestTemperature(forecast: { [time: string]: TimeBasedWeatherForecast }) {
    return this.weatherForecastProcessorService.getHighestAndLowestTemperature(forecast)
  }

  getFirstForecastIndex(forecast: { [time: string]: TimeBasedWeatherForecast }) {
    return Object.keys(forecast)[0];
  }
}

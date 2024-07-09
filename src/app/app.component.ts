import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OverviewInfoCardComponent} from "./components/overview-info-card/overview-info-card.component";
import {SearchFormComponent} from "./components/search-form/search-form.component";
import {WeatherForecastService} from "./core/service/weather-forecast.service";
import {WeatherForecast} from "./core/models/weather-forecast";
import {WeatherForecastProcessorService} from "./core/service/weather-forecast-processor.service";
import {RawWeatherForecast} from "./core/models/raw-weather-forecast";
import {AsyncPipe, DatePipe} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {RawWeatherData} from "./core/models/raw-weather-data";
import {RawCityInfo} from "./core/models/raw-city-info";
import {DateUtils} from "../shared/date-utils";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OverviewInfoCardComponent, SearchFormComponent, DatePipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  weatherForecastService = inject(WeatherForecastService);
  weatherForecastProcessorService = inject(WeatherForecastProcessorService);
  dateUtils: DateUtils = inject(DateUtils);

  overviewCityInfo = signal<RawCityInfo | undefined>(undefined);
  forecasts = signal<WeatherForecast>({});
  resultList = new BehaviorSubject<Array<{date: string; data: { [time: string]: RawWeatherForecast }}>>([]);

  handleSearch(locationName: string) {
    this.weatherForecastService.getWeatherForecastForFiveDays({
      q: locationName,
    }).subscribe(result => {
      this.overviewCityInfo.set(result.city);
      this.forecasts.set(this.weatherForecastProcessorService.processData(result.list));
      this.generateDisplayedForecastList();
    });
  }

  generateDisplayedForecastList(){
    let result: Array<{date: string; data: { [time: string]: RawWeatherForecast }}> = [];
    Object.entries(this.forecasts()).map(([date, value]) => result.push(
      {date: date, data: value}
    ));
    this.resultList.next(result);
  }

  getHighestAndLowestTemperature(forecast: { [time: string]: RawWeatherForecast }) {
    return this.weatherForecastProcessorService.getHighestAndLowestTemperature(forecast)
  }

  getFirstForecastIndex(forecast: { [time: string]: RawWeatherForecast }) {
    return Object.keys(forecast)[0];
  }

  getSunriseAndSunsetTime() {
      return {
        sunriseAt: this.dateUtils.convertToDateTime(this.overviewCityInfo()!.sunrise),
        sunsetAt:  this.dateUtils.convertToDateTime(this.overviewCityInfo()!.sunset)
      }
  }
}

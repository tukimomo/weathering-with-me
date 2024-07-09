import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OverviewInfoCardComponent} from "./components/overview-info-card/overview-info-card.component";
import {SearchFormComponent} from "./components/search-form/search-form.component";
import {WeatherForecastService} from "./core/service/weather-forecast.service";
import {NormalizedWeatherForecast} from "./core/models/normalized-weather-forecast";
import {WeatherForecastProcessorService} from "./core/service/weather-forecast-processor.service";
import {TimeBasedWeatherForecast} from "./core/models/time-based-weather-forecast";
import {AsyncPipe, DatePipe} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {DateUtils} from "../shared/date-utils";
import {City} from "./core/models/units/city";

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

  overviewCityInfo = signal<City | undefined>(undefined);
  forecasts = signal<NormalizedWeatherForecast>({});
  resultList = new BehaviorSubject<Array<{ date: string; data: { [time: string]: TimeBasedWeatherForecast } }>>([]);

  handleSearch(locationName: string) {
    this.weatherForecastService.getWeatherForecastForFiveDays({
      q: locationName,
    }).subscribe(result => {
      this.overviewCityInfo.set(result.city);
      this.forecasts.set(this.weatherForecastProcessorService.processData(result.list));
      this.generateDisplayedForecastList();
    });
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

  getSunriseAndSunsetTime() {
    return {
      sunriseAt: this.dateUtils.convertToDateTime(this.overviewCityInfo()!.sunrise),
      sunsetAt: this.dateUtils.convertToDateTime(this.overviewCityInfo()!.sunset)
    }
  }
}

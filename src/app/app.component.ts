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
  forecasts = signal<WeatherForecast>({});
  resultList = new BehaviorSubject<Array<{date: string; data: { [time: string]: RawWeatherForecast }}>>([]);

  handleSearch(locationName: string) {
    this.weatherForecastService.getWeatherForecastForFiveDays({
      q: locationName,
    }).subscribe(result => {
      this.forecasts.set(this.weatherForecastProcessorService.processData(result.list));
      this.getForecastList();
    });
  }

  getForecastList(){
    let result: Array<{date: string; data: { [time: string]: RawWeatherForecast }}> = [];
    Object.entries(this.forecasts()).map(([date, value]) => result.push(
      {date: date, data: value}
    ));
    // note: filter last item as it does not have all info
    this.resultList.next(result.filter(i => result.indexOf(i) !== 5));
  }

  getCurrentTime() {
    let hours = [0, 3, 6, 9, 12, 15, 18, 21];
    let currentTime = new Date().getHours();

    hours.push(currentTime);
    hours.sort((a,b) => a < b ? -1 : 1);
    let displayedTime: number | string = hours[hours.indexOf(currentTime) + 1];

    if(displayedTime < 9) {
      displayedTime = "0" + displayedTime;
    }
    return displayedTime + ":00:00";
  }
}

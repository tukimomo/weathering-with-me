import { TestBed } from '@angular/core/testing';
import {WeatherForecastProcessorService} from "./weather-forecast-processor.service";
import {rawWeatherForecastMock, weatherForecastRawDataMock} from "../../../shared/weather-forecast-raw-data-mock";

describe('WeatherForecastProcessorService', () => {
  let service: WeatherForecastProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process raw data in to new object containing date as key and weather forecast data as value', () => {
    const actual = service.processData(weatherForecastRawDataMock.list);
    expect(actual).toEqual({
      "2024-07-05": {
        "15:00:00" : rawWeatherForecastMock
      }
    })
  })
});

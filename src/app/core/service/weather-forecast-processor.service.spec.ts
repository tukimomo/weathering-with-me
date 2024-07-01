import { TestBed } from '@angular/core/testing';
import {WeatherForecastProcessorService} from "./weather-forecast-processor.service";

describe('WeatherForecastProcessorService', () => {
  let service: WeatherForecastProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

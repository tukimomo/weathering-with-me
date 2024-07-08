import {TestBed} from '@angular/core/testing';
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
    // arrange
    const actual = service.processData(weatherForecastRawDataMock.list);

    // assert
    expect(actual).toEqual({
      "2024-07-05": {
        "15:00:00": rawWeatherForecastMock
      }
    })
  })

  it('should return the the highest and the lowest temperature that is rounded up among of the forecasts by hour', () => {
    // arrange
    let mockData = {
      "00:00:00": {
        dt: new Date().getTime(),
        main: {
          temp: 32,
          feels_like: 32,
          temp_min: 24,
          temp_max: 35,
          pressure: 24, // unit default: hPa
          sea_level: 24, // unit default: hPa
          grnd_level: 5, // unit default: hPa
          humidity: 4, // percentage
          temp_kf: 0
        },
        weather: [{
          id: "",
          main: "",
          description: "",
          icon: ""
        }],
        clouds: {
          all: 10 // cloudiness
        },
        wind: {
          speed: 10,
          deg: 10,
          gust: 10,
        },
        visibility: 1, // unit is meters. maximum is 10km
        pop: 0, // probability of precipitation value betwwen 0 and 1. 0 is equal to 1% and 1 is equal to 100%
        sys: {
          pod: "" // day or night
        },
        dt_txt: "2024-07-05 00:00:00",
      },
      "03:00:00": {
        dt: new Date().getTime(),
        main: {
          temp: 32,
          feels_like: 32,
          temp_min: 20.45,
          temp_max: 40.99,
          pressure: 24, // unit default: hPa
          sea_level: 24, // unit default: hPa
          grnd_level: 5, // unit default: hPa
          humidity: 4, // percentage
          temp_kf: 0
        },
        weather: [{
          id: "",
          main: "",
          description: "",
          icon: ""
        }],
        clouds: {
          all: 10 // cloudiness
        },
        wind: {
          speed: 10,
          deg: 10,
          gust: 10,
        },
        visibility: 1, // unit is meters. maximum is 10km
        pop: 0, // probability of precipitation value betwwen 0 and 1. 0 is equal to 1% and 1 is equal to 100%
        sys: {
          pod: "" // day or night
        },
        dt_txt: "2024-07-05 03:00:00",
      },
      "06:00:00": {
        dt: new Date().getTime(),
        main: {
          temp: 32,
          feels_like: 32,
          temp_min: 26,
          temp_max: 33,
          pressure: 24, // unit default: hPa
          sea_level: 24, // unit default: hPa
          grnd_level: 5, // unit default: hPa
          humidity: 4, // percentage
          temp_kf: 0
        },
        weather: [{
          id: "",
          main: "",
          description: "",
          icon: ""
        }],
        clouds: {
          all: 10 // cloudiness
        },
        wind: {
          speed: 10,
          deg: 10,
          gust: 10,
        },
        visibility: 1, // unit is meters. maximum is 10km
        pop: 0, // probability of precipitation value betwwen 0 and 1. 0 is equal to 1% and 1 is equal to 100%
        sys: {
          pod: "" // day or night
        },
        dt_txt: "2024-07-05 06:00:00",
      }
    }

    // assert
    expect(service.getHighestAndLowestTemperature(mockData).lowest).toEqual(21)
    expect(service.getHighestAndLowestTemperature(mockData).highest).toEqual(41)
  })
});

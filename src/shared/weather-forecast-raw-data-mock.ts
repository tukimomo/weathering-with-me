export const rawWeatherForecastMock = {
  "dt": 1720191600,
  "main": {
    "temp": 299.47,
    "feels_like": 299.47,
    "temp_min": 298.13,
    "temp_max": 299.47,
    "pressure": 1008,
    "sea_level": 1008,
    "grnd_level": 1009,
    "humidity": 93,
    "temp_kf": 1.34
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02n"
    }
  ],
  "clouds": {
    "all": 21
  },
  "wind": {
    "speed": 2.68,
    "deg": 242,
    "gust": 8.46
  },
  "visibility": 10000,
  "pop": 0.18,
  "sys": {
    "pod": "n"
  },
  "dt_txt": "2024-07-05 15:00:00"
}
export const weatherForecastRawDataMock = {
  "cod": "200",
  "message": 0,
  "cnt": 1,
  "list": [ rawWeatherForecastMock ],
  "city": {
    "id": 1586203,
    "name": "Can Tho",
    "coord": {
      "lat": 10.0333,
      "lon": 105.7833
    },
    "country": "VN",
    "population": 259598,
    "timezone": 25200,
    "sunrise": 1720132834,
    "sunset": 1720178519
  }
}

export interface RawCityInfo {
  id: any;
  name: string;
  coord: {
    lat: number;
    lon: number;
  },
  country: string,
  population: number;
  timezone: any;
  sunrise: number;
  sunset: number
}

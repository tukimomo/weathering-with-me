import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY, BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  geocodingUrl = `${BASE_URL}/geo/1.0/reverse`;

  constructor(private httpClient: HttpClient) { }

  getLocationNameFrom(lat: number, lon: number) {
    return this.httpClient.get<{name: string}[]>(this.geocodingUrl, {
      params: {
        lat: lat,
        lon: lon,
        limit: 1,
        appId: API_KEY
      }
    })
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleForecastCardComponent } from './simple-forecast-card.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('OverviewInfoCardComponent', () => {
  let component: SimpleForecastCardComponent;
  let fixture: ComponentFixture<SimpleForecastCardComponent>;
  let httpClient: HttpClient;
  let httpClientTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleForecastCardComponent, HttpClientTestingModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpClientTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SimpleForecastCardComponent);
    component = fixture.componentInstance;

    // Set all required fields so that the test can be run
    fixture.componentRef.setInput('date', '2024-07-07')
    fixture.componentRef.setInput('iconName', '01d')
    fixture.componentRef.setInput('highestTemperature', '32')
    fixture.componentRef.setInput('lowestTemperature', '20')

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return day of the week in format of 3 characters', () => {
    // arrange
    // set current input date to Saturday
    fixture.componentRef.setInput('date', '2024-07-06');

    // assert
    expect(component.generateDisplayedDayOfWeek()).toEqual('Sat');
  })
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewInfoCardComponent } from './overview-info-card.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('OverviewInfoCardComponent', () => {
  let component: OverviewInfoCardComponent;
  let fixture: ComponentFixture<OverviewInfoCardComponent>;
  let httpClient: HttpClient;
  let httpClientTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewInfoCardComponent, HttpClientTestingModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpClientTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(OverviewInfoCardComponent);
    component = fixture.componentInstance;

    // Set all required fields
    fixture.componentRef.setInput('date', '2024-07-07')
    fixture.componentRef.setInput('iconName', '01d')
    fixture.componentRef.setInput('highestTemperature', '32')
    fixture.componentRef.setInput('lowestTemperature', '20')

    fixture.detectChanges();
  });

  it('should create', () => {


    expect(component).toBeTruthy();
  });
});

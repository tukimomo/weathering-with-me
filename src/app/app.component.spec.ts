import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return current forecast time ahead of current time', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    jasmine.clock().install();
    let baseTime = new Date(2013, 9, 23, 9, 19,43);
    jasmine.clock().mockDate(baseTime);
    jasmine.clock().tick(50)
    expect(app.getCurrentTime()).toEqual("12:00:00");
  })
});

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
});

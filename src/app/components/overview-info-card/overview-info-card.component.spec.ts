import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewInfoCardComponent } from './overview-info-card.component';

describe('OverviewInfoCardComponent', () => {
  let component: OverviewInfoCardComponent;
  let fixture: ComponentFixture<OverviewInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewInfoCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

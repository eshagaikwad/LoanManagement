import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDashboardChartComponent } from './loan-dashboard-chart.component';

describe('LoanDashboardChartComponent', () => {
  let component: LoanDashboardChartComponent;
  let fixture: ComponentFixture<LoanDashboardChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanDashboardChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanDashboardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

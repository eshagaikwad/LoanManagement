import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOfficerdashboardComponent } from './loan-officerdashboard.component';

describe('LoanOfficerdashboardComponent', () => {
  let component: LoanOfficerdashboardComponent;
  let fixture: ComponentFixture<LoanOfficerdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanOfficerdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanOfficerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

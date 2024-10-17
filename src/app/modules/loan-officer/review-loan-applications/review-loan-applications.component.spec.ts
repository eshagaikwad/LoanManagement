import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewLoanApplicationsComponent } from './review-loan-applications.component';

describe('ReviewLoanApplicationsComponent', () => {
  let component: ReviewLoanApplicationsComponent;
  let fixture: ComponentFixture<ReviewLoanApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewLoanApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewLoanApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

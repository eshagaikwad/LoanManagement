import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaymentHistoryComponent } from './loan-repayment-history.component';

describe('LoanRepaymentHistoryComponent', () => {
  let component: LoanRepaymentHistoryComponent;
  let fixture: ComponentFixture<LoanRepaymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanRepaymentHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRepaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

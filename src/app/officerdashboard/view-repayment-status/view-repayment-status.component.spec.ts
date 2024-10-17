import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepaymentStatusComponent } from './view-repayment-status.component';

describe('ViewRepaymentStatusComponent', () => {
  let component: ViewRepaymentStatusComponent;
  let fixture: ComponentFixture<ViewRepaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRepaymentStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRepaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

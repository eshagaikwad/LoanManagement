import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanOfficerComponent } from './view-loan-officer.component';

describe('ViewLoanOfficerComponent', () => {
  let component: ViewLoanOfficerComponent;
  let fixture: ComponentFixture<ViewLoanOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLoanOfficerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLoanOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

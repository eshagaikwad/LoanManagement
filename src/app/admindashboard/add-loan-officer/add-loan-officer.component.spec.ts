import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanOfficerComponent } from './add-loan-officer.component';

describe('AddLoanOfficerComponent', () => {
  let component: AddLoanOfficerComponent;
  let fixture: ComponentFixture<AddLoanOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLoanOfficerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLoanOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSchemeComponent } from './loan-scheme.component';

describe('LoanSchemeComponent', () => {
  let component: LoanSchemeComponent;
  let fixture: ComponentFixture<LoanSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanSchemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

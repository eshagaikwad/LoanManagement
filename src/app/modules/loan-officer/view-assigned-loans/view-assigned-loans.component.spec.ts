import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedLoansComponent } from './view-assigned-loans.component';

describe('ViewAssignedLoansComponent', () => {
  let component: ViewAssignedLoansComponent;
  let fixture: ComponentFixture<ViewAssignedLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAssignedLoansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAssignedLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCollateralComponent } from './verify-collateral.component';

describe('VerifyCollateralComponent', () => {
  let component: VerifyCollateralComponent;
  let fixture: ComponentFixture<VerifyCollateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyCollateralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyCollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

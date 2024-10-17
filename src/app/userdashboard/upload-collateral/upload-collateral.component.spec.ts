import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCollateralComponent } from './upload-collateral.component';

describe('UploadCollateralComponent', () => {
  let component: UploadCollateralComponent;
  let fixture: ComponentFixture<UploadCollateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCollateralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadCollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

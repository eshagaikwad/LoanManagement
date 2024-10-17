import { TestBed } from '@angular/core/testing';

import { CollateralVerificationService } from './collateral-verification.service';

describe('CollateralVerificationService', () => {
  let service: CollateralVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollateralVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

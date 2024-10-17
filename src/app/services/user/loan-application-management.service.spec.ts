import { TestBed } from '@angular/core/testing';

import { LoanApplicationManagementService } from './loan-application-management.service';

describe('LoanApplicationManagementService', () => {
  let service: LoanApplicationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApplicationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoanOfficerCrudService } from './loan-officer-crud.service';

describe('LoanOfficerCrudService', () => {
  let service: LoanOfficerCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanOfficerCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

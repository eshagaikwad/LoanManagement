import { TestBed } from '@angular/core/testing';

import { LoanSchemeCrudService } from './loan-scheme-crud.service';

describe('LoanSchemeCrudService', () => {
  let service: LoanSchemeCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanSchemeCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

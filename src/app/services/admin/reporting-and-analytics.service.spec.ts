import { TestBed } from '@angular/core/testing';

import { ReportingAndAnalyticsService } from './reporting-and-analytics.service';

describe('ReportingAndAnalyticsService', () => {
  let service: ReportingAndAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportingAndAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

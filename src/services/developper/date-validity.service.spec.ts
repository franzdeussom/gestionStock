import { TestBed } from '@angular/core/testing';

import { DateValidityService } from './date-validity.service';

describe('DateValidityService', () => {
  let service: DateValidityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateValidityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

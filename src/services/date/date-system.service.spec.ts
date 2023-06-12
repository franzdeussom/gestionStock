import { TestBed } from '@angular/core/testing';

import { DateSystemService } from './date-system.service';

describe('DateSystemService', () => {
  let service: DateSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApiSystemeService } from './api-systeme.service';

describe('ApiSystemeService', () => {
  let service: ApiSystemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSystemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

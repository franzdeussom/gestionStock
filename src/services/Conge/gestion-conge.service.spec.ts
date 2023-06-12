import { TestBed } from '@angular/core/testing';

import { GestionCongeService } from './gestion-conge.service';

describe('GestionCongeService', () => {
  let service: GestionCongeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCongeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

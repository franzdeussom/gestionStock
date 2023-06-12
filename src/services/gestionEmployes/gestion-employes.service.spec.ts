import { TestBed } from '@angular/core/testing';

import { GestionEmployesService } from './gestion-employes.service';

describe('GestionEmployesService', () => {
  let service: GestionEmployesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionEmployesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

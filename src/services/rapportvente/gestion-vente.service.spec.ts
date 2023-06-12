import { TestBed } from '@angular/core/testing';

import { GestionVenteService } from './gestion-vente.service';

describe('GestionVenteService', () => {
  let service: GestionVenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionVenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GestionCommandeService } from './gestion-commande.service';

describe('GestionCommandeService', () => {
  let service: GestionCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

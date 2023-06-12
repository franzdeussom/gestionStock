import { TestBed } from '@angular/core/testing';

import { GestionSanctionService } from './gestion-sanction.service';

describe('GestionSanctionService', () => {
  let service: GestionSanctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionSanctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GestionChargeService } from './gestion-charge.service';

describe('GestionChargeService', () => {
  let service: GestionChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

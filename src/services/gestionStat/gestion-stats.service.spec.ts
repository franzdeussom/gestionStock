import { TestBed } from '@angular/core/testing';

import { GestionStatsService } from './gestion-stats.service';

describe('GestionStatsService', () => {
  let service: GestionStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

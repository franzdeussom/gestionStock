import { TestBed } from '@angular/core/testing';

import { GestionTypeArticleService } from './gestion-type-article.service';

describe('GestionTypeArticleService', () => {
  let service: GestionTypeArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTypeArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

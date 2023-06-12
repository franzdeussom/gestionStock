import { TestBed } from '@angular/core/testing';

import { GestionArticleService } from './gestion-article.service';

describe('GestionArticleService', () => {
  let service: GestionArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

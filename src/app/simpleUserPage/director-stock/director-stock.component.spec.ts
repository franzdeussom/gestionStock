import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorStockComponent } from './director-stock.component';

describe('DirectorStockComponent', () => {
  let component: DirectorStockComponent;
  let fixture: ComponentFixture<DirectorStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

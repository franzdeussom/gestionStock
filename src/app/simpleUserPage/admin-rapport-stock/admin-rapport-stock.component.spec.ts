import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportStockComponent } from './admin-rapport-stock.component';

describe('AdminRapportStockComponent', () => {
  let component: AdminRapportStockComponent;
  let fixture: ComponentFixture<AdminRapportStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRapportStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRapportStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

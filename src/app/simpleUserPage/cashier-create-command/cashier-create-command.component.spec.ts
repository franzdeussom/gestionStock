import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierCreateCommandComponent } from './cashier-create-command.component';

describe('CashierCreateCommandComponent', () => {
  let component: CashierCreateCommandComponent;
  let fixture: ComponentFixture<CashierCreateCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierCreateCommandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierCreateCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierResumeComponent } from './cashier-resume.component';

describe('CashierResumeComponent', () => {
  let component: CashierResumeComponent;
  let fixture: ComponentFixture<CashierResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

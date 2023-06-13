import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSanctionComponent } from './admin-sanction.component';

describe('AdminSanctionComponent', () => {
  let component: AdminSanctionComponent;
  let fixture: ComponentFixture<AdminSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPerteComponent } from './admin-perte.component';

describe('AdminPerteComponent', () => {
  let component: AdminPerteComponent;
  let fixture: ComponentFixture<AdminPerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

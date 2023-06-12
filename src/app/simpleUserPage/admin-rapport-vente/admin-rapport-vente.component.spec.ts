import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportVenteComponent } from './admin-rapport-vente.component';

describe('AdminRapportVenteComponent', () => {
  let component: AdminRapportVenteComponent;
  let fixture: ComponentFixture<AdminRapportVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRapportVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRapportVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

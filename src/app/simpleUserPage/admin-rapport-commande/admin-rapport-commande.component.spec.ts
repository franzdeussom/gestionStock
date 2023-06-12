import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportCommandeComponent } from './admin-rapport-commande.component';

describe('AdminRapportCommandeComponent', () => {
  let component: AdminRapportCommandeComponent;
  let fixture: ComponentFixture<AdminRapportCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRapportCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRapportCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

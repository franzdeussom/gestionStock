import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRapportPresenceComponent } from './admin-rapport-presence.component';

describe('AdminRapportPresenceComponent', () => {
  let component: AdminRapportPresenceComponent;
  let fixture: ComponentFixture<AdminRapportPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRapportPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRapportPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

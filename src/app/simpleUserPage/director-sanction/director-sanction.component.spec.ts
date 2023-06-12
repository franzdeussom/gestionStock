import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorSanctionComponent } from './director-sanction.component';

describe('DirectorSanctionComponent', () => {
  let component: DirectorSanctionComponent;
  let fixture: ComponentFixture<DirectorSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorSanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

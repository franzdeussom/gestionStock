import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorRapportComponent } from './director-rapport.component';

describe('DirectorRapportComponent', () => {
  let component: DirectorRapportComponent;
  let fixture: ComponentFixture<DirectorRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorRapportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorListempruntComponent } from './director-listemprunt.component';

describe('DirectorListempruntComponent', () => {
  let component: DirectorListempruntComponent;
  let fixture: ComponentFixture<DirectorListempruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorListempruntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorListempruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

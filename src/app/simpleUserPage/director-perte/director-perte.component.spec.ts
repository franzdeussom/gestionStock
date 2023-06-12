import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorPerteComponent } from './director-perte.component';

describe('DirectorPerteComponent', () => {
  let component: DirectorPerteComponent;
  let fixture: ComponentFixture<DirectorPerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorPerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorPerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

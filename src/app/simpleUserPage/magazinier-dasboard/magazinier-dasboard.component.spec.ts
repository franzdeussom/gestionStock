import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinierDasboardComponent } from './magazinier-dasboard.component';

describe('MagazinierDasboardComponent', () => {
  let component: MagazinierDasboardComponent;
  let fixture: ComponentFixture<MagazinierDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazinierDasboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagazinierDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

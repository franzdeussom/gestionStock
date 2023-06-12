import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';
import { AdminStatsComponent } from './admin-stats.component';

describe('AdminStatsComponent', () => {
  let component: AdminStatsComponent;
  let fixture: ComponentFixture<AdminStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgChartsModule,
      ],
      declarations: [ AdminStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

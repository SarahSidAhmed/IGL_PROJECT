import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiDoctorComponent } from './dpi-doctor.component';

describe('DpiDoctorComponent', () => {
  let component: DpiDoctorComponent;
  let fixture: ComponentFixture<DpiDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

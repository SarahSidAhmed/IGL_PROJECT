import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationDetailDoctorComponent } from './consultation-detail-doctor.component';

describe('ConsultationDetailDoctorComponent', () => {
  let component: ConsultationDetailDoctorComponent;
  let fixture: ComponentFixture<ConsultationDetailDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationDetailDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationDetailDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

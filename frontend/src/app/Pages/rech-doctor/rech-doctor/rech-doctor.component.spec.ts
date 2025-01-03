import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechDoctorComponent } from './rech-doctor.component';

describe('RechDoctorComponent', () => {
  let component: RechDoctorComponent;
  let fixture: ComponentFixture<RechDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiPatientComponent } from './dpi-patient.component';

describe('DpiPatientComponent', () => {
  let component: DpiPatientComponent;
  let fixture: ComponentFixture<DpiPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

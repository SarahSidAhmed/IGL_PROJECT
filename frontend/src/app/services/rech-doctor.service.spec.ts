import { TestBed } from '@angular/core/testing';

import { RechDoctorService } from './rech-doctor.service';

describe('RechDoctorService', () => {
  let service: RechDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

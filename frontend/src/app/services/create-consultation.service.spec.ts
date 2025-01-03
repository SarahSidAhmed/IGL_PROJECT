import { TestBed } from '@angular/core/testing';

import { CreateConsultationService } from './create-consultation.service';

describe('CreateConsultationService', () => {
  let service: CreateConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

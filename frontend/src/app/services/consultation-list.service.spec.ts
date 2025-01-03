import { TestBed } from '@angular/core/testing';

import { ConsultationListService } from './consultation-list.service';

describe('ConsultationListService', () => {
  let service: ConsultationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

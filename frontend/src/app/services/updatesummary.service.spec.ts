import { TestBed } from '@angular/core/testing';

import { UpdatesummaryService } from './updatesummary.service';

describe('UpdatesummaryService', () => {
  let service: UpdatesummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatesummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

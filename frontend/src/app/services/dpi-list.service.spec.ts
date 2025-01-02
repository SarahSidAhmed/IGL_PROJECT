import { TestBed } from '@angular/core/testing';

import { DpiListService } from './dpi-list.service';

describe('DpiListService', () => {
  let service: DpiListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpiListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

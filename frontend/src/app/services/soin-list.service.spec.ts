import { TestBed } from '@angular/core/testing';

import { SoinListService } from './soin-list.service';

describe('SoinListService', () => {
  let service: SoinListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoinListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

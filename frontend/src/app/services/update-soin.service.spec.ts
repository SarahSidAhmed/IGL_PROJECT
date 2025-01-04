import { TestBed } from '@angular/core/testing';

import { UpdateSoinService } from './update-soin.service';

describe('UpdateSoinService', () => {
  let service: UpdateSoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

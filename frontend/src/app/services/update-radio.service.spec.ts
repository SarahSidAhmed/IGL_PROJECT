import { TestBed } from '@angular/core/testing';

import { UpdateRadioService } from './update-radio.service';

describe('UpdateRadioService', () => {
  let service: UpdateRadioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRadioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

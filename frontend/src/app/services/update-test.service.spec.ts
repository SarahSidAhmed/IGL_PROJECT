import { TestBed } from '@angular/core/testing';

import { UpdateTestService } from './update-test.service';

describe('UpdateTestService', () => {
  let service: UpdateTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

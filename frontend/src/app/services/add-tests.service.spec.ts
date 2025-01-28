import { TestBed } from '@angular/core/testing';

import { AddTestsService } from './add-tests.service';

describe('AddTestsService', () => {
  let service: AddTestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DeletemedecineService } from './deletemedecine.service';

describe('DeletemedecineService', () => {
  let service: DeletemedecineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletemedecineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

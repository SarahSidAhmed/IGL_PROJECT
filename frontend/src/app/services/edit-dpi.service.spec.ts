import { TestBed } from '@angular/core/testing';

import { EditDpiService } from './edit-dpi.service';

describe('EditDpiService', () => {
  let service: EditDpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

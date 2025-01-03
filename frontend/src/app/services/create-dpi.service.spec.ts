import { TestBed } from '@angular/core/testing';

import { CreateDpiService } from './create-dpi.service';

describe('CreateDpiService', () => {
  let service: CreateDpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

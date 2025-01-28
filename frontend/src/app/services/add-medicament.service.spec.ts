import { TestBed } from '@angular/core/testing';

import { AddMedicamentService } from './add-medicament.service';

describe('AddMedicamentService', () => {
  let service: AddMedicamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMedicamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TestTodoListService } from './test-todo-list.service';

describe('TestTodoListService', () => {
  let service: TestTodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTodoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

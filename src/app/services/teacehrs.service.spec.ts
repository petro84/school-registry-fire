import { TestBed } from '@angular/core/testing';

import { TeacehrsService } from './teacehrs.service';

describe('TeacehrsService', () => {
  let service: TeacehrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacehrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

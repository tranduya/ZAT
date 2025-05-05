import { TestBed } from '@angular/core/testing';

import { DiloService } from './dilo.service';

describe('DiloService', () => {
  let service: DiloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

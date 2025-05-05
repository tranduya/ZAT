import { TestBed } from '@angular/core/testing';

import { NosicTypService } from './nosic-typ.service';

describe('NosicTypService', () => {
  let service: NosicTypService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NosicTypService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

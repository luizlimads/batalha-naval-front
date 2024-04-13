import { TestBed } from '@angular/core/testing';

import { BatalhaNavalService } from './batalha-naval.service';

describe('BatalhaNavalService', () => {
  let service: BatalhaNavalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatalhaNavalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FalconService } from './falcon.service';

describe('FalconService', () => {
  let service: FalconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

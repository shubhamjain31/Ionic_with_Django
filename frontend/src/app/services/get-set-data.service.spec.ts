import { TestBed } from '@angular/core/testing';

import { GetSetDataService } from './get-set-data.service';

describe('GetSetDataService', () => {
  let service: GetSetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

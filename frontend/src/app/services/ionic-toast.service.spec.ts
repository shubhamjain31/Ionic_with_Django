import { TestBed } from '@angular/core/testing';

import { IonicToastService } from './ionic-toast.service';

describe('IonicToastService', () => {
  let service: IonicToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

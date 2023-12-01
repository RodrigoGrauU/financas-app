import { TestBed } from '@angular/core/testing';

import { ToastInfoService } from './toast-info.service';

describe('ToastInfoService', () => {
  let service: ToastInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

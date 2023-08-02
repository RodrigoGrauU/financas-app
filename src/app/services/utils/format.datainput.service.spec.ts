import { TestBed } from '@angular/core/testing';

import { FormatDatainputService } from './format.datainput.service';

describe('FormatDatainputService', () => {
  let service: FormatDatainputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDatainputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

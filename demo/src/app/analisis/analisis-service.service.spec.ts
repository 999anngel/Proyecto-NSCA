import { TestBed } from '@angular/core/testing';

import { AnalisisServiceService } from './analisis-service.service';

describe('AnalisisServiceService', () => {
  let service: AnalisisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

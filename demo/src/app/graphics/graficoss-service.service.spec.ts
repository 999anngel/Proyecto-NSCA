import { TestBed } from '@angular/core/testing';

import { GraficossServiceService } from './graficoss-service.service';

describe('GraficossServiceService', () => {
  let service: GraficossServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficossServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

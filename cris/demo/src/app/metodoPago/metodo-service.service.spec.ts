import { TestBed } from '@angular/core/testing';

import { MetodoServiceService } from './metodo-service.service';

describe('MetodoServiceService', () => {
  let service: MetodoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

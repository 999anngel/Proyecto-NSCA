import { TestBed } from '@angular/core/testing';

import { AyudasService } from './ayudas-service';

describe('AyudasServiceService', () => {
  let service: AyudasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyudasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

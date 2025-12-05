import { TestBed } from '@angular/core/testing';

import { Kpi } from './kpi';

describe('Kpi', () => {
  let service: Kpi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kpi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

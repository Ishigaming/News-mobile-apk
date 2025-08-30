import { TestBed } from '@angular/core/testing';

import { Countries } from './countries';

describe('Countries', () => {
  let service: Countries;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Countries);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

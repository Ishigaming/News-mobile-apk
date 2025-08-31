import { TestBed } from '@angular/core/testing';

import { News } from './news';

describe('News', () => {
  let service: News;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(News);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

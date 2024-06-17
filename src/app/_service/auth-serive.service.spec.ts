import { TestBed } from '@angular/core/testing';

import { AuthSeriveService } from './auth-serive.service';

describe('AuthSeriveService', () => {
  let service: AuthSeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

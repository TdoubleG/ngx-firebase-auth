import { TestBed } from '@angular/core/testing';

import { NgxFirebaseAuthService } from './ngx-firebase-auth.service';

describe('NgxFirebaseAuthService', () => {
  let service: NgxFirebaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFirebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

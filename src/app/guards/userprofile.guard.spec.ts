import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userprofileGuard } from './userprofile.guard';

describe('userprofileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userprofileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

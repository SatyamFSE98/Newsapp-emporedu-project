import { TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserAuthService } from '../_services/user-auth.service';
import { UserServiceService } from '../_services/user-service.service';

class MockUserAuthService {
  getToken(): string | null {
    return 'testToken';
  }
}

class MockUserService {
  roleMatch(): boolean {
    return true;
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userAuthService: UserAuthService;
  let userService: UserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: UserAuthService, useClass: MockUserAuthService },
        { provide: UserServiceService, useClass: MockUserService }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    userAuthService = TestBed.inject(UserAuthService);
    userService = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if token is present and roles match', () => {
    spyOn(userAuthService, 'getToken').and.returnValue('testToken');
    spyOn(userService, 'roleMatch').and.returnValue(true);

    const canActivate = guard.canActivate(new ActivatedRouteSnapshot());

    expect(canActivate).toBe(true);
  });

  // ... (other test cases)

  it('should redirect to login page if token is not present and roles are empty', () => {
    spyOn(userAuthService, 'getToken').and.returnValue("access denied");
    spyOn(guard['router'], 'navigate'); // accessing private property, adjust if needed

    const canActivate = guard.canActivate(new ActivatedRouteSnapshot());

    expect(canActivate).toBe(false);
    expect(guard['router'].navigate).toHaveBeenCalledWith(['/login']);
  });
});

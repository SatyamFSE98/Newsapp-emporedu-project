import { TestBed } from '@angular/core/testing';
import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  let service: UserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService]
    });
    service = TestBed.inject(UserAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get roles', () => {
    const roles = [{ roleName: 'Admin' }, { roleName: 'User' }];

    service.setRoles(roles);

    const retrievedRoles = service.getRoles();

    expect(retrievedRoles).toEqual(roles);
  });

  it('should set and get token', () => {
    const token = 'testToken';

    service.setToken(token);

    const retrievedToken = service.getToken();

    expect(retrievedToken).toEqual(token);
  });

  it('should clear session storage', () => {
    service.clear();

    expect(sessionStorage.length).toBe(0);
  });

  it('should check if user is logged in', () => {
    service.setRoles([{ roleName: 'User' }]);
    service.setToken('testToken');

    const isLoggedIn = service.isLoggedIn();

    expect(isLoggedIn).toBeTruthy();
  });

  it('should check if user is an admin', () => {
    service.setRoles([{ roleName: 'Admin' }]);

    const isAdmin = service.isAdmin();

    expect(isAdmin).toBeTruthy();
  });

  it('should check if user is a regular user', () => {
    service.setRoles([{ roleName: 'User' }]);

    const isUser = service.isUser();

    expect(isUser).toBeTruthy();
  });
});
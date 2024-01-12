import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserServiceService } from './user-service.service';
import { UserAuthService } from './user-auth.service';


describe('UserServiceService', () => {
  let service: UserServiceService;
  let httpMock: HttpTestingController;
  let userAuthService: jasmine.SpyObj<UserAuthService>;

  beforeEach(() => {
    const userAuthServiceSpy = jasmine.createSpyObj('UserAuthService', ['getRoles']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserServiceService,
        { provide: UserAuthService, useValue: userAuthServiceSpy },
      ],
    });

    service = TestBed.inject(UserServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    userAuthService = TestBed.inject(UserAuthService) as jasmine.SpyObj<UserAuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Other tests remain unchanged

  it('should handle roleMatch with matching roles', () => {
    const allowedRoles = ['User'];
    userAuthService.getRoles.and.returnValue([{ roleName: 'User' }]);

    const result = service.roleMatch(allowedRoles);

    expect(result).toBe(true);
  });

  it('should handle roleMatch with non-matching roles', () => {
    const allowedRoles = ['Admin'];
    userAuthService.getRoles.and.returnValue([{ roleName: 'User' }]);

    const result = service.roleMatch(allowedRoles);

    expect(result).toBe(false);
  });
});

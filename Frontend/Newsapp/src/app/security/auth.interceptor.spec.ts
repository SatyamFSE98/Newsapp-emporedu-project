import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { UserAuthService } from '../_services/user-auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userAuthService: UserAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        UserAuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    userAuthService = TestBed.inject(UserAuthService);
  });

  it('should add an Authorization header with the token', () => {
    const token = 'fakeToken';
    spyOn(userAuthService, 'getToken').and.returnValue(token);

    httpClient.get('/api/data').subscribe();

    const req = httpTestingController.expectOne('/api/data');

    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);

    req.flush({});
  });

  it('should not add an Authorization header when "noAuth" header is present', () => {
    const token = 'fakeToken';
    spyOn(userAuthService, 'getToken').and.returnValue(token);

    httpClient.get('/api/data', { headers: { noAuth: 'True' } }).subscribe();

    const req = httpTestingController.expectOne('/api/data');

    expect(req.request.headers.has('Authorization')).toEqual(false);

    req.flush({});
  });

  it('should handle HTTP 401 error by navigating to login page', () => {
    spyOn(userAuthService, 'getToken').and.returnValue('fakeToken');

    httpClient.get('/api/data').subscribe(
      () => fail('Expected an error, but received a successful response'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(401);
      }
    );

    const req = httpTestingController.expectOne('/api/data');

    req.flush('', { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle HTTP 403 error by navigating to forbidden page', () => {
    spyOn(userAuthService, 'getToken').and.returnValue('fakeToken');

    httpClient.get('/api/data').subscribe(
      () => fail('Expected an error, but received a successful response'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(403);
      }
    );

    const req = httpTestingController.expectOne('/api/data');

    req.flush('', { status: 403, statusText: 'Forbidden' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
}

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpClient,
          useClass: HttpClientMock,
        },
        (service = TestBed.inject(AuthService)),
      ],
    });
  });

  it('should log in', () => {
    service = TestBed.inject(AuthService);
    const obj: any = {
      email: 'fake',
      password: 'bad',
    };

    expect(service.doLogin(obj)).toBeTruthy();
  });
});

//seems like tots core is blocking my unit tests :(

// NullInjectorError: R3InjectorError(DynamicTestModule)[AuthService -> InjectionToken tots.core -> InjectionToken tots.core]:
// NullInjectorError: No provider for InjectionToken tots.core!

  import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { LoginComponent } from './login.component';
  import { TOTS_CORE_PROVIDER } from '@tots/core';
  import { TOTS_AUTH_PROVIDER, TotsAuthConfig } from '@tots/auth';
  import { HttpClientModule } from '@angular/common/http';
  import { MatDialogModule } from '@angular/material/dialog';
  import { ReactiveFormsModule } from '@angular/forms';
  import { By } from '@angular/platform-browser';


  describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [HttpClientModule, MatDialogModule, ReactiveFormsModule ],
        // agregamos los providers mock
        providers: [
          {
            provide: TOTS_CORE_PROVIDER,
            useValue: {
              baseUrl: 'https://agency-coda.uc.r.appspot.com/'
            }
          },
          {
            provide: TOTS_AUTH_PROVIDER,
            useValue: {
              signInPath: 'oauth/token',
              changePasswordPath: 'users/me/password',
            } as TotsAuthConfig
          }
        ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

      it('should create the login', () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });

    it('should return invalid form', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();
      const email = app.loginForm.controls['email'];
      email.setValue('anything@gmail.com')
      expect(app.loginForm.invalid).toBeTrue();
    });

    it('should return valid form', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();
      const email = app.loginForm.controls['email'];
      email.setValue('z')
      const password = app.loginForm.controls['password'];
      password.setValue('z')
      expect(app.loginForm.valid).toBeTrue();
    });

    it('should not let u use blank spaces', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();
      const email = app.loginForm.controls['email'];
      email.setValue(' ')
      const password = app.loginForm.controls['password'];
      password.setValue(' ')
      expect(app.loginForm.invalid).toBeTrue();
    });

    it('it should render mock click for unit test', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      const app = fixture.componentInstance;
      fixture.detectChanges();
      const btnLogIn = fixture.debugElement.query(By.css('.button-send'))
      btnLogIn.nativeElement.click()
      const testData = 'mock click for unit test'
      expect(app.mockParaTesting).toEqual(testData);

    });
  });

import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorLogin!: string
    succesLogin!: string;
    mockParaTesting! : string;
    $loginData!: Observable<any>;

    constructor( private router: Router, private formBuilder: FormBuilder, private authService: AuthService, public dialog: MatDialog) {

        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
            password: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
        });
}
      
    ngOnInit() {
    }

    doLogin(){
      this.mockParaTesting = "mock click for unit test"
          this.$loginData = this.authService.doLogin(this.loginForm.value).pipe(map(data => {
          if(data.success){
            this.succesLogin = 'Welcome ' + data.response.firstname + ' you are being redirected!'
          setTimeout(() => { this.router.navigate(['/table-component']); }, 2500);
          } else {
            this.errorLogin = data.error.message
          }
      }))
  }

    openDialog(): void { 
      let dialogRef = this.dialog.open(RegisterFormComponent, { 
        width: '700px'
      }); 
      dialogRef.afterClosed().subscribe(result => { 
        result
      }); 
    } 
}
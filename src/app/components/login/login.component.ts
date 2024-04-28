import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorLogin!: string ;
    succesLogin!: string;
    $loginData!: Observable<any> ;

    constructor( private router: Router, private formBuilder: FormBuilder, private authService: AuthService, public dialog: MatDialog) {

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
}
      
    ngOnInit() {
    }

    doLogin(dataForm: any){

      const obj = {
        email: dataForm.email,
        password: dataForm.password
      }

      this.$loginData = this.authService.doLogin(obj).pipe(map(data => {
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
        width: '700px', 
        data: { name: 'this.name' } 
      }); 
    
      dialogRef.afterClosed().subscribe(result => { 
        result
      }); 
    } 
}
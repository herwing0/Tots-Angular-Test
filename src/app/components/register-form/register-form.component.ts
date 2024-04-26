import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RowFieldComponent, StringFieldComponent, SubmitButtonFieldComponent, TotsActionForm, TotsFieldForm } from '@tots/form';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

  fields = new Array<TotsFieldForm>();
  item = {};
  errorForm!: string

  constructor( private router: Router, private authService: AuthService) {

}
  ngOnInit(): void {
    this.configForm();

   }

  onActionForm(action: TotsActionForm) {
    console.log(action);
debugger;
    if(action.key == 'submit'){
      this.registerUser(action.item)
    }
    
  }

  configForm() {
    this.fields = [
      { key: '', component: RowFieldComponent, extra: { fields: [
        { key: 'email', component: StringFieldComponent, label: 'Email', validators: [Validators.required]},
        { key: 'password', component: StringFieldComponent, label: 'Password', validators: [Validators.required]},
      ] } },
      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' },

    ];
  }

  registerUser(formData: any){
     this.authService.registerUser(formData).subscribe({
       next: (response) => {
        if(response.success) {

          debugger;
          
        } else {
          this.errorForm = response.error.message
        }
        },
       error: (err: any) => {
           console.error('API Error:', err);
       }
   });

  }

}

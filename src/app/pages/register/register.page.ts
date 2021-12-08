import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

//errors messages
public errorMessages = {
  firstName: [
    { type: 'required', message: 'First name is required' },
    { type: 'maxlength', message: 'First name cannot be longer than 25 characters' }
  ],
  lastName: [
    { type: 'required', message: 'Last name is required' },
    { type: 'maxlength', message: 'Last name cannot be longer than 25 characters' }
  ],
  userEmail: [
    { type: 'required', message: 'An email address is required' },
    { type: 'pattern', message: 'Please enter a valid email address' }
  ],
  password1: [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: 'Password cannot be less than 6 characters' }
  ],
  password2: [
    { type: 'required', message: 'Password confirmation is required' },
    { type: 'mustMatch', message: 'Passwords do not match' }
  ],
  termsConditions:[
    { type: 'requiredtrue', message: 'You must agree to the terms and conditions to proceed' }
  ]
};

//getter methods
get firstName() {
  return this.registerForm.get('firstName');
}
get lastName() {
  return this.registerForm.get('lastName');
}
get userEmail() {
  return this.registerForm.get('userEmail');
}
get password1() {
  return this.registerForm.get('password1');
}
get password2() {
  return this.registerForm.get('password2');
}
get termsConditions() {
  return this.registerForm.get('termsConditions');
}

  registerForm: FormGroup;
  constructor(
    private db: DbService,
    public router: Router,
    private formBuilder: FormBuilder,
    ) {
      //validation rules for all the form fields
      this.registerForm = this.formBuilder.group({
        userEmail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
        firstName: ['', [Validators.required, Validators.maxLength(25)]],
        lastName: ['', [Validators.required, Validators.maxLength(25)]],
        termsConditions: ['', Validators.required]
    },
    {
      validator: this.comparePassword('password1','password2')
    });

  }
  //set the default value of the T&C checkbox to be false
  ngOnInit() {
    this.registerForm.controls.termsConditions.setValue(false);
  }
  //check to see if passwords in the two fields are the same
  comparePassword(controlName: string, matchingControlName: string)
  {
    return(formGroup: FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return;
      }
      if (control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true});
      }
      else{
        matchingControl.setErrors(null);
      }
    };
  }

  public async onRegister(email: { value: string }, password: { value: string }) {
    //check if the user has agreed to the terms and conditions
    if (true === this.registerForm.value.termsConditions)
    {
      let errorMessage = '';
      this.db
      .registerUsingEmail(this.registerForm.value.userEmail, this.registerForm.value.password1)
      .then((res) => {
        //send the verification email
        this.db.sendVerificationMail();
        this.router.navigate(['verify-email']);
      })
      //catch errors
      .catch(async (error) => {
        if (error.code === 'auth/email-already-in-use')
        {
          errorMessage = 'This email is already in use. \nPlease try logging in.';
        }
        else
        {
          errorMessage = error.message;
        }
        await this.db.presentAlert('Error!', errorMessage);
      });
    }
    else{
      await this.db.presentAlert('Error!', 'You must accept terms and conditions.');
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


public errorMessages = {
  firstName: [
    { type: 'required', message: 'First name is required' },
    { type: 'maxlength', message: 'First name cannot be longer than 20 characters' }
  ],
  lastName: [
    { type: 'required', message: 'Last name is required' },
    { type: 'maxlength', message: 'Last name cannot be longer than 20 characters' }
  ],
  userEmail: [
    { type: 'required', message: 'An email address is required' },
    { type: 'pattern', message: 'Please enter a valid email address' }
  ],
  password1: [
    { type: 'required', message: 'Password is required' },
    { type: 'pattern', message: 'Please enter a valid password' }
  ],
  password2: [
    { type: 'required', message: 'Password is required' },
    { type: 'match', message: 'Please enter a valid password that matches' }
  ],
};

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

  registerForm: FormGroup;
  constructor(
    private db: DbService,
    public router: Router,
    private formBuilder: FormBuilder,
    ) {

      this.registerForm = this.formBuilder.group({
        userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password1: ['',[Validators.required]],
        password2: ['',[Validators.required]],
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]]
    });

  }
  ngOnInit() {}

  public onRegister(email: { value: string }, password: { value: string }) {
    console.log(this.registerForm.value);
    this.db
      .registerUsingEmail(this.registerForm.value.userEmail, this.registerForm.value.password1)
      .then((res) => {
        this.db.sendVerificationMail();
        this.router.navigate(['verify-email']);
      })
      .catch(async (error) => {
        await this.db.presentAlert('Error', error.message);
        // window.alert(error.message);
      });
  }



}

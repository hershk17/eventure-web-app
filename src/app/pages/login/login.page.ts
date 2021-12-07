import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public errorMessages = {
    userEmail: [
      { type: 'required', message: 'An email address is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password cannot be less than 6 characters' }
    ]
  };

  get userEmail() {
    return this.loginForm.get('userEmail');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginForm: FormGroup;
  constructor(
    private db: DbService,
    public router: Router,
    private formBuilder: FormBuilder,)
    {
      this.loginForm = this.formBuilder.group({
        userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
       });
    }



  ngOnInit() {}

  public onSignIn(email: { value: string }, password: { value: string }) {
    this.db
      .signInUsingEmail(this.loginForm.value.userEmail, this.loginForm.value.password)
      .then((res) => {
        if (this.db.isEmailVerified()) {
          this.router.navigate(['/tabs']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      })
      .catch(async (error) => {
        await this.db.presentAlert('Error', error.message);
        // window.alert(error.message);
      });
  }
}

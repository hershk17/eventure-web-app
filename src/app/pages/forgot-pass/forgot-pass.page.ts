import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {
  resetPassForm: FormGroup;

  public errorMessages = {
    userEmail: [
      { type: 'required', message: 'An email address is required' },
      { type: 'pattern', message: 'Please enter a valid email address' },
    ],
  };

  get userEmail() {
    return this.resetPassForm.get('userEmail');
  }

  constructor(
    private db: DbService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.resetPassForm = this.formBuilder.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
        ],
      ],
    });
  }

  ngOnInit() {}

  public onSubmit(email: { value: string }) {
    let errorMessage = '';
    this.db
      .sendPasswordResetMail(this.resetPassForm.value.userEmail)
      .then(async (res) => {
        await this.db.presentAlert(
          'Sent',
          'Password reset instructions sent. Please check your mailbox.'
        );
      })
      .catch(async (error) => {
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Email address is invalid.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'Email address has not been registered yet.';
        } else {
          errorMessage = error.code;
        }
        await this.db.presentAlert('Error!', errorMessage);
      });
  }
}

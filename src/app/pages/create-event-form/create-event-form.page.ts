import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.page.html',
  styleUrls: ['./create-event-form.page.scss'],
})
export class CreateEventFormPage implements OnInit {

    // errors messages
  public errorMessages = {
    eventName: [
      { type: 'required', message: 'Event name is required' },
      { type: 'maxlength', message: 'Event name cannot be longer than 100 characters' }
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

  constructor() { }

  ngOnInit() {
  }

}

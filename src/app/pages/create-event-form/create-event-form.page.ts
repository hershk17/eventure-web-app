import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.page.html',
  styleUrls: ['./create-event-form.page.scss'],
})
export class CreateEventFormPage implements OnInit {
  // errors messages
  public errorMessages = {
    eventName: [{ type: 'required', message: 'An event name is required' }],
    eventLocation: [
      { type: 'required', message: 'An event location is required' },
    ],
    startDate: [{ type: 'required', message: 'A start date is required.' }],
    startTime: [{ type: 'required', message: 'A start date is required.' }],
    endDate: [{ type: 'required', message: 'A start date is required.' }],
    endTime: [{ type: 'required', message: 'A start date is required.' }],
    category: [{ type: 'required', message: 'A start date is required.' }],
  };
  createEvent: FormGroup;
  private urlHistory: string[] = [];

  // getter methods
  get eventName() {
    return this.createEvent.get('eventName');
  }
  get eventLocation() {
    return this.createEvent.get('eventLocation');
  }

  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // validation rules for all the form fields
    this.createEvent = this.formBuilder.group({
      eventName: ['', [Validators.required]],
      eventLocation: ['', [Validators.required]],
    });

    //routing for back button (adds history to the urlHistory)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlHistory.push(event.urlAfterRedirects);
      }
    });
  }

  //create event button call
  public async onCreateEvent() {
    console.log('nice');
  }

  //logic for going back
  ngOnInit() {}
  navBack() {
    this.urlHistory.pop();
    this.location.back();
  }
}

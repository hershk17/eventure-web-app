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
  // getter methods

  // errors messages
  public errorMessages = {
    eventName: [{ type: 'required', message: 'An event name is required' }],
    eventDescription: [
      { type: 'required', message: 'An event description is required' },
    ],
    eventLocation: [
      { type: 'required', message: 'An event location is required' },
    ],
    startDate: [{ type: 'required', message: 'A start date is required.' }],
    startTime: [{ type: 'required', message: 'A start time is required.' }],
    endDate: [{ type: 'required', message: 'An end date is required.' }],
    endTime: [{ type: 'required', message: 'An end time is required.' }],
    category: [{ type: 'required', message: 'A category is required.' }],
  };

  public categories: string[] = [
    'Home',
    'Music',
    'Party',
    'Food',
    'Drinks',
    'Sports',
    'Games',
    'Art',
    'Comedy',
    'Dance',
    'Networking',
    'Film',
    'Fitness',
    'Health',
    'Literature',
    'Religion',
    'Theatre',
    'Misc',
  ];

  eventForm: FormGroup;

  public minDate: string = new Date().toISOString();
  public maxDate = '2040-12-31';

  public startDate: string = this.minDate;
  public startTime: string = this.minDate;

  private urlHistory: string[] = [];

  get eventName() {
    return this.eventForm.get('eventName');
  }
  get eventDescription() {
    return this.eventForm.get('eventDescription');
  }
  get eventLocation() {
    return this.eventForm.get('eventLocation');
  }

  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // validation rules for all the form fields

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

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventLocation: ['', [Validators.required, Validators.minLength(2)]],
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }
  //logic for going back
  navBack() {
    this.urlHistory.pop();
    this.location.back();
  }
}

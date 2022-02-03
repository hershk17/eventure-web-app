import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.page.html',
  styleUrls: ['./create-event-form.page.scss'],
})
export class CreateEventFormPage implements OnInit {
  eventForm: FormGroup;

  public errorMessages = {
    name: [{ type: 'required', message: 'An event name is required' }],
    description: [
      { type: 'required', message: 'An event description is required' },
    ],
    location: [{ type: 'required', message: 'An event location is required' }],
    date: [{ type: 'required', message: 'A start date is required.' }],
    time: [{ type: 'required', message: 'A start time is required.' }],
    category: [{ type: 'required', message: 'A category is required.' }],
    participantCnt: [{ type: 'required', message: 'A category is required.' }],
    privacy: [{ type: 'required', message: 'A category is required.' }],
    fee: [{ type: 'required', message: 'A fee is required.' }],
  };

  public minDate: string = new Date().toISOString();
  public maxDate = '2040-12-31';
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

  get name() {
    return this.eventForm.get('name');
  }
  get description() {
    return this.eventForm.get('description');
  }
  get location() {
    return this.eventForm.get('location');
  }
  get date() {
    return this.eventForm.get('date');
  }
  get time() {
    return this.eventForm.get('time');
  }
  get category() {
    return this.eventForm.get('category');
  }
  get privacy() {
    return this.eventForm.get('privacy');
  }
  get participantCnt() {
    return this.eventForm.get('participantCnt');
  }
  get fee() {
    return this.eventForm.get('fee');
  }

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      location: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      category: ['', [Validators.required]],
      privacy: ['', [Validators.required]],
      participantCnt: ['', [Validators.required]],
      fee: ['', [Validators.required]],
    });
  }

  public async onCreateEvent() {
    console.log('event should be created here');
  }
}

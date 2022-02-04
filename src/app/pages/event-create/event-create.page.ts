import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { POI } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  eventForm: FormGroup;
  pois: POI[] = [];

  public errorMessages = {
    eventName: [{ type: 'required', message: 'An event name is required' }],
    description: [
      { type: 'required', message: 'An event description is required' },
    ],
    category: [{ type: 'required', message: 'A category is required.' }],
    capacity: [
      { type: 'required', message: 'A participant count is required.' },
    ],
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
  public visibilityOptions: string[] = ['Public', 'Followers Only', 'Invite Only'];

  get eventName() {
    return this.eventForm.get('eventName');
  }
  get description() {
    return this.eventForm.get('description');
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
  get visibility() {
    return this.eventForm.get('visibility');
  }
  get capacity() {
    return this.eventForm.get('capacity');
  }
  get entryFee() {
    return this.eventForm.get('entryFee');
  }
  get image() {
    return this.eventForm.get('image');
  }

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private db: DbService) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      location: [this.activatedRoute.snapshot.paramMap.get('id')],
      eventName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: [this.minDate],
      time: [this.minDate],
      visibility: [this.visibilityOptions[0]],
      category: ['', [Validators.required]],
      capacity: [5, [Validators.required]],
      entryFee: [0],
      image: null,
    });
  }

  public onFileChange($event: any): void {
    this.eventForm.value.image = $event.target.files[0];
  }

  public async onCreateEvent(): Promise<void> {
    const imgFile = this.eventForm.value.image;
    this.eventForm.value.image = null;
    const uploaded = await this.db.uploadEvent(this.eventForm.value, imgFile);
    console.log(uploaded);
  }
}

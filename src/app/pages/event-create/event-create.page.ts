import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, POI } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  eventForm: FormGroup;
  pois: POI[] = [];

  public errorMessages = {
    name: [{ type: 'required', message: 'An event name is required' }],
    description: [
      { type: 'required', message: 'An event description is required' },
    ],
    location: [{ type: 'required', message: 'An event location is required' }],
    category: [{ type: 'required', message: 'A category is required.' }],
    participantCnt: [
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
  public privacyOptions: string[] = ['Public', 'Followers Only', 'Invite Only'];

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

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      date: [this.minDate],
      time: [this.minDate],
      privacy: [this.privacyOptions[0]],
      category: ['', [Validators.required]],
      participantCnt: [5, [Validators.required]],
      fee: [0],
    });
  }

  async search(query: any) {
    if (query !== '') {
      this.api.getPOI(query).subscribe((data: { results: POI[] }) => {
        this.pois = data.results;
        console.log(this.pois);
      });
    }
  }

  public async onCreateEvent(): Promise<void> {
    console.log('event should be created here');
  }
}

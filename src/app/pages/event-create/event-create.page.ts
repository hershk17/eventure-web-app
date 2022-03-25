import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
// import { POI } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import uniqid from 'uniqid';
import ExplorePage from '../explore/explore.page';
// import { LocationPreviewComponent } from 'src/app/components/location-preview/location-preview.component';
@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.page.html',
  styleUrls: ['./event-create.page.scss'],
})
export class EventCreatePage implements OnInit {
  eventForm: FormGroup;
  poiData: any;
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

  // public isEditMode: false;
  // public eventNameFiller: 'Enter an event name here';
  // public eventDescriptionFiller: 'Enter the event description here';

  public;
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
  public visibilityOptions: string[] = ['Public', 'Followers Only'];
  image: any;

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

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private db: DbService,
    public toastController: ToastController,
    public modalController: ModalController
  ) {}

  async ngOnInit() {
    this.eventForm = this.formBuilder.group({
      id: 'e-' + (new Date()).getTime(),
      location: [null],
      eventName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: [this.minDate],
      time: [this.minDate],
      visibility: [this.visibilityOptions[0]],
      category: ['', [Validators.required]],
      capacity: [5, [Validators.required]],
      entryFee: [0],
      organizer: [(await this.db.auth.currentUser).uid],
      participants: [[]],
      reviews: [[]],
      score: [0],
    });
  }
  public addLocationId(poi: any) {
    this.eventForm.controls.location.setValue(poi.id);
    // console.log(this.eventForm.value);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Event created successfully.',
      duration: 2000,
    });
    toast.present();
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: ExplorePage,
      componentProps: {
        modal: true,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.poiData = data.data;
      this.eventForm.controls.location.setValue(this.poiData);
      // this.eventForm.controls.location.setValue(this.poiData.poi.id);

      console.log(this.poiData.id);
    });
    await modal.present();
  }

  public onFileChange($event: any): void {
    this.image = $event.target.files[0];
  }

  public async onCreateEvent(): Promise<void> {
    this.db.uploadEvent(this.eventForm.value, this.image).then(() => {
      this.presentToast();
      this.location.back();
    });
  }
}

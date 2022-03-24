import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DbService,
  Event,
  TomtomLocation,
  TomtomAddress,
} from 'src/app/services/db.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: Event = null;
  public userFirstName: string;
  public userLastName: string;
  public participants: Array<string> = [];
  // public myUID = this.db.getUserByUid(aUID);
  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DbService,
    public auth: AngularFireAuth,
    public toastController: ToastController,
    private location: Location
  ) {}

  async presentToast(yourMessage) {
    const toast = await this.toastController.create({
      message: yourMessage,
      duration: 2000,
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    // public aUID = (await this.auth.currentUser).uid;
    this.event = this.db.getEventByID(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    // is an observable that we subscribe to
    // get the user of the event.organizer
    this.db.getUserByUid(this.event.organizer).subscribe((user) => {
      if (user) {
        // get the first and last name of the user who created the event
        this.userFirstName = user[0].firstName;
        this.userLastName = user[0].lastName;
      }
    });
    // loop through all participants and push them into the participants array
    this.event.participants.forEach((participantID) => {
      this.db.getUserByUid(participantID).subscribe((participantData) => {
        this.participants.push(
          participantData[0].firstName + ' ' + participantData[0].lastName
        );
      });
    });
  }

  public edit() {
    console.log('edit');
    // this.presentToast('Your settings have been saved!');
  }

  public delete() {
    this.db.removeEvent(this.event.id);
    this.presentToast('Your event has been deleted!');
    this.location.back();
  }
  hasJoined() {
    return this.db.hasUserJoined(this.event.id);
  }
  async join() {
    const joined = await this.db.joinEvent(this.event.id);
    if(!joined) {
      this.presentToast(`Can't join ${this.event.eventName}`);
      return;
    }
    this.presentToast(`You have joined ${this.event.eventName}`);
  }
  async leave() {
    const joined = await this.db.leaveEvent(this.event.id);
    if(!joined) {
      this.presentToast(`Can't leave ${this.event.eventName}`);
      return;
    }
    this.presentToast(`You have left ${this.event.eventName}`);
  }
}

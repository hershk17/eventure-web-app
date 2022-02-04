import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService, Event } from 'src/app/services/db.service';
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
    console.log(this.event);
  }

  public edit() {
    console.log('edit');
    this.presentToast('Your settings have been saved!');
  }

  public delete() {
    console.log('delete');
    this.presentToast('Your event has been deleted!');
    this.location.back();
  }

  join() {
    this.db.joinEvent(this.event.id);
    this.presentToast('You have joined the event!');
    this.location.back();
  }
}

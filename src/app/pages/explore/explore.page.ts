import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService, POI } from 'src/app/services/api.service';
import { NavExtrasService } from 'src/app/services/navextraservice.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export default class ExplorePage implements OnInit, OnChanges  {
  @Output() locationIdEmit = new EventEmitter<any>();
  pois: POI[] = [];
  modal;

  processing = false;

  constructor(
    private api: ApiService,
    private alertController: AlertController,
    private modalController: ModalController,
    private navExtras: NavExtrasService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.modal);
  }
  ngOnInit() {}
  dismissModal(poi?) {
    if(poi) {
      this.modalController.dismiss(poi);
    } else {
      this.modalController.dismiss();
    }

  }
  returnLocationId(poi: any) {
    this.locationIdEmit.emit(poi);
  }
  pickLocation(poi) {
    if(this.modal) {
      this.dismissModal(poi);
    }
    this.navExtras.setExtras(poi);
  }
  async presentAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'OK',
        },
      ],
    });
    await alert.present();
  }

  async getLocations(query: string) {
    if (query !== '') {
      this.api.getPOI(query).subscribe((data) => {
        this.pois = data.results;
        this.pois.forEach((poi) => {
          poi.category = poi.poi.categories[0] + ' ' + poi.poi.categories[1];
          poi.distance = parseFloat((poi.dist / 1000).toFixed(2));
        });
      });
    } else {
      await this.presentAlert('Error', 'Please enter a search query!');
    }
  }
}

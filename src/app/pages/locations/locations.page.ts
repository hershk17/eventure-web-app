import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService, POI } from 'src/app/services/api.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {
  pois: POI[] = [];

  processing = false;

  constructor(
    private api: ApiService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

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
        console.log(data.results);
        this.pois = data.results;

        this.pois.forEach(poi => {
          poi.category = poi.poi.categories[0] + " " + poi.poi.categories[1];
          console.log(poi.position.lat);
          console.log(poi.position.lon);
          poi.distance = parseFloat((poi.dist / 1000).toFixed(2));
        });
      });
    } else {
      await this.presentAlert('Error', 'Please enter a search query!');
    }
  }
}

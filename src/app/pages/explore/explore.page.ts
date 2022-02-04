import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService, POI } from 'src/app/services/api.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export default class ExplorePage implements OnInit {
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

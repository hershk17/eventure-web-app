import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-plus-action',
  templateUrl: './plus-action.page.html',
  styleUrls: ['./plus-action.page.scss'],
})
export class PlusActionPage implements OnInit {
  constructor(public actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  async presentActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Create New...',
      buttons: [
        {
          text: 'Event',
        },
        {
          text: 'Text Post',
        },
        {
          text: 'Image',
        },
      ],
    });

    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }
}

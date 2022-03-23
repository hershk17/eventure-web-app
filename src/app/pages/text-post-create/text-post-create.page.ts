import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-plus-action',
  templateUrl: './text-post-create.page.html',
  styleUrls: ['./text-post-create.page.scss'],
})
export class NewTextPostPage implements OnInit {
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

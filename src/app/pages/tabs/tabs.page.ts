import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router
  ) {}

  async presentActionSheet(): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Create New...',
      buttons: [
        {
          text: 'Event',
          icon: 'calendar-number-outline',
          handler: () => {
            this.router.navigateByUrl('/tabs/create');
          },
        },
        {
          text: 'Text Post',
          // icon: 'document-text-outline',
          icon: 'text-outline',
          handler: () => {
            console.log('Text TODO');
          },
        },
        {
          text: 'Image',
          icon: 'image-outline',
          handler: () => {
            console.log('Image TODO');
          },
        },
        {
          text: 'Cancel',
          // icon: 'close-circle-outline',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }
}

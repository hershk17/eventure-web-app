import { Component, OnInit } from '@angular/core';
import { DbService, Event } from 'src/app/services/db.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: Event[] = [];
  public isOpen = false;
  constructor(private db: DbService, private popCtrl: PopoverController) {}

  ngOnInit() {
    this.db.getEvents().then((res) => {
      this.events = res;
    });
  }

  filterHandler() {
    console.log('nice');
  }

  onSelect(event: Event) {
    console.log(event);
  }

  async onPopover() {
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
    });

    return await popover.present();
  }
}

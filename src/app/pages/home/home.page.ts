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

  onSelect(event: Event) {
    console.log(event);
  }

  //popover filter options
  //ev sends the coordintes of the button so the popover shows in the correct location instead of middle of screen
  async onPopover(ev: any) {
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
      event: ev,
    });

    return await popover.present();
  }
}

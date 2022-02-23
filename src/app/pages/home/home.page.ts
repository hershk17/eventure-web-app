import { Component, OnInit } from '@angular/core';
import { DbService, Event } from 'src/app/services/db.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  list: any = ['All Events', 'My Created Events', 'My Joined Events'];
  events: Event[] = [];
  allEvents: Event[] = [];
  public isOpen = false;
  constructor(
    private db: DbService,
    private popCtrl: PopoverController,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.db.getEvents().then((res) => {
      this.events = res;
    });
  }

  onSelect(event: Event) {
    console.log(event);
  }
  //handles the click
  handleClick(field) {
    console.log(field);
    this.menu.close();

    if (field === 'All Events') {
      this.db.getEvents().then((res) => {
        this.events = res;
      });
    } else if (field === 'My Created Events') {
      this.db.getCreated().then((res) => {
        this.events = res;
      });
    } else {
      this.db.getJoined().then((res) => {
        this.events = res;
      });
    }
  }
  hasJoined(eventId) {
    return this.db.hasUserJoined(eventId);
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

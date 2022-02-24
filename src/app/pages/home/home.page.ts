import { Component, OnInit } from '@angular/core';
import { DbService, Event } from 'src/app/services/db.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  list: string[] = ['All Events', 'My Created Events', 'My Joined Events'];
  events: Event[] = [];
  allEvents: Event[] = [];
  hasEvents = false;
  filterBy: string;
  constructor(
    private db: DbService,
    private popCtrl: PopoverController,
    private menu: MenuController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //get parameters from url
    this.route.queryParams.subscribe((params) => {
      this.filterBy = params.filterBy;

      // console.log('ngOnInit');
      if (this.filterBy === undefined) {
        this.handleClick('All Events');
        // console.log('Handling All in ngOnInit');
      } else if (this.filterBy === 'created') {
        // console.log('Handling Joined in ngOnInit');
        this.handleClick('My Created Events');
      } else if (this.filterBy === 'joined') {
        // console.log('Handling Created in ngOnInit');
        this.handleClick('Joined Events');
      }
    });
  }

  onSelect(event: Event) {
    console.log(event);
    console.log('nice');
  }
  //handles the click
  async handleClick(field) {
    //close the menu
    this.menu.close();
    let result = null;
    //checks for what is clicked
    if (field === 'All Events') {
      await this.db.getEvents().then((res) => {
        result = res;
        // console.log(result);
      });
    } else if (field === 'My Created Events') {
      await this.db.getCreated().then((res) => {
        result = res;
      });
    } else {
      await this.db.getJoined().then((res) => {
        result = res;
      });
    }

    //check if there are no values to display
    if (!result || result.length === 0 || result[0] == null) {
      this.hasEvents = false;
      // console.log('result: ');
      // console.log(result);
      // console.log('result[0]: ' + result[0]);
    } else {
      this.hasEvents = true;
      //there should be something to display
      this.events = result;
    }
  }

  //checks if user has joined an event
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

    // //popover filter options
    // //ev sends the coordintes of the button so the popover shows in the correct location instead of middle of screen
    // async onPopover(ev: any) {
    //   const popover = await this.popCtrl.create({
    //     component: PopoverComponent,
    //     event: ev,
    //   });

    //   return await popover.present();
    // }
  }
}

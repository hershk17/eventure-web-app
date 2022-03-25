import { Component, OnInit } from '@angular/core';
import { DbService, Event } from 'src/app/services/db.service';

import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home-events.page.html',
  styleUrls: ['./home-events.page.scss'],
})
export class HomeEventsPage implements OnInit {
  // list: string[] = ['All Events', 'My Created Events', 'My Joined Events'];
  list = [
    { text: 'All Events', urlParam: 'all' },
    { text: 'My Created Events', urlParam: 'created' },
    { text: 'My Joined Events', urlParam: 'joined' },
  ];

  // list = [{'All Events', 'all'}, {'My Created Events', 'created'}, {'My Joined Events', 'joined'}];
  events: Event[] = [];
  allEvents: Event[] = [];
  filteredEvent = 'all';
  hasEvents = false;
  filterBy: string;
  constructor(
    private db: DbService,
    private menu: MenuController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //get parameters from url
    this.route.queryParams.subscribe((params) => {
      this.filterBy = params.filterBy;
      if (this.filterBy === undefined || this.filterBy === 'all') {
        this.handleClick('All Events');
      } else if (this.filterBy === 'created') {
        this.handleClick('My Created Events');
      } else if (this.filterBy === 'joined') {
        this.handleClick('Joined Events');
      }
    });
  }

  doRefresh(event) {
    //get parameters from url
    this.route.queryParams.subscribe((params) => {
      this.filterBy = params.filterBy;
      if (this.filterBy === undefined || this.filterBy === 'all') {
        this.handleClick('All Events');
      } else if (this.filterBy === 'created') {
        this.handleClick('My Created Events');
      } else if (this.filterBy === 'joined') {
        this.handleClick('Joined Events');
      }
    });

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onSelect(event: Event) {}
  
  //handles the click
  async handleClick(field) {
    //close the menu
    this.menu.close();
    let result = null;
    //checks for what is clicked
    if (field === 'All Events') {
      await this.db.getEvents().then((res) => {
        result = res;
        this.filteredEvent = 'all';
      });
    } else if (field === 'My Created Events') {
      await this.db.getCreated().then((res) => {
        result = res;
        this.filteredEvent = 'created';
      });
    } else {
      await this.db.getJoined().then((res) => {
        result = res;
        this.filteredEvent = 'joined';
      });
    }
    this.events = result;
    this.hasEvents = true;
  }

  hasJoined(eventId) {
    return this.db.hasUserJoined(eventId);
  }
}

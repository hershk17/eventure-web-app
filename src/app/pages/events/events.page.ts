import { Component, OnInit } from '@angular/core';
import { DbService, Event } from 'src/app/services/db.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: Event[] = [];

  constructor(private db: DbService) {}

  ngOnInit() {
    this.db.getEvents().then((res) => {
      console.log(res);
      this.events = res;
    });
  }

  onSelect(event: Event) {
    console.log(event);
  }
}

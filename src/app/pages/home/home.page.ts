import { Component, OnInit } from '@angular/core';
import { DbService, Event } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: Event[] = [];

  constructor(private db: DbService) {}

  ngOnInit() {
    this.db.getEvents().then((res) => {
      this.events = res;
    });
  }

  onSelect(event: Event) {
    console.log(event);
  }
}

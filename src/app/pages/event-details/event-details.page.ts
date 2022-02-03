import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService, Event } from 'src/app/services/db.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: Event = null;

  constructor(private activatedRoute: ActivatedRoute, private db: DbService) {}

  ngOnInit() {
    this.event = this.db.getEventByID(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    console.log(this.event);
  }
  CreateForm() {
    
  }
}

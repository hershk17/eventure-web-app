import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService, Event } from 'src/app/services/db.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: Event = null;

  // public myUID = this.db.getUserByUid(aUID);
  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DbService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    // public aUID = (await this.auth.currentUser).uid;
    this.event = this.db.getEventByID(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    console.log(this.event);
  }

  public edit() {}

  public delete() {}

  join() {
    this.db.joinEvent(this.event.id);
  }
}

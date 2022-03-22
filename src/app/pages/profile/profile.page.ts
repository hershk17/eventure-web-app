import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { User } from 'src/app/shared/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userData = null;

  constructor(
    private db: DbService,
    public router: Router,
    public auth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.db.getUserByUid(this.db.userData.uid).subscribe((user) => {
      this.userData = user[0];
      console.log(this.userData)
    });

  }

  public async onEditProfile() {
    console.log('Editing Profile TODO!');
  }
  public async onCreatedEvents() {
    console.log('onCreatedEvents TODO!');
  }
  public async onJoinedEvents() {
    this.db.getJoined().then((res) => {
      console.log(res);
    });
  }
  public async onSignOut() {
    await this.db.signOut();
  }
}

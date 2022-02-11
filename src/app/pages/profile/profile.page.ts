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
  public photoURL: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public uid: string;
  public country: string;
  public gender: string;
  public aUser: User;

  constructor(
    private db: DbService,
    public router: Router,
    public auth: AngularFireAuth,
    public afStore: AngularFirestore
  ) {}

  async ngOnInit() {
    await (await this.auth.currentUser).reload();
    const aUID = (await this.auth.currentUser).uid;
    this.db.getUserByUid(aUID).subscribe((data) => {
      this.aUser = data[0];
      this.photoURL = this.aUser.photoURL;
      this.email = this.aUser.email;
      this.firstName = this.aUser.firstName;
      this.lastName = this.aUser.lastName;
      this.uid = this.aUser.uid;
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

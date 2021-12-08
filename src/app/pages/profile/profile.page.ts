import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { User } from 'src/app/shared/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private db: DbService,
    public router: Router
    ) {}

  ngOnInit() {

    this.db.getUserByEmail('mltpsp@gmail.com').subscribe((data)=>{
      // this.data = data;
      console.log(data);
  });
    // console.log(this.db.getUserByEmail('mltpsp@gmail.com'));
  }

  // this.db.getUserDataByUid('JTUkYl64nHQcuV81ydzEKV4Rp0x1');
  public getProfile()
  {
    // this.db.getUserByEmail('mltpsp@gmail.com');
  }
  // const aUser: User = {
  //   uid: '',
  //   email: '',
  //   firstName: '',
  //   lastName: '',
  //   photoURL: '',
  //   emailVerified: false
  // }
  //   uid: res.user.uid,
  //   email: this.registerForm.value.userEmail,
  //   firstName: this.registerForm.value.firstName,
  //   lastName: this.registerForm.value.lastName,
  //   // photoURL: 'https://i.imgur.com/FxsD9fh.png',
  //   photoURL: 'https://i.imgur.com/9PFqQQB.jpg',
  //   emailVerified: res.user.emailVerified
  // };

  public async onSignOut() {
    await this.db.signOut();
  }
}

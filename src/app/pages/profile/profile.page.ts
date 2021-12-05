import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private db: DbService, public router: Router) {}

  ngOnInit() {}

  public onSignOut() {
    this.db
      .signOut()
      .then((res) => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}

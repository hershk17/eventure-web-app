import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private db: DbService, public router: Router) {}

  ngOnInit() {}

  public onSignIn(email: { value: string }, password: { value: string }) {
    this.db
      .signInUsingEmail(email.value, password.value)
      .then((res) => {
        if (this.db.isEmailVerified()) {
          this.router.navigate(['/tabs']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      })
      .catch(async (error) => {
        await this.db.presentAlert('Error', error.message);
        // window.alert(error.message);
      });
  }
}

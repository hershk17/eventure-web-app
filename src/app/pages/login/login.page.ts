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

  public async onSignIn(email: { value: string }, password: { value: string }) {
    try {
      const res = await this.db.signInUsingEmail(email.value, password.value);
      const emailVerified = await this.db.isEmailVerified();
      if(emailVerified) {
        setTimeout(() => {
          this.router.navigate(['/tabs']);
        }, 500);
      }
    } catch(error) {
      window.alert(error.message);
      return false;
    }
  }
}

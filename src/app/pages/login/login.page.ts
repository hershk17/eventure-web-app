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
      this.router.navigate(['/tabs']);
    } catch (error) {
      window.alert(error.message);
      return false;
    }
  }
}

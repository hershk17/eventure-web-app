import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private db: DbService, public router: Router) {}

  ngOnInit() {}

  public onRegister(email: { value: string }, password: { value: string }) {
    this.db
      .registerUsingEmail(email.value, password.value)
      .then((res) => {
        this.db.sendVerificationMail();
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}

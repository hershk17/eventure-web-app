import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  public msg = '';
  constructor(public db: DbService, private route: ActivatedRoute, private location: Location, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if(params.msg) {
        this.msg = params.msg;
      }
      else {
        this.msg = 'Please check your email and click on the link to verify your email address!';
      }
    });
  }

  ngOnInit() {
  }
}

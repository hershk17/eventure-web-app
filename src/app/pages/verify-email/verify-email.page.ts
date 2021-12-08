import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  public msg = 'Please check your email and click on the link to verify your email address!';
  constructor(public db: DbService, private route: ActivatedRoute) {
    this.msg = this.route.snapshot.queryParamMap.get('msg');
  }

  ngOnInit() {}
}

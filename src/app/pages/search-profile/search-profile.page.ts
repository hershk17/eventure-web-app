import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.page.html',
  styleUrls: ['./search-profile.page.scss'],
})
export class SearchProfilePage implements OnInit {
  public user = null;
  public uid = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DbService,
  ) { }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid');
    this.db.getUserByUid(this.uid).subscribe((userData) => {
      this.user = userData[0];
    })
  }
  doesFollow() {
    return this.db.currentUser.followings.includes(this.uid);
  }
  follow() {
    this.db.followUser(this.uid);
  }
  unfollow() {
    this.db.unfollowUser(this.uid);
  }

}

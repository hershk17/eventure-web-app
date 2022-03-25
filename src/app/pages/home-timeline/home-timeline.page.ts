import { Component, OnInit } from '@angular/core';
import { DbService, Post } from 'src/app/services/db.service';

@Component({
  selector: 'app-home-timeline',
  templateUrl: './home-timeline.page.html',
  styleUrls: ['./home-timeline.page.scss'],
})
export class HomeTimelinePage implements OnInit {

  posts: Post[] = [];

  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.getPostsFromFollowingList().then((res) => {
      this.posts = res;
    });
  }

  doRefresh(event) {
    this.db.getPostsFromFollowingList().then((res) => {
      this.posts = res;
    });

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}

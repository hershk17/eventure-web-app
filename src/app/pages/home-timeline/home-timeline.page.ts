import { Component, OnInit } from '@angular/core';
import {
  DbService,
  ImagePost,
  Post,
  TextPost,
} from 'src/app/services/db.service';

@Component({
  selector: 'app-home-timeline',
  templateUrl: './home-timeline.page.html',
  styleUrls: ['./home-timeline.page.scss'],
})
export class HomeTimelinePage implements OnInit {
  posts: Post[] = [];

  constructor(private db: DbService) {}

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

  toDate(timestamp) {
    let date = new Date(timestamp);
    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    let hours = date.getHours() % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var strTime =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      hours +
      ':' +
      minutes +
      ' ' +
      ampm;
    return strTime;
  }
  isMyPost(uid){
    return uid == this.db.userData.uid;
  }
  deletePost(uid){
    console.log('delete ' + uid);
    this.db.removePost(uid);
  }
}

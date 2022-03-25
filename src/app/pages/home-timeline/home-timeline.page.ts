import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  deleted = [];
  constructor(private db: DbService, private alertController: AlertController) {}

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
  async deletePost(id, index){
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete? This cannot be undone.',
      buttons: [{
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: async () => {
          try {
            await this.db.removePost(id);
            this.deleted.push(id);
          } catch(error) {
            console.error(error);
          }
        }
      }],
    });
    await alert.present();
  }
}

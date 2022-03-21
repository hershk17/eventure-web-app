import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit{

  public userList = [];
  public userData;
  constructor(private db: DbService) {

  }
  ngOnInit() {
    this.userData = this.db.userData;
    console.log(this.userData)
  }
  async search(event: any) {
    const searchWord = event.target.value;
    if(searchWord.length == 0) {
      this.userList = [];
      return;
    }
    this.userList = await this.db.getUserBySearchWord(searchWord);
    console.log(this.userList);
  }
}

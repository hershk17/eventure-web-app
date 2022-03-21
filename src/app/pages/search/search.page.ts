import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(private db: DbService) {}
  public userList = [];
  ngOnInit() {}
  async search(event: any) {
    const searchWord = event.target.value;
    if(searchWord.length == 0) {
      this.userList = [];
      return;
    }
    const data = await this.db.getUserBySearchWord(searchWord);
    this.userList = data.map((elem) => elem._source);
  }
}

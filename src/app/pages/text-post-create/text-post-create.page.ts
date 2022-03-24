import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-plus-action',
  templateUrl: './text-post-create.page.html',
  styleUrls: ['./text-post-create.page.scss'],
})
export class TextPostCreatePage implements OnInit {
  textPostForm: FormGroup;

  public errorMessages = {
    postContent: [{ type: 'required', message: 'A message is required' }],
  };

  get postContent() {
    return this.textPostForm.get('postContent');
  }

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private db: DbService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit() {
    this.textPostForm = this.formBuilder.group({
      postContent: ['', [Validators.required]],
    });
  }

  async presentToast(aMessage: string) {
    const toast = await this.toastController.create({
      message: aMessage,
      duration: 3000,
    });
    toast.present();
  }

  public async onCreateTextPost(): Promise<void> {
    const timeStamp = new Date();

    // how to convert date to string
    // const myDateString = this.datePipe.transform(myDate, 'yyyy-MM-dd, hh-mm-ss');

    // normal
    // console.log(timeStamp);
    // unix
    // console.log(timeStamp.getTime());
    // back to date
    // var date = new Date(timeStamp).toLocaleDateString('en-us');

    // type is: this.db.Post
    // initialize
    const userTextPost: any = {
      postid: null,
      timestamp: timeStamp.getTime(),
      uid: (await this.db.auth.currentUser).uid,
      textPost: this.textPostForm.value.postContent,
      imagePost: null,
    };

    // add the post to the firestore db
    this.db.setTextPost(userTextPost).then(() => {
      this.textPostForm.reset();
      this.presentToast('Successfully Posted!');
    });
  }
}

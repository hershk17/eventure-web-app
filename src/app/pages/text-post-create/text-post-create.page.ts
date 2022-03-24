import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

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

  // this should really be a service
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

    // add the post to the firestore db
    const isSuccess = this.db.setTextPost(this.textPostForm.value.postContent);

    if (isSuccess) {
      this.textPostForm.reset();
      this.presentToast('Successfully Posted!');
    } else {
      this.presentToast('Unknown Error!');
    }
  }
}

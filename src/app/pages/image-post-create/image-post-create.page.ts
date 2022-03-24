import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-image-post-create',
  templateUrl: './image-post-create.page.html',
  styleUrls: ['./image-post-create.page.scss'],
})
export class ImagePostCreatePage implements OnInit {
  // variable declarations
  imagePostForm: FormGroup;
  image: any = null;

  public errorMessages = {
    postContent: [{ type: 'required', message: 'A caption is required' }],
  };

  get postContent() {
    return this.imagePostForm.get('postContent');
  }

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private db: DbService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit() {
    this.imagePostForm = this.formBuilder.group({
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

  public onFileChange($event: any): void {
    this.image = $event.target.files[0];

    // console.log(this.image);
  }

  public async onImagePost(): Promise<void> {
    // add the post to the firestore db
    const isSuccess = await this.db.setImagePost(
      this.imagePostForm.value.postContent,
      this.image
    );
    if (isSuccess) {
      this.imagePostForm.reset();
      this.presentToast('Successfully Posted!');
    } else {
      this.presentToast('Unknown Error!');
    }
  }
}

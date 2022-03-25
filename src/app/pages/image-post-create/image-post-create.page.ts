import { Component, OnInit } from '@angular/core';
// import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    // private datePipe: DatePipe,
    private db: DbService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.imagePostForm = this.formBuilder.group({
      postContent: ['', [Validators.required]],
    });
  }

  // method that forces redirection
  redirectTo(uri) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router
      .navigateByUrl(uri, { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  // this should really be a service
  async presentToast(aMessage: string) {
    const toast = await this.toastController.create({
      message: aMessage,
      duration: 2250,
    });
    toast.present();
  }

  public onFileChange($event: any): void {
    this.image = $event.target.files[0];
  }

  public async onImagePost(): Promise<void> {
    // add the post to the firestore db
    const isSuccess = await this.db.setImagePost(
      this.imagePostForm.value.postContent,
      this.image
    );
    if (isSuccess) {
      this.imagePostForm.reset();
      this.redirectTo('/tabs/home/timeline');
      this.presentToast('Successfully Posted!');
    } else {
      this.presentToast('Unknown Error!');
    }
  }
}

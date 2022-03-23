import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-post-create',
  templateUrl: './image-post-create.page.html',
  styleUrls: ['./image-post-create.page.scss'],
})
export class ImagePostCreatePage implements OnInit {
  // variable declarations
  imagePostForm: FormGroup;
  image: any;

  public errorMessages = {
    postContent: [{ type: 'required', message: 'A caption is required' }],
  };

  get postContent() {
    return this.imagePostForm.get('postContent');
  }

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.imagePostForm = this.formBuilder.group({
      postContent: ['', [Validators.required]],
    });
  }

  public onFileChange($event: any): void {
    this.image = $event.target.files[0];
  }

  public async onImagePost(): Promise<void> {
    console.log('Create Image Post TODO');
    // this.db.uploadEvent(this.eventForm.value, this.image).then(() => {
    //   this.presentToast();
    //   this.location.back();
    // });
  }
}

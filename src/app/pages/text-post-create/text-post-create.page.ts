import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.textPostForm = this.formBuilder.group({
      postContent: ['', [Validators.required]],
    });
  }

  public async onTextPost(): Promise<void> {
    console.log('Create Text Post TODO');
    // this.db.uploadEvent(this.textPostForm.value, this.image).then(() => {
    //   this.presentToast();
    //   this.location.back();
    // });
  }
}

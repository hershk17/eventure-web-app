import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plus-action',
  templateUrl: './text-post-create.page.html',
  styleUrls: ['./text-post-create.page.scss'],
})
export class NewTextPostPage implements OnInit {
  eventForm: FormGroup;

  public errorMessages = {
    postContent: [{ type: 'required', message: 'A message is required' }],
  };

  get postContent() {
    return this.eventForm.get('postContent');
  }

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    this.eventForm = this.formBuilder.group({
      postContent: ['', [Validators.required]],
    });
  }

  public async onCreateEvent(): Promise<void> {
    console.log('Create Text Post TODO');
    // this.db.uploadEvent(this.eventForm.value, this.image).then(() => {
    //   this.presentToast();
    //   this.location.back();
    // });
  }
}

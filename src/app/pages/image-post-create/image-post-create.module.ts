import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ImagePostCreateModule } from './image-post-create-routing.module';
import { ImagePostCreatePage } from './image-post-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImagePostCreateModule,
  ],
  declarations: [ImagePostCreatePage],
  entryComponents: [],
})
export class ImagePostPageModule {}

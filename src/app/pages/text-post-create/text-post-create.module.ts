import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TextPostCreateModule } from './text-post-create-routing.module';
import { TextPostCreatePage } from './text-post-create.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TextPostCreateModule,
  ],
  declarations: [TextPostCreatePage],
})
export class TextPostCreatePageModule {}

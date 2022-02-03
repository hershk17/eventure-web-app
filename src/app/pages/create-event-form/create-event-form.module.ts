import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateEventFormPageRoutingModule } from './create-event-form-routing.module';

import { CreateEventFormPage } from './create-event-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateEventFormPageRoutingModule,
  ],
  declarations: [CreateEventFormPage],
})
export class CreateEventFormPageModule {}

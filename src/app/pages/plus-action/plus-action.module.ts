import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PlusActionRoutingModule } from './plus-action-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PlusActionRoutingModule,
  ],
  declarations: [],
})
export class PlusActionPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PlusActionRoutingModule } from './plus-action-routing.module';

import { PlusActionPage } from './plus-action.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PlusActionRoutingModule,
  ],
  declarations: [PlusActionPage],
})
export class PlusActionPageModule {}

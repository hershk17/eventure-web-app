import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchProfilePageRoutingModule } from './search-profile-routing.module';

import { SearchProfilePage } from './search-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchProfilePageRoutingModule
  ],
  declarations: [SearchProfilePage]
})
export class SearchProfilePageModule {}

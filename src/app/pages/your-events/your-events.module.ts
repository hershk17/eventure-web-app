import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourEventsPageRoutingModule } from './your-events-routing.module';

import { YourEventsPage } from './your-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourEventsPageRoutingModule
  ],
  declarations: [YourEventsPage]
})
export class YourEventsPageModule {}

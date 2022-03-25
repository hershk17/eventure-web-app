import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeEventsPageRoutingModule } from './home-events-routing.module';
import { HomeEventsPage } from './home-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEventsPageRoutingModule,
  ],
  declarations: [HomeEventsPage],
})
export class HomeEventsPageModule {}

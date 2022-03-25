import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTimelinePageRoutingModule } from './home-timeline-routing.module';

import { HomeTimelinePage } from './home-timeline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTimelinePageRoutingModule
  ],
  declarations: [HomeTimelinePage]
})
export class HomeTimelinePageModule {}

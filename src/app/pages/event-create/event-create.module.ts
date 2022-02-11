import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventCreatePageRoutingModule } from './event-create-routing.module';
import { EventCreatePage } from './event-create.page';
import { ImgPreviewModule } from '../../components/img-preview/img-preview.module';
import ExplorePage from '../explore/explore.page';
import { LocationPreviewComponent } from 'src/app/components/location-preview/location-preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EventCreatePageRoutingModule,
    ImgPreviewModule
  ],
  declarations: [EventCreatePage, ExplorePage, LocationPreviewComponent],
  entryComponents: [ExplorePage]
})
export class EventCreatePageModule {}

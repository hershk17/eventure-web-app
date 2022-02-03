import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventFormPage } from './create-event-form.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEventFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEventFormPageRoutingModule {}

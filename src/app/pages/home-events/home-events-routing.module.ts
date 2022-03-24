import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEventsPage } from './home-events.page';

const routes: Routes = [
  {
    path: '',
    component: HomeEventsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEventsPageRoutingModule {}

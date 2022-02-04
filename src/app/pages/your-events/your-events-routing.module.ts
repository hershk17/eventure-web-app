import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourEventsPage } from './your-events.page';

const routes: Routes = [
  {
    path: '',
    component: YourEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourEventsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTimelinePage } from './home-timeline.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTimelinePageRoutingModule {}

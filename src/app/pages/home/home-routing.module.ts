import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'events',
        loadChildren: () =>
          import('../home-events/home-events.module').then((m) => m.HomeEventsPageModule),
      },
      {
        path: 'timeline',
        loadChildren: () =>
          import('../home-timeline/home-timeline.module').then((m) => m.HomeTimelinePageModule),
      },
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

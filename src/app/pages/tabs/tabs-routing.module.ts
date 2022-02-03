import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'locations',
        loadChildren: () => import('../locations/locations.module').then(m => m.LocationsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'events/:id',
        loadChildren: () => import('../event-details/event-details.module').then( m => m.EventDetailsPageModule)
      },
      {
        path: 'locations/:id',
        loadChildren: () => import('../location-details/location-details.module').then( m => m.LocationDetailsPageModule)
      },
      {
        path: 'locations/:id',
        loadChildren: () => import('../location-details/location-details.module').then( m => m.LocationDetailsPageModule)
      },
      {
        path: 'create-event-form',
        loadChildren: () =>
        import('../create-event-form/create-event-form.module').then( m => m.CreateEventFormPageModule)
      },
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

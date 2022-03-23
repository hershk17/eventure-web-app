import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'explore',
        loadChildren: () =>
          import('../explore/explore.module').then((m) => m.ExplorePageModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../event-create/event-create.module').then(
            (m) => m.EventCreatePageModule
          ),
      },
      {
        path: 'createTextPost',
        loadChildren: () =>
          import('../text-post-create/text-post-create.module').then(
            (m) => m.NewTextPostPageModule
          ),
      },

      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'home/event/:id',
        loadChildren: () =>
          import('../event-details/event-details.module').then(
            (m) => m.EventDetailsPageModule
          ),
      },
      {
        path: 'home/event/:id/edit',
        loadChildren: () =>
          import('../event-create/event-create.module').then(
            (m) => m.EventCreatePageModule
          ),
      },
      {
        path: 'explore/location/:id',
        loadChildren: () =>
          import('../location-details/location-details.module').then(
            (m) => m.LocationDetailsPageModule
          ),
      },
      {
        path: 'search/profile/:uid',
        loadChildren: () =>
          import('../search-profile/search-profile.module').then(
            (m) => m.SearchProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchProfilePage } from './search-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SearchProfilePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchProfilePageRoutingModule {}

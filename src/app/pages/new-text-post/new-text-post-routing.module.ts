import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTextPostPage } from './new-text-post.page';

const routes: Routes = [
  {
    path: '',
    component: NewTextPostPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTextPostModule {}

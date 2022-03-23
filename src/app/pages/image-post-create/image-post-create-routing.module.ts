import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagePostCreatePage } from './image-post-create.page';

const routes: Routes = [
  {
    path: '',
    component: ImagePostCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagePostCreateModule {}

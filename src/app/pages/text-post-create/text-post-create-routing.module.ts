import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextPostCreatePage } from './text-post-create.page';

const routes: Routes = [
  {
    path: '',
    component: TextPostCreatePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextPostCreateModule {}

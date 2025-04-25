import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetornopagarPage } from './retornopagar.page';

const routes: Routes = [
  {
    path: '',
    component: RetornopagarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetornopagarPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudasAllPage } from './ayudas-all.page';

const routes: Routes = [
  {
    path: '',
    component: AyudasAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasAllPageRoutingModule {}

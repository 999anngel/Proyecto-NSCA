import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudasAddPage } from './ayudas-add.page';

const routes: Routes = [
  {
    path: '',
    component: AyudasAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasAddPageRoutingModule {}

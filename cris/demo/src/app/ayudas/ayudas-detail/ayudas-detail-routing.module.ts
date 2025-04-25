import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudasDetailPage } from './ayudas-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AyudasDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasDetailPageRoutingModule {}

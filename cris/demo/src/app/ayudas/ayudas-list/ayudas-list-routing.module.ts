import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyudasListPage } from './ayudas-list.page';

const routes: Routes = [
  {
    path: '',
    component: AyudasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasListPageRoutingModule {}

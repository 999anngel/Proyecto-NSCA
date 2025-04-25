import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoListPage } from './metodo-list.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoListPageRoutingModule {}

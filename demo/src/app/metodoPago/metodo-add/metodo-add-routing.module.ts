import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoAddPage } from './metodo-add.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoAddPageRoutingModule {}

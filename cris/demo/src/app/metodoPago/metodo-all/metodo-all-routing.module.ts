import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoAllPage } from './metodo-all.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoAllPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoEditPage } from './metodo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoEditPageRoutingModule {}

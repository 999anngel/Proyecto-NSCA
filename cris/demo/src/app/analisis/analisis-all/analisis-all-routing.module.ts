import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisisAllPage } from './analisis-all.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisisAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisisAllPageRoutingModule {}

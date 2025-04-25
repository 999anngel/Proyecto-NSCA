import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeportivoUnisexPage } from './deportivo-unisex.page';

const routes: Routes = [
  {
    path: '',
    component: DeportivoUnisexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeportivoUnisexPageRoutingModule {} 

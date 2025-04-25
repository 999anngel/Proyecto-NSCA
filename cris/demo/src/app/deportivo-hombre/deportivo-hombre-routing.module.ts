import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeportivoHombrePageModule } from './deportivo-hombre.module';
import { DeportivoHombrePage } from './deportivo-hombre.page';

const routes: Routes = [
  {
    path: '',
    component: DeportivoHombrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeportivoHombrePageRoutingModule {} 

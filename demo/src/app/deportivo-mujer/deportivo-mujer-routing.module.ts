import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeportivoMujerPageModule } from './deportivo-mujer.module';
import { DeportivoMujerPage } from './deportivo-mujer.page';

const routes: Routes = [
  {
    path: '',
    component: DeportivoMujerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeportivoMujerPageRoutingModule {} 

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatillasHombrePage } from './zapatillas-hombre.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatillasHombrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatillasHombrePageRoutingModule {} 

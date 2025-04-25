import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatillasUnisexPage } from './zapatillas-unisex.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatillasUnisexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatillasUnisexPageRoutingModule {} 

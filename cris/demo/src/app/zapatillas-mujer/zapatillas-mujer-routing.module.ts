import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatillasMujerPage } from './zapatillas-mujer.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatillasMujerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatillasMujerPageRoutingModule {} 

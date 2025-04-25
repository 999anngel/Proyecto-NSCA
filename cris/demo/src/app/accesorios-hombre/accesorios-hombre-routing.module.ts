import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoriosHombrePage } from './accesorios-hombre.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoriosHombrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoriosHombrePageRoutingModule {} 

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoriosUnisexPage } from './accesorios-unisex.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoriosUnisexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoriosUnisexPageRoutingModule {} 

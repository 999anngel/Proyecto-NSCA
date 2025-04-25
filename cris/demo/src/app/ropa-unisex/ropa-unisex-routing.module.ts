import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RopaUnisexPage } from './ropa-unisex.page';

const routes: Routes = [
  {
    path: '',
    component: RopaUnisexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RopaUnisexPageRoutingModule {} 

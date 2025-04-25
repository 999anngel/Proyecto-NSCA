import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartAllPage } from './cart-all.page';

const routes: Routes = [
  {
    path: '',
    component: CartAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartAllPageRoutingModule {}

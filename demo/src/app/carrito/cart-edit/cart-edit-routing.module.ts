import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartEditPage } from './cart-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CartEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartEditPageRoutingModule {}

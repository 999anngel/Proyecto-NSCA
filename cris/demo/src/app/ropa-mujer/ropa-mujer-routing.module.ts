import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RopaMujerPage } from './ropa-mujer.page';

const routes: Routes = [
  {
    path: '',
    component: RopaMujerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RopaMujerPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransbankPage } from './transbank.page';

const routes: Routes = [
  {
    path: '',
    component: TransbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransbankPageRoutingModule {}

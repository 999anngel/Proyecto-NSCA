import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssesoriosPage } from './assesorios.page';

const routes: Routes = [
  {
    path: '',
    component: AssesoriosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssesoriosPageRoutingModule {}

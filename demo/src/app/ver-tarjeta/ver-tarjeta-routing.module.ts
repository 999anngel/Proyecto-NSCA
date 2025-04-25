import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerTarjetaPage } from './ver-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: VerTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerTarjetaPageRoutingModule {}

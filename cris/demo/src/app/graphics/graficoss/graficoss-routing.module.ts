import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficossPage } from './graficoss.page';

const routes: Routes = [
  {
    path: '',
    component: GraficossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficossPageRoutingModule {}

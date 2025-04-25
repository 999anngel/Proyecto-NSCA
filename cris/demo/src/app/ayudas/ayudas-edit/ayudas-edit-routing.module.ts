import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudasEditPage } from './ayudas-edit.page'; // Cambiado a AyudasEditPage

const routes: Routes = [
  {
    path: '',
    component: AyudasEditPage, // Cambiado a AyudasEditPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyudasEditRoutingModule {}

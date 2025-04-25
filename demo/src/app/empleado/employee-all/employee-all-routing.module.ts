import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAllPage } from './employee-all.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAllPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionAllPage } from './session-all.page';

const routes: Routes = [
  {
    path: '',
    component: SessionAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionAllPageRoutingModule {}

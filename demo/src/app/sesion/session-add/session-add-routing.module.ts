import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionAddPage } from './session-add.page';

const routes: Routes = [
  {
    path: '',
    component: SessionAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionAddPageRoutingModule {}

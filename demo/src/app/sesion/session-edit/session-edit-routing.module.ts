import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionEditPage } from './session-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SessionEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionEditPageRoutingModule {}
